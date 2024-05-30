import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import {columnsFeedbacks} from "./columnsFeedbacks";
import {columnsComments} from "./columnsComments";

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
export default function PanelComments() {
  const [data, setData] = useState<Comment[]>([]);


  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Comments?page=1&pageSize=100&sortField=createdAt&sortOrder=asc",
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

  const handleDeleteOrder = async (commentId: number) => {
    try {
      await axios.delete(`http://localhost:8080/Comments/${commentId}`, {
        withCredentials: true,
      });
      toast("Комментарий успешно удален");
      setData(data.filter(order => order.id !== commentId));
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Комментарии</h1>
      </div>
      <DataTable
        columns={columnsComments.concat([
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
