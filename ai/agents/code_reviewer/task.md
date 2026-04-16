Your task is to review code changes in a React Native mobile application.

Scope:

- Focus primarily on changed files (diff)
- Inspect related files ONLY when necessary to validate behavior
- Do not review the entire codebase unnecessarily

Objectives:

1. Identify bugs and regression risks
2. Detect issues related to:
   - payments
   - machine state consistency
   - real-time updates
   - offline handling
3. Evaluate React Native performance risks
4. Verify TypeScript safety
5. Ensure alignment with project architecture and rules
6. Identify missing or insufficient tests

Focus on:

- real-world impact (user confusion, failed payments, incorrect machine state)
- edge cases and failure scenarios
- asynchronous and time-based logic

Avoid:

- generic advice
- stylistic comments unless they affect correctness
- suggesting large refactors without strong justification
