Payments domain rules:

- payment actions must be treated as critical operations

Requirements:

- never assume payment success without confirmation
- always handle:

  - pending
  - success
  - failure
  - timeout

- UI must reflect real payment state
- prevent duplicate payments (idempotency)

Common risks:

- double charge due to retries
- UI showing success before backend confirmation
- lost responses causing inconsistent state

Best practices:

- use explicit payment status states
- disable repeated actions during processing
- implement retry with safeguards
- log and surface failures clearly

Security:

- never expose sensitive payment data
- validate all payment-related inputs
