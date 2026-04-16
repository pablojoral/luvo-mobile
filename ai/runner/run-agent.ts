import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import Anthropic from '@anthropic-ai/sdk';

const agent = process.argv[2];

const PLACEHOLDER_MAP: Record<string, string> = {
  // core
  role: 'ai/core/role.md',
  constraints: 'ai/core/constraints.md',
  workflow: 'ai/core/workflow.md',
  reasoning: 'ai/core/reasoning.md',
  output_base: 'ai/core/output_base.md',
  // repo
  project_context: 'ai/repo/project_context.md',
  stack: 'ai/repo/stack.md',
  architecture: 'ai/repo/architecture.md',
  coding_standards: 'ai/repo/coding_standards.md',
  testing_guidelines: 'ai/repo/testing_guidelines.md',
  anti_patterns: 'ai/repo/anti_patterns.md',
  // domain
  laundry_domain_rules: 'ai/domain/laundry_domain_rules.md',
  payments_rules: 'ai/domain/payment_rules.md',
  realtime_rules: 'ai/domain/realtime_rules.md',
  offline_resilience: 'ai/domain/offline_resilience.md',
  react_native_rules: 'ai/domain/react_native_rules.md',
  performance_rules: 'ai/domain/performance_rules.md',
  accessibility_rules: 'ai/domain/accessibility_rules.md',
  typescript_rules: 'ai/domain/typescript_rules.md',
  failure_modes: 'ai/domain/failure_modes.md',
  // agents
  code_reviewer_task: 'ai/agents/code_reviewer/task.md',
  code_reviewer_output_format: 'ai/agents/code_reviewer/output_format.md',
  test_writer_task: 'ai/agents/test_writer/task.md',
  test_writer_heuristics: 'ai/agents/test_writer/heuristics.md',
  test_writer_output_format: 'ai/agents/test_writer/output_format.md',
  react_native_upgrader_task: 'ai/agents/react_native_upgrader/task.md',
  react_native_upgrader_heuristics: 'ai/agents/react_native_upgrader/heuristics.md',
  react_native_upgrader_output_format: 'ai/agents/react_native_upgrader/output_format.md',
};

function getDiff() {
  const bases = ['main', 'master', 'origin/main', 'origin/master'];
  for (const base of bases) {
    try {
      return execSync(`git diff ${base}...HEAD`, { encoding: 'utf-8' });
    } catch {
      // try next
    }
  }
  throw new Error('Could not find a base branch (main/master). Make sure the remote is fetched.');
}

function loadPrompt(skillName: string): string {
  const skillPath = path.join('ai/skill', `${skillName}.md`);
  let template = fs.readFileSync(skillPath, 'utf-8');

  for (const [placeholder, filePath] of Object.entries(PLACEHOLDER_MAP)) {
    if (template.includes(`{{${placeholder}}}`)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      template = template.replaceAll(`{{${placeholder}}}`, content);
    }
  }

  return template;
}

const SKILL_MAP: Record<string, string> = {
  review: 'review_pr',
  test: 'write_tests',
  upgrade: 'upgrade_react_native',
};

async function run() {
  const skillName = SKILL_MAP[agent];
  if (!skillName) {
    console.error(`Unknown agent: "${agent}". Valid options: ${Object.keys(SKILL_MAP).join(', ')}`);
    process.exit(1);
  }

  const diff = getDiff();
  const prompt = loadPrompt(skillName);

  const finalPrompt = `${prompt}

<diff>
${diff}
</diff>
`;

  const client = new Anthropic();

  console.log(`Running agent: ${agent}\n`);

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 64000,
    thinking: { type: 'adaptive' },
    messages: [{ role: 'user', content: finalPrompt }],
  });

  stream.on('text', (delta) => process.stdout.write(delta));

  await stream.finalMessage();
}

run();
