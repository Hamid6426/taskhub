# Project File & Folder Structure

```
taskhub/
├── src/
│   ├── app/
│   │   │── login/                      # route-level smart components
│   │   │   ├── dashboard.ts
│   │   │   └── login.ts
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
│   │── shared/                     # reusable dumb UI
│   │   ├── components/
│   │   │   ├── navbar.component.ts
│   │   │   ├── loader.component.ts
│   │   │   ├── task-list.component.ts
│   │   │   ├── task-detail.component.ts
│   │   │   ├── task-form.component.ts
│   │   │   ├── task-card.component.ts
│   │   │   └── task-filters.component.ts
│   │   ├── pipes/
│   │   │   └── date-format.pipe.ts
│   │   └── directives/
│   │       └── autofocus.directive.ts
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
