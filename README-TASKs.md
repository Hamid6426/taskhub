# Angular Developer Pre-Hire Task

## Objective

The goal of this task is to evaluate your ability to design, implement, and deliver a production-quality
Angular application. You should demonstrate strong problem-solving, architecture design, state
management, testing, performance optimization, and user experience skills.

## Task Overview

You will build a small application called TaskHub. This app allows users to: - Browse and manage tasks -
Create, edit, and delete tasks - Assign tasks to users - See live updates when tasks are changed

## Requirements

### Technical Setup

- Use Angular 17+ with standalone components and Signals where applicable
- Implement lazy-loaded routing
- Use Reactive Forms with validation and custom validators
- Choose a state management approach (Signals store or NgRx) and justify in README
- Build an API layer with clear separation and error handling
- Enable SSR with Angular Universal for main routes
- Styling with Tailwind CSS or SCSS, ensuring responsiveness and accessibility

### Features

- Authentication (mock)
- Login with email ( @example.com only)
- Session persistence
- Role-based access (user/admin)
- Task Management
- Paginated, searchable, and filterable task list
- Shareable URL query state
- Task details with edit functionality
- Optimistic updates with rollback on error
- Task creation with validations (title, due date, description, priority)
- Live Updates
- Real-time changes via WebSocket (create/update/delete events)
- Error & Loading States
- Skeleton loading
- Retry options
- User-friendly error views
- Accessibility & Internationalization
- Keyboard navigation
- ARIA attributes
- Multi-language support (English + one other locale)

### Stretch Goals (choose any 3+)

- Offline support with cache and mutation queue
- File upload for task attachments
- Theming (light/dark)
- Role-based UI features
- Cypress e2e tests
- Performance optimization (LCP < 2.5s)

## Backend Setup

Use a local mock backend (e.g., json-server or NestJS mock) with seeded data for:

### Task Schema

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "todo | in_progress | done | blocked",
  "priority": "low | medium | high | urgent",
  "assigneeId": "string | null",
  "dueDate": "ISO string",
  "updatedAt": "ISO string",
  "createdAt": "ISO string"
}
```

### User Schema

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "avatarUrl": "string | null",
  "role": "user | admin"
}
```

### WebSocket Events

```json
{
  "type": "task.updated",
  "taskId": "string",
  "patch": {},
  "updatedAt": "string"
}
{
  "type": "task.created",
  "task": {}
}
{
  "type": "task.deleted",
  "taskId": "string"
}
```

## Deliverables

- GitHub repository of project with:

  - Angular app
  - Mock backend and seed script
  - README including architecture decisions, setup instructions, tradeoffs, and performance notes

- Unit tests
- Custom validator
- Container component with Signals/store
- Service with retry logic
- e2e test covering login → create task → edit task → live update
- GitHub Actions CI for lint, typecheck, test, build, and e2e

## Evaluation Rubric (100 pts)

- Architecture & Modularity – 20 pts
- State & Data Flow – 15 pts
- UI/UX & Accessibility – 15 pts
- Code Quality – 15 pts
- Performance – 10 pts
- Testing – 10 pts
- Real-time & Networking – 10 pts
- Docs & DX – 5 pts

## Timebox

- Suggested: 6–8 hours spread across a few days
- Quality is valued over quantity; document skipped/stretch features

## Follow-up Interview

- After submission, you may be asked to extend features live
  - e.g.: - Add bulk actions - Add “My Work” view
- Introduce Projects entity and migrate routes.
- Be prepared to explain why you chose your state management, SSR approach, and performance strategy.
