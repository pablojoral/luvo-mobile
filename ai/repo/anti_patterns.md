Common anti-patterns to avoid:

- missing dependencies in useEffect
- stale closures in hooks
- business logic inside UI components
- unsafe navigation params
- unhandled async errors
- large components with mixed responsibilities
- unnecessary re-renders due to unstable props

Performance issues:

- FlatList without proper keyExtractor
- inline functions in large lists
- heavy computation on render

Reliability issues:

- missing loading states
- missing error handling
