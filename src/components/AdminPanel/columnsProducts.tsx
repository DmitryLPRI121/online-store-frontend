import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import {Label} from "../ui/label";
import {Input} from "../ui/input";

import {useState} from "react";

export type Product = {
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
};

export const columnsProducts: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "edit",
    cell: function EditCell({ row }) { // Renamed function to `EditCell`
      const product = row.original;
      const [editedProduct, setEditedProduct] = useState({
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.imageUrl,
        quantity: product.quantity,
        price: product.price,
        subcategoryId: 1,
        attributeValues: {}
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Explicit typing of `e`
        const { name, value } = e.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
      };

      const handleFileChange = (e: any) => { // Explicit typing of `e`
        setEditedProduct((prev) => ({ ...prev, image: e.target.files[0] }));
      };

      const handleEditProduct = async () => {
        const formData = new FormData();
       formData.append("Id", editedProduct.id.toString());
        formData.append("Title", editedProduct.title);
        formData.append("Description", editedProduct.description);
        if (editedProduct.image) {
          formData.append("Image", editedProduct.image);
        }
        formData.append("Quantity", editedProduct.quantity.toString());
        formData.append("Price", editedProduct.price.toString());
        formData.append("SubcategoryId", editedProduct.subcategoryId.toString());
        formData.append("AttributeValues", JSON.stringify(editedProduct.attributeValues));

        try {
          await axios.put(`http://localhost:8080/Products`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast("Продукт успешно изменен");
        } catch (error) {
          console.error("Ошибка при изменении продукта:", error);
        }
      };

      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Изменить</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Изменить продукт</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={editedProduct.title}
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
                  value={editedProduct.description}
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
                  value={editedProduct.quantity}
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
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleEditProduct}>Сохранить</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
