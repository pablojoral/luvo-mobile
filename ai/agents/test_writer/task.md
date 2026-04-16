Your task is to write high-quality tests for a React Native application based on the provided code or code changes.

Scope:

- Focus on changed files and their behavior
- Inspect related logic only when necessary
- Do not generate unnecessary or redundant tests

Objectives:

1. Validate real user behavior
2. Cover critical flows:
   - payments
   - machine activation
   - machine state transitions
3. Cover edge cases and failure scenarios
4. Ensure async flows are correctly tested
5. Prevent regressions

Testing principles:

- Prefer behavior-driven tests over implementation details
- Test what the user sees and does
- Use React Native Testing Library patterns

Avoid:

- testing internal implementation details
- excessive mocking
- brittle snapshot tests
- trivial tests with no real value
