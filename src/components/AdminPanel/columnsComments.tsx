import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  userName: string | null;
  name: string;
  surName: string;
  middleName: string;
  email: string | null;
  phoneNumber: string;
  birthDate: string;
  avatar: string | null;
}

interface Comment {
  id: number;
  text: string;
  user: User;
  haveComments: boolean;
  createdAt: string;
  updatedAt: string;
}
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleString('ru-RU', options);
  };

export const columnsComments: ColumnDef<Comment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "user.id",
    header: "UserId",
  },
  {
    accessorKey: "haveComments",
    header: "HaveComments",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];
