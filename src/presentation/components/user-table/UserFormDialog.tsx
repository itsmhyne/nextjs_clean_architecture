"use client";

import { useUserStore } from "@/presentation/store/useUserStore";
import {
  createUserAction,
  updateUserAction,
} from "@/presentation/actions/userActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function UserFormDialog() {
  const { isModalOpen, closeModal, selectedUser } = useUserStore();
  const isEdit = !!selectedUser;

  async function handleSubmit(formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: (formData.get("role") as string) || "MEMBER",
    };

    try {
      if (isEdit && selectedUser) {
        await updateUserAction({ id: selectedUser.id, ...data });
        toast.success("Berhasil!", {
          description: "Data pengguna berhasil diperbarui.",
        });
      } else {
        await createUserAction(data);
        toast.success("Berhasil!", {
          description: "Pengguna baru berhasil ditambahkan.",
        });
      }
      closeModal();
    } catch (err) {
      toast.error("Gagal!", {
        description: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Nama Lengkap"
            defaultValue={selectedUser?.name || ""}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={selectedUser?.email || ""}
            required
          />
          <Input
            name="role"
            placeholder="Role (contoh: ADMIN atau MEMBER)"
            defaultValue={selectedUser?.role || "MEMBER"}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
