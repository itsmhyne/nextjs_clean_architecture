import { User, CreateUserDTO, UpdateUserDTO } from "../entities/User";

export interface UserRepository {
  findAll(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ data: User[]; total: number }>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
