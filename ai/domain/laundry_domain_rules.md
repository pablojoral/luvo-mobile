Domain: Self-service laundry system

Core concepts:

- machines have states: available, running, finished, out_of_order
- users interact with physical machines through the app
- actions have real-world consequences

Critical principles:

1. State accuracy is critical

- UI must reflect real machine state
- stale data can cause real-world issues (user goes to a machine that is not actually available)

1. Actions must be reliable

- starting a machine must be confirmed, not assumed
- never show success unless backend confirms

1. Time is a core factor

- machine cycles are time-based
- timers must be accurate and resilient to app backgrounding

1. User trust is critical

- users must clearly understand:
  - machine status
  - payment status
  - cycle progress

1. Physical constraints matter

- users may be near machines with poor connectivity
- latency and failures are common

1. Idempotency and retries

- actions like "pay" must handle retries safely
- avoid duplicate charges

1. Error visibility

- failures must be clearly communicated
- silent failures are unacceptable

Always prioritize:

- correctness over UI polish
- explicit states over implicit assumptions
