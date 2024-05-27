import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { BriefcaseIcon, CogIcon, HomeIcon } from "lucide-react";
import { ClassValue } from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import {Button} from "../../components/ui/button";
import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {Footer} from "../../components/Footer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "../../components/ui/alert-dialog";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";

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

interface OrderProduct {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  rating: number;
  categoryId: number;
  categoryTitle: string;
  subcategoryTitle: string;
  attributes: { attribute: { id: number; title: string }; value: string }[];
}

interface Order {
  id: number;
  address: string;
  userId: number;
  statusId: number;
  orderProducts: OrderProduct[];
}
const mockOrders: Order[] = [
  {
    id: 1,
    address: "123 Main St, Springfield, USA",
    userId: 1,
    statusId: 1,
    orderProducts: [
      {
        id: 1,
        title: "Игровой компьютер",
        description: "Высокопроизводительный игровой компьютер",
        imageUrl: "https://pbs.twimg.com/media/D8tUXF5WkAMKa_S.jpg:large",
        quantity: 1,
        price: 1500,
        rating: 5,
        categoryId: 1,
        categoryTitle: "Компьютер",
        subcategoryTitle: "Игровой",
        attributes: [
          { attribute: { id: 1, title: "Размер" }, value: "Средний" },
          { attribute: { id: 2, title: "Цвет" }, value: "Черный" },
          { attribute: { id: 3, title: "Экран" }, value: "27 дюймов" },
          { attribute: { id: 4, title: "Процессор" }, value: "Intel i7" },
          { attribute: { id: 5, title: "Оперативная память" }, value: "16GB" },
          { attribute: { id: 6, title: "Графический ускоритель" }, value: "NVIDIA GTX 1080" }
        ]
      }
    ]
  },
  {
    id: 2,
    address: "456 Elm St, Springfield, USA",
    userId: 1,
    statusId: 2,
    orderProducts: [
      {
        id: 2,
        title: "Геймерская мышь",
        description: "Эргономичная мышь с RGB подсветкой",
        imageUrl: "https://example.com/mouse.jpg",
        quantity: 2,
        price: 50,
        rating: 4.5,
        categoryId: 2,
        categoryTitle: "Аксессуары",
        subcategoryTitle: "Мыши",
        attributes: [
          { attribute: { id: 1, title: "Размер" }, value: "Средний" },
          { attribute: { id: 2, title: "Цвет" }, value: "Черный" },
          { attribute: { id: 3, title: "Подключение" }, value: "Проводное" }
        ]
      }
    ]
  }
];

