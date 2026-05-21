import { Button } from "@/components/ui/button";
import { fetchUsersAction } from "@/presentation/actions/userActions";
import { UserFormDialog } from "@/presentation/components/user-table/UserFormDialog";
import { columns } from "@/presentation/components/user-table/columns";
import { DataTable } from "@/presentation/components/user-table/data-table";
import { useUserStore } from "@/presentation/store/useUserStore";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.q || "";
  const limit = 10;

  const { data, total } = await fetchUsersAction(page, limit, query);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Cari nama atau email..."
      />

      {/* Pop-up form akan dirender di sini saat dibutuhkan */}
      <UserFormDialog />
    </div>
  );
}
