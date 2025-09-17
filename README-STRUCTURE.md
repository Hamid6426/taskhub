# Project File & Folder Structure

```
taskhub/
├── src/
│   ├── app/
│   │   │── dashboard/
│   │   │   └── dashboard.html
│   │   │   └── dashboard.spec.ts
│   │   │   └── dashboard.ts
│   │   │── login/
│   │   │   └── login.html
│   │   │   └── login.ts
│   │   │   └── login.spec.ts
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.html
│   │   ├── app.ts
│   │   └── app.spec.ts
│   │
│   │── assets/                     # app assets (still works if under app/)
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── fr.json
│   │   └── images/
│   │       └── logo.png
│   │
│   │── core/                       # singletons, cross-cutting concerns
│   │   ├── configs/
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   │   ├── request.interceptor.ts
│   │   │   ├── response.interceptor.ts
│   │   │   └── provider.config.ts
│   │   ├── models/
│   │   │   ├── task.model.ts
│   │   │   └── user.model.ts
│   │   └── services/
│   │       ├── api.service.ts
│   │       ├── websocket.service.ts
│   │       ├── local-storage.service.ts
│   │       ├── cookie-storage.service.ts
│   │       └── session-storage.service.ts
│   │
│   ├── mocks/
│   │   ├── tasks.mock.ts
│   │   ├── users.mock.ts
│   │   └── websocket.mock.ts
│   │
│   │── shared/                     # reusable dumb UI
│   │   ├── components/
│   │   │   ├── navbar.ts
│   │   │   ├── loader.ts
│   │   │   ├── task-list.ts
│   │   │   ├── task-detail.ts
│   │   │   ├── task-form.ts
│   │   │   ├── task-card.ts
│   │   │   └── task-filters.ts
│   │   ├── directives/
│   │   │   └── autofocus.directive.ts
│   │   └── pipes/
│   │       └── date-format.pipe.ts
│   │
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.scss # Just bootstrap import
│
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```
