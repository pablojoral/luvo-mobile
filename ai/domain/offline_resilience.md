Offline and poor network handling:

Environment:

- users may have weak or unstable connectivity

Requirements:

- handle:
  - slow requests
  - timeouts
  - offline mode

UI expectations:

- always show loading states
- show clear retry options
- never leave user in ambiguous state

Critical flows:

- payment

These must:

- fail safely
- allow retry without duplication

Avoid:

- silent failures
- infinite loading states
- unclear system state
