
import * as React from 'react';

import './DataTable.scss'
interface DataTableProps {
  dataType: 'products' | 'orders' | 'categories'; // определяем возможные значения для dataType
}

interface Product {
  id: number;
  title: string;
  price?: number;
}

interface Category {
  id: number;
  title: string;
}

interface Order {
  id: number;
}

const randomProducts: Product[] = [
  { id: 1, title: 'Product 1', price: 100 },
  { id: 2, title: 'Product 2', price: 200 },
  { id: 3, title: 'Product 3', price: 300 },
];

const randomCategories: Category[] = [
  { id: 1, title: 'Category 1' },
  { id: 2, title: 'Category 2' },
  { id: 3, title: 'Category 3' },
];

const randomOrders: Order[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function DataTable({ dataType }: DataTableProps) {
  const products = randomProducts;
  const categories = randomCategories;
  const orders = randomOrders;

  switch (dataType) {
    case 'products':
      return (
        <table className="data-table">
          <caption>{dataType}</caption>
          <thead>
            <tr>
              <th className="w-100px">Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="font-medium">{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <button className="btn-edit">Изменить</button>
                  <button className="btn-delete">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'orders':
      return (
        <table className="data-table">
          <caption>{dataType}</caption>
          <thead>
            <tr>
              <th className="w-[100px]">Invoice</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>
                  <button className="btn-delete">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'categories':
      return (
        <table className="data-table">
          <caption>{dataType}</caption>
          <thead>
            <tr>
              <th className="w-[100px]">Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="font-medium">{category.id}</td>
                <td>{category.title}</td>
                <td>
                  <button className="btn-edit">Изменить</button>
                  <button className="btn-delete">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return <div>nothing</div>;
  }
}