function classNames(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AccountPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(mockOrders);
  const [activeTab, setActiveTab] = useState('profile');

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [navigation, setNavigation] = useState([
  { name: 'Мой профиль', key: 'profile', icon: HomeIcon },
  { name: 'Заказы пользователя', key: 'orders', icon: BriefcaseIcon },
  { name: 'Настройки', key: 'settings', icon: CogIcon },
]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Accounts/GetUserData`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (userData && userData.userName === 'Admin') {
        // Проверяем, существует ли элемент с ключом 'dashboard' в массиве navigation
        const dashboardExists = navigation.some(item => item.key === 'dashboard');

        // Если элемент 'dashboard' еще не существует, добавляем его
        if (!dashboardExists) {
            setNavigation([
                ...navigation,
                { name: 'Панель управления', key: 'dashboard', icon: CogIcon }
            ]);
        }
    }
}, [userData]);

  const logOut = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Accounts/Logout`, {
          withCredentials: true,
        });
        toast('Вы успешно вышли');
        localStorage.setItem('login', 'false');
        navigate("/Home");
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };


  useEffect(() => {
    if (activeTab === 'orders' && userData) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/Orders/byUser/${userData.id}`, {
            withCredentials: true,
          });
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching user orders", error);
        }
      };

      fetchOrders();
    }
  }, [activeTab, userData]);
  const handleChangePassword = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangePassword?currentPassword=${oldPassword}&newPassword=${newPassword}`, {}, {
        withCredentials: true,
      });
      alert('Пароль успешно изменен');
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangeEmail?newEmail=${newEmail}&password=${currentPassword}`, {}, {
        withCredentials: true,
      });
      alert('Email успешно изменен');
    } catch (error) {
      console.error('Error changing email', error);
    }
  };

  const handleChangePhoneNumber = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangePhoneNumber?newPhoneNumber=${newPhoneNumber}&password=${currentPassword}`, {}, {
        withCredentials: true,
      });
      alert('Номер телефона успешно изменен');
    } catch (error) {
      console.error('Error changing phone number', error);
    }
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-4xl font-semibold pb-10">Профиль пользователя:</h2>
            <p><strong>Имя пользователя:</strong> {userData?.userName}</p>
            <p><strong>Имя:</strong> {userData?.name}</p>
            <p><strong>Фамилия:</strong> {userData?.surName}</p>
            <p><strong>Отчество:</strong> {userData?.middleName}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Телефон:</strong> {userData?.phoneNumber}</p>
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
                <AlertDialogAction onClick={() => logOut()}>Продолжить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          </div>
        );
      case 'orders':
        return (
            <div className="bg-white">
              <div className=" max-w-3xl px-4 py-10 sm:px-6 ">
                <div className="max-w-xl">
                  <h1
                      id="your-orders-heading"
                      className="text-3xl font-bold tracking-tight text-gray-900"
                  >
                    Ваши заказы
                  </h1>
                </div>

                <div className="mt-12 space-y-16 sm:mt-16">
                  {mockOrders?.map((order) => (
                      <section key={order?.id}>
                        <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                          <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                            Заказ #{order?.id}
                          </h2>
                          <div
                              className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                            <p className="text-sm font-medium text-gray-500">
                              {order?.statusId}
                            </p>
                            <div className="flex text-sm font-medium">
                              <a
                                  href={`${order.id}`}
                                  className="text-indigo-600 hover:text-indigo-500"
                              >
                                Manage order
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                          {order?.orderProducts.map((productsList) => (
                              <div key={productsList.id} className="py-6 sm:flex">
                                <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                                  <img
                                      src={productsList.imageUrl} // Используйте свойство imageSrc, а не imageUrl
                                      className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                                  />
                                  <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                                    <h3 className="text-sm font-medium text-gray-900">
                                      <a
                                          href={`/products/${productsList.id}`}
                                      >
                                        {productsList.title}
                                      </a>
                                    </h3>
                                    <p className="mt-1 font-medium text-gray-900">
                                      ${productsList.price}
                                    </p>
                                    <p className="mt-1 font-medium text-gray-900">
                                      Количество: {productsList.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                                  <button
                                      type="button"
                                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                  >
                                    Купить снова
                                  </button>
                                </div>
                              </div>
                          ))}
                        </div>
                      </section>
                  ))}
                </div>
              </div>
            </div>
        );
      case 'dashboard':
        return(
              <AdminPage/>
        )
      case 'settings':
        return (
            <>
            <div>
              <h2 className="text-4xl font-semibold pb-10">Настройки:</h2>
              <div>
                <div className="flex flex-col gap-5">
                <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Сменить пароль</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Сменить пароль</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Старый пароль
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Новый пароль
                    </Label>
                    <Input
                      id="username"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                  <Button type="submit" onClick={handleChangePassword}>Сохранить</Button>
              </DialogContent>
            </Dialog>
                <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Поменять почту</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Смена почты</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Новая почта
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                onChange={(e) => setNewEmail(e.target.value)}

                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Пароль
                    </Label>
                    <Input
                      id="username"
                onChange={(e) => setCurrentPassword(e.target.value)}

                      className="col-span-3"
                    />
                  </div>
                </div>
                  <Button type="submit" onClick={handleChangeEmail}>Сохранить</Button>
              </DialogContent>
            </Dialog>
                <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Поменять телефон</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Смена телефона</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Новый телефон
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                onChange={(e) => setNewPhoneNumber(e.target.value)}


                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Пароль
                    </Label>
                    <Input
                      id="username"
                onChange={(e) => setCurrentPassword(e.target.value)}


                      className="col-span-3"
                    />
                  </div>
                </div>
                  <Button type="submit" onClick={handleChangePhoneNumber}>Сохранить</Button>
              </DialogContent>
            </Dialog>
                  </div>
            </div>
            </div>
              </>
        );
      default:
        return null;
    }
  };

  return (
      <>
        <Navbar/>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4 h-8"></div>
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={classNames(
                            activeTab === item.key
                                ? 'bg-purple-50 border-purple-600 text-purple-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group border-l-4 py-2 px-3 flex items-center text-sm font-medium w-full text-left'
                        )}
                    >
                      <item.icon
                          className={classNames(
                              activeTab === item.key ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                      />
                      {item.name}
                    </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="p-4 sm:ml-64 pt-24">
          {renderContent()}
        </div>
      </>
  );
}
