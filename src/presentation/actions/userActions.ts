"use server";

import { revalidatePath } from "next/cache";
import { PrismaUserRepository } from "@/infrastructure/repositories/PrismaUserRepository";
import { UserUseCases } from "@/core/use-cases/UserUseCases";
import { CreateUserDTO, UpdateUserDTO } from "@/core/entities/User";
import { errorResponse, successResponse } from "@/core/utils/ActionResponse";

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
  try {
    await useCases.createUser(data);
    revalidatePath("/");

    // Gunakan fungsi global untuk sukses
    return successResponse("Pengguna baru berhasil ditambahkan.");
  } catch (error: any) {
    // Gunakan fungsi global untuk gagal
    return errorResponse(error.message || "Gagal menambahkan pengguna.");
  }
}

export async function updateUserAction(data: UpdateUserDTO) {
  try {
    await useCases.updateUser(data);
    revalidatePath("/");

    return successResponse("Data pengguna berhasil diperbarui.");
  } catch (error: any) {
    return errorResponse(error.message || "Gagal memperbarui pengguna.");
  }
}

export async function deleteUserAction(id: string) {
  try {
    await useCases.deleteUser(id);
    revalidatePath("/");

    return successResponse("Data pengguna telah berhasil dihapus.");
  } catch (error: any) {
    return errorResponse(error.message || "Gagal menghapus data pengguna.");
  }
}
