# TaskHub – Simplified Frontend Requirements

## Tech Stack

- Angular 17+ (standalone components, Signals where appropriate)
- Lazy-loaded routing
- Styling with Bootstrap or Tailwind CSS or SCSS (responsive, accessible)

## Features

- Authentication (Mock Only)
- Login with email (@example.com only)
- Session persistence in localStorage/sessionStorage
- Role-based access (user vs admin)

## Task Management

- Task list view
  - Paginated (client-side)
  - Searchable & filterable
  - Query params in URL to preserve state (page, search, filters)
- Task details view with ability to edit
- Create new task form with validations:
  - Title (required, unique)
  - Due date (not in past)
  - Description (optional)
  - Priority (low, medium, high, urgent)
- Optimistic updates (simulate async save with delay + possible rollback on error)

## Live Updates (Simulated)

- Simulate WebSocket events (e.g. with RxJS timer/Subject) to randomly add/update/delete tasks in the list

## Error & Loading States

- Skeleton loaders for task list
- Retry option on simulated failed requests
- Friendly error messages

## Accessibility & i18n

- Keyboard navigation
- ARIA attributes for key components
- Multi-language support (English + one more language)

## Stretch Goals (Pick 2–3 if time allows)

- Light/Dark theme toggle
- File upload for attachments (mock only, no backend persistence)
- Offline mode (cache tasks in localStorage)

## Deliverables

- GitHub repo with Angular app
- README with:
  - Architecture decisions (Signals store vs NgRx)
  - Setup instructions
  - Features implemented and skipped

## Final Say

- Everything is frontend sonly
- Tasks live in a Signals store, persisted to localStorage.
- “Live updates” and “network errors” are just simulated with RxJS.
- No real backend, SSR, CI, or e2e tests (confirmed with Ittyab)

## Timebox

Start at: 10 PM (2025/9/16)
End at: 07 PM (2025/9/17)
