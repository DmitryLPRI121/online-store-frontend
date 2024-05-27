import React from "react";
import "./AccountPage.scss";
import { Navbar } from "../../components/Navbar";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}

interface ProductsList {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  status: {
    title: string;
  };
  products: ProductsList[];
}

const data: Order[] = [
  {
    id: 1,
    status: { title: "Pending" },
    products: [
      {
        product: {
          id: 1,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 1",
          price: 50,
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 2",
          price: 30,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    status: { title: "Shipped" },
    products: [
      {
        product: {
          id: 3,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 3",
          price: 20,
        },
        quantity: 4,
      },
      {
        product: {
          id: 4,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 4",
          price: 40,
        },
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    status: { title: "Delivered" },
    products: [
      {
        product: {
          id: 5,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 5",
          price: 15,
        },
        quantity: 3,
      },
      {
        product: {
          id: 6,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 6",
          price: 25,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 4,
    status: { title: "Canceled" },
    products: [
      {
        product: {
          id: 7,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 7",
          price: 60,
        },
        quantity: 2,
      },
      {
        product: {
          id: 8,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 8",
          price: 80,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 5,
    status: { title: "Pending" },
    products: [
      {
        product: {
          id: 9,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 9",
          price: 70,
        },
        quantity: 3,
      },
      {
        product: {
          id: 10,
          imageUrl: "https://via.placeholder.com/150",
          title: "Product 10",
          price: 90,
        },
        quantity: 2,
      },
    ],
  },
];

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <div className="size-full p-5 px-32">
        <div className="flex size-full flex-col gap-10 rounded-2xl">
          <p className="text-5xl font-extrabold">Личный кабинет</p>
          <p className="text-2xl font-bold">
            Логин пользователя: USER.EMAIL
              {/* {session?.data?.user?.email} */}
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-xl">
            <h1
              id="your-orders-heading"
              className="text-3xl font-bold tracking-tight text-gray-900"
            >
              Ваши заказы
            </h1>
          </div>

          <div className="mt-12 space-y-16 sm:mt-16">
            {data.map((order) => (
              <section key={order.id}>
                <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                  <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                    Заказ #{order.id}
                  </h2>
                  <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {order.status.title}
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
                  {order.products.map((productsList) => (
                    <div key={productsList.product.id} className="py-6 sm:flex">
                      <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                        <img
                          src={productsList.product.imageUrl}
                          className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a
                              href={`/main/products/${productsList.product.id}`}
                            >
                              {productsList.product.title}
                            </a>
                          </h3>
                          <p className="mt-1 font-medium text-gray-900">
                            ${productsList.product.price}
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
    </>
  );
}
