import { create } from "zustand";
import { User } from "@/core/entities/User";

interface UserStore {
  isModalOpen: boolean;
  selectedUser: User | null; // Jika null = Tambah, jika ada isi = Edit
  openModalForCreate: () => void;
  openModalForEdit: (user: User) => void;
  closeModal: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isModalOpen: false,
  selectedUser: null,
  openModalForCreate: () => set({ isModalOpen: true, selectedUser: null }),
  openModalForEdit: (user) => set({ isModalOpen: true, selectedUser: user }),
  closeModal: () => set({ isModalOpen: false, selectedUser: null }),
}));
