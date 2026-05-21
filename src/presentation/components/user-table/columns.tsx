"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/core/entities/User";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/presentation/store/useUserStore";
import { deleteUserAction } from "@/presentation/actions/userActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const ActionButtons = ({ user }: { user: User }) => {
  const openModalForEdit = useUserStore((state) => state.openModalForEdit);

  const handleDelete = async () => {
    try {
      const response = await deleteUserAction(user.id);
      if (response.success) {
        toast.success("Berhasil dihapus!", { description: response.message });
      } else {
        toast.error("Gagal!", { description: response.message });
      }
    } catch (error) {
      toast.error("Gagal!", { description: "Gagal menghapus data pengguna." });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => openModalForEdit(user)}
      >
        Edit
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Hapus
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data pengguna{" "}
              <b>{user.name}</b> akan dihapus secara permanen dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* Tombol Batal (Otomatis menutup dialog) */}
            <AlertDialogCancel>Batal</AlertDialogCancel>

            {/* Tombol Aksi (Menjalankan fungsi hapus) */}
            <AlertDialogAction onClick={handleDelete} variant="destructive">
              Ya, Hapus Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nama" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original;
      // 3. Panggil komponen React yang sudah kita buat di atas
      return <ActionButtons user={user} />;
    },
  },
];
