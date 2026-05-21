// src/core/utils/ActionResponse.ts

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export function successResponse<T>(
  message: string,
  data?: T
): ActionResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message: string): ActionResponse {
  return {
    success: false,
    message,
  };
}
