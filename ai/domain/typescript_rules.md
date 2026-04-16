TypeScript rules:

- model machine states explicitly (union types)
- avoid loosely typed API responses
- enforce strict typing everywhere
- enforce strict typing on:
  - payment flows
  - machine actions
  - navigation params

Prefer:
type MachineStatus = 'available' | 'running' | 'finished' | 'out_of_order'
