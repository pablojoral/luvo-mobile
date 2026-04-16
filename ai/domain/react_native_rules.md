React Native rules (laundry context):

Performance:

- avoid unnecessary re-renders in machine lists
- optimize map/filter/sort operations
- avoid unnecessary re-renders due to unstable props

State:

- avoid stale closures in timers and machine state
- ensure timers stay correct when app backgrounds

Effects:

- ensure useEffect dependencies are correct
- avoid duplicated subscriptions

Memory:

- clean up timers, listeners, subscriptions

UI:

- ensure responsive feedback for:
  - starting machine
  - payment processing
