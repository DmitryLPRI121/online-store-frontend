import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button} from "../ui/button";
import {useNavigate} from "react-router-dom";

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

export default function AccountOrders() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

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
    if (!userData) return;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Orders/byUser/${userData.id}`, {
          withCredentials: true,
        });
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user orders", error);
      }
    };

    fetchOrders();
  }, [userData]);

  return (
    <div className="bg-white">
      <div className="max-w-3xl px-4 py-10 sm:px-6">
        <div className="max-w-xl">
          <h1 id="your-orders-heading" className="text-3xl font-bold tracking-tight text-gray-900">
            Ваши заказы
          </h1>
        </div>
        {orders.length > 0 ? (
          <div className="mt-12 space-y-16 sm:mt-16">
            {orders.map((order) => (
              <section key={order.id}>
                <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                  <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                    Заказ #{order.id}
                  </h2>
                  <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                    <p className="text-sm font-medium text-gray-500">{order.status}</p>
                    <div className="flex text-sm font-medium"></div>
                  </div>
                </div>

                <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                  {order.orderItems.map((item) => (
                    <div key={item.productId} className="py-6 sm:flex">
                      <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                        <img
                          src={item.imageUrl}
                          className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={`/products/${item.productId}`}>{item.productTitle}</a>
                          </h3>
                          <p className="mt-1 font-medium text-gray-900">${item.price}</p>
                          <p className="mt-1 font-medium text-gray-900">Количество: {item.quantity}</p>
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
        ) : (
            <div className="pt-10">
              <p className='mb-10'> У вас ещё нет заказов</p>

              <Button onClick={()=> navigate('/home')} >Перейти к покупкам</Button>
            </div>
        )}
      </div>
    </div>
  );
}
