Test prioritization heuristics:

Always prioritize tests for:

1. Critical flows

   - payment processing
   - map rendering
   - confirming machine state

2. Failure scenarios

   - payment failure
   - network errors
   - backend errors
   - timeouts

3. Async behavior

   - loading states
   - success states
   - error states

4. Edge cases

   - empty data
   - invalid input
   - unexpected state transitions

5. Domain-specific risks

   - duplicate payments
   - stale machine state
   - race conditions

6. User interaction flows
   - button presses
   - navigation
   - form submission

Deprioritize:

- static UI rendering
- styling-only changes
- trivial components with no logic
