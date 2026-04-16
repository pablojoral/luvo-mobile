Realtime and synchronization rules:

- machine state can change outside the app
- UI must stay synchronized with backend

Requirements:

- handle updates from:
  - websockets (if used)
  - manual refresh

Risks:

- stale machine state

Best practices:

- always revalidate before critical actions
- handle race conditions explicitly
- update UI optimistically only when safe

Consistency:

- prefer server truth over local assumptions
