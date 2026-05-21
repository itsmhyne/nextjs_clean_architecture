// src/infrastructure/repositories/PrismaUserRepository.ts
import { prisma } from "@/lib/prisma"; // Mengambil instance dari lib/prisma.ts
import { UserRepository } from "@/core/repositories/UserRepository";
import { User, CreateUserDTO, UpdateUserDTO } from "@/core/entities/User";

export class PrismaUserRepository implements UserRepository {
  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    // Ambil data dan hitung total data (untuk pagination) secara bersamaan
    const [data, total] = await prisma.$transaction([
      prisma.user.findMany({
        where: { name: { contains: search || "", mode: "insensitive" } },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({
        where: { name: { contains: search || "", mode: "insensitive" } },
      }),
    ]);

    return { data, total };
  }

  async create(data: CreateUserDTO): Promise<User> {
    return await prisma.user.create({ data });
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const { id, ...updateData } = data;
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
