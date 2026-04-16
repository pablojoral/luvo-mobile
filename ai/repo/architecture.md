Architecture:

- Feature-based folder structure
- Separation of concerns:
  - UI components → presentational only
  - hooks → business logic
  - services/api → data fetching

Guidelines:

- no business logic inside UI components
- hooks encapsulate logic and side effects
- API calls go through centralized services or React Query

Component structure:

- small, composable components preferred
- avoid deeply nested components

Data flow:

- server state via React Query
- local UI state via hooks
