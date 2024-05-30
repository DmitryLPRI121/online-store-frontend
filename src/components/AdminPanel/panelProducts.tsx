import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DataTable } from "./data-table";
import { columnsProducts, Product } from "./columnsProducts";

export default function PanelProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    title: "",
    description: "",
    image: null,
    quantity: 0,
    price: 0,
    subcategoryId: 1,
    attributeValues: {}
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Products?page=1&pageSize=200&sortField=id&sortOrder=Desc&minPrice=1&maxPrice=300000",
        { withCredentials: true }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("Title", newProduct.title);
    formData.append("Description", newProduct.description);
    if (newProduct.image) {
      formData.append("Image", newProduct.image);
    }
    formData.append("Quantity", newProduct.quantity.toString());
    formData.append("Price", newProduct.price.toString());
    formData.append("SubcategoryId", newProduct.subcategoryId.toString());
    formData.append("AttributeValues", JSON.stringify(newProduct.attributeValues));

    try {
      await axios.post("http://localhost:8080/Products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast("Продукт успешно добавлен");
      await fetchProducts(); // Обновляем список продуктов после добавления нового
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8080/Products/${productId}`, {
        withCredentials: true,
      });
      toast("Продукт успешно удален");
      setData(data.filter(product => product.id !== productId)); // Удаляем продукт из списка после удаления
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Продукты</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Добавить продукт</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить продукт</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProduct}>Сохранить</Button>
                  </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columnsProducts.concat([
          {
            id: "actions",
            cell: ({ row }) => (
              <>
                <Button variant="outline" onClick={() => handleDeleteProduct(row.original.id)}>
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

