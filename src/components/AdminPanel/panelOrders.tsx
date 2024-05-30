import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columnsOrders } from "./columnsOrders";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";

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

export default function PanelOrders() {
  const [data, setData] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Orders",
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`http://localhost:8080/Orders/${orderId}`, {
        withCredentials: true,
      });
      toast("Продукт успешно удален");
      setData(data.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  const handleChangeOrderStatus = async (orderId: number) => {
    try {
      // Определяем текущий статус заказа
      const currentOrder = data.find(order => order.id === orderId);
      if (!currentOrder) return;

      // Если статус заказа уже "2", то выходим из функции
      if (currentOrder.status === "2") return;

      // Иначе отправляем запрос на изменение статуса
      await axios.put(
        `http://localhost:8080/Orders?orderId=${orderId}&statusId=2`,
        null, // Пустое тело запроса
        { withCredentials: true }
      );

      // Обновляем данные о заказах
      fetchOrders();

      toast("Статус заказа успешно изменен");
    } catch (error) {
      console.error("Ошибка при изменении статуса заказа:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Заказы</h1>
      </div>
      <DataTable
        columns={columnsOrders.concat([
          {
            id: "actions",
            cell: ({ row }) => (
              <>
                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                  variant="outline"
                  onClick={() => handleChangeOrderStatus(row.original.id)}
                  disabled={row.original.status === "Выполнен"}
                >
                  Изменить статус
                </Button></DropdownMenuItem>
            <DropdownMenuItem><Button variant="outline" onClick={() => handleDeleteOrder(row.original.id)}>
                  Удалить
                </Button></DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>


              </>
            ),
          },
        ])}
        data={data}
      />
    </div>
  );
}
