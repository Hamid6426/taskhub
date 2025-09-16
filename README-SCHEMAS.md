# WEB APP SCHEMAS

## User Schema

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "avatarUrl": "string | null",
  "role": "user | admin"
}
```

## Task Schema

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
