import { ColumnDef } from "@tanstack/react-table";

interface OrderItem {
  productId: number;
  productTitle: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  address: string;
  status: string;
  userId: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
}

export const columnsOrders: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "userId",
    header: "UserId",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
];
