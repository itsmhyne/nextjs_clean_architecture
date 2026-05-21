// src/core/use-cases/UserUseCases.ts
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDTO, UpdateUserDTO } from "../entities/User";

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  // Kita tambahkan parameter paginasi dan pencarian di sini
  async getAllUsers(page: number, limit: number, search?: string) {
    // Logika bisnis: pastikan page tidak kurang dari 1
    const currentPage = Math.max(1, page);

    // Memanggil repository dengan parameter yang sudah disiapkan
    return await this.userRepository.findAll(currentPage, limit, search);
  }

  async createUser(data: CreateUserDTO) {
    if (!data.email.includes("@")) throw new Error("Email tidak valid");
    return await this.userRepository.create(data);
  }

  async updateUser(data: UpdateUserDTO) {
    if (data.email && !data.email.includes("@"))
      throw new Error("Email tidak valid");
    return await this.userRepository.update(data);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
