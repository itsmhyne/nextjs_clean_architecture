// src/core/entities/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipe untuk data yang dibutuhkan saat membuat user baru
export type CreateUserDTO = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserDTO = Partial<CreateUserDTO> & { id: string };
