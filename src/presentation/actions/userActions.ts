"use server";

import { revalidatePath } from "next/cache";
import { PrismaUserRepository } from "@/infrastructure/repositories/PrismaUserRepository";
import { UserUseCases } from "@/core/use-cases/UserUseCases";
import { CreateUserDTO, UpdateUserDTO } from "@/core/entities/User";

const repository = new PrismaUserRepository();
const useCases = new UserUseCases(repository);

export async function fetchUsersAction(
  page: number = 1,
  limit: number = 10,
  search?: string
) {
  return await useCases.getAllUsers(page, limit, search);
}

export async function createUserAction(data: CreateUserDTO) {
  await useCases.createUser(data);
  revalidatePath("/"); // Refresh UI tabel
}

export async function updateUserAction(data: UpdateUserDTO) {
  await useCases.updateUser(data);
  revalidatePath("/"); // Refresh UI tabel
}

export async function deleteUserAction(id: string) {
  await useCases.deleteUser(id);
  revalidatePath("/"); // Refresh UI tabel
}
