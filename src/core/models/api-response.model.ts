// src/core/models/api-response.model.ts
export interface ApiResponse<T> {
  code: number;
  message: string;
  response: T | null;
}
