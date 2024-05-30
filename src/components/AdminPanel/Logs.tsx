import {ScrollArea} from "../ui/scroll-area";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface UserLog {
  userName: string;
  status: string;
  message: string;
  date: string;
}
export default function Logs() {
    const [userLogs, setUserLogs] = useState<UserLog[]>([]);
    const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/Logs/GetLogs",
        { withCredentials: true }
      );
      setUserLogs(response.data.reverse());
    } catch (error) {
      console.error("Ошибка при загрузке логов:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);
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
    return (
        <ScrollArea className="h-[500px] w-[850px] rounded-md border p-4">
           {userLogs.length > 0 ? (
                userLogs.map((log, index) => (
                  <div key={index} className="mb-2">
                    <p><span className="text-xs text-gray-500">({formatDate(log.date)})</span>{log.message}</p>
                  </div>
                ))
              ) : (
                <p>Логи отсутствуют</p>
              )}
        </ScrollArea>
    )
}