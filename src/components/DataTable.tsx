import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
} from './ui/table';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter
} from "./ui/dialog";

interface Attribute {
  attribute: {
    id: number;
    title: string;
  };
  value: string;
}

interface Product {
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
  attributes: Attribute[];
}

interface ProductsResponse {
  data: Product[];
}

interface DataTableProps {
  dataType: 'products' | 'feedbacks' | 'orders' | 'comments'; // определяем возможные значения для dataType
}

export default function DataTable({ dataType }: DataTableProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductsResponse>(
          'http://localhost:8080/Products?page=1&pageSize=200&minPrice=1&maxPrice=300000',
          { withCredentials: true }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    quantity: '',
    price: '',
  });
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/Products',
        {
          ...newProduct,
          id: parseInt(newProduct.id),
          quantity: parseInt(newProduct.quantity),
          price: parseFloat(newProduct.price),
        },
        { withCredentials: true }
      );
      // После успешного добавления продукта, обновляем список продуктов
      const response = await axios.get<ProductsResponse>(
        'http://localhost:8080/Products?page=1&pageSize=200&minPrice=1&maxPrice=300000',
        { withCredentials: true }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
    }
  };

  switch (dataType) {
    case 'products':
      return (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">{dataType}</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Добавить продукт</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Добавить продукт</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="id" className="text-right">
                        Id
                      </Label>
                      <Input
                        id="id"
                        value={newProduct.id}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
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
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imageUrl" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        id="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
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
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Сохранить</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        <Table>
          <TableCaption>{dataType}</TableCaption>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Sheet>
                    <SheetTrigger>
                      <button className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        Изменить
                      </button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Изменить продукт</SheetTitle>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`id-${row.id}`} className="text-right">
                            Id
                          </Label>
                          <Input
                            id={`id-${row.id}`}
                            className="col-span-3"
                            defaultValue={row.original.id}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`title-${row.id}`} className="text-right">
                            Title
                          </Label>
                          <Input
                            id={`title-${row.id}`}
                            className="col-span-3"
                            defaultValue={row.original.title}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={`price-${row.id}`} className="text-right">
                            Price
                          </Label>
                          <Input
                            id={`price-${row.id}`}
                            className="col-span-3"
                            defaultValue={row.original.price}
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Сохранить</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </TableCell>
                <TableCell className="text-right">
                  <button className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Удалить
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </Table>
          </>
      );

    default:
      return <div>nothing</div>;
  }
}
