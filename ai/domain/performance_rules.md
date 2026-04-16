Performance priorities:

- machine list rendering must be efficient
- map rendering must be efficient
- avoid blocking JS thread during critical flows
- minimize re-renders of map components

Watch for:

- inline functions in lists
- missing memoization
- large components doing too much work
