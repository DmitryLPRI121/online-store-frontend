import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";

interface UserData {
  id: string;
  userName: string;
  name: string;
  surName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
}

interface UserLog {
  userName: string;
  status: string;
  message: string;
  date: string;
}

export default function AccountInfo() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Accounts/GetUserData`, {
          withCredentials: true,
        });
        setUserData(response.data);

        const logsResponse = await axios.get(`http://localhost:8080/api/Logs/GetLogsByUsername?username=${response.data.userName}`, {
          withCredentials: true,
        });
        setUserLogs(logsResponse.data.reverse());  // Reverse the logs order
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const logOut = async () => {
    try {
      await axios.get(`http://localhost:8080/Accounts/Logout`, {
        withCredentials: true,
      });
      toast('Вы успешно вышли');
      localStorage.setItem('login', 'false');
      navigate("/Home");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

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
    <div className="max-w-[1000px] mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-4xl font-semibold pb-6">Профиль</h2>
      <div className="flex">
        <div className="w-[500px] p-4">
          <div className="flex items-center">
            <img className="h-20 w-20 rounded-full object-cover" src={'https://i.imgur.com/JNg2F7i.jpeg'} alt="User avatar" />
            <div className="ml-4">
              <h3 className="text-2xl font-medium">{userData?.name}</h3>
              {userData?.userName!== 'Admin'?(
                  <p className="text-gray-600">Роль: Покупатель</p>
              ) : (
                  <p className="text-gray-600">Роль: Админ</p>
              )}
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600"><strong>Email: </strong>{userData?.email}</p>
            <p className="text-gray-600"><strong>Телефон: </strong>{userData?.phoneNumber}</p>
            <p className="text-gray-600"><strong>Полное имя: </strong>{userData?.name} {userData?.surName} {userData?.middleName}</p>
          </div>
        </div>
       {userData?.userName === 'Admin' && (
        <div className=" p-4 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold">Последние действия</h3>
          <div className="mt-2 text-gray-600">
            <ScrollArea className="h-[200px] w-[600px] rounded-md border p-4">
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
          </div>
        </div>
      )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <button
            className="mt-10 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Выйти
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены, что хотите выйти из аккаунта?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={logOut}>Продолжить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
