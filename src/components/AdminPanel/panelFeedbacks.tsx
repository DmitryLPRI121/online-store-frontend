import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import {columnsFeedbacks} from "./columnsFeedbacks";

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

interface Feedback {
  id: number;
  rating: number;
  text: string;
  user: User;
  haveComments: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PanelFeedbacks() {
  const [data, setData] = useState<Feedback[]>([]);


  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Feedbacks?page=1&pageSize=200&sortField=createdAt&sortOrder=asc",
        { withCredentials: true }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Ошибка при загрузке отзывов:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDeleteOrder = async (feedbackId: number) => {
    try {
      await axios.delete(`http://localhost:8080/Feedbacks/${feedbackId}`, {
        withCredentials: true,
      });
      toast("Продукт успешно удален");
      setData(data.filter(order => order.id !== feedbackId));
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Заказы</h1>
      </div>
      <DataTable
        columns={columnsFeedbacks.concat([
          {
            id: "actions",
            cell: ({ row }) => (
              <>
                  <Button variant="outline" onClick={() => handleDeleteOrder(row.original.id)}>
                  Удалить
                </Button>
              </>
            ),
          },
        ])}
        data={data}
      />
    </div>
  );
}
