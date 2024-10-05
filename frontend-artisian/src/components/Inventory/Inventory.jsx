import { Link } from 'react-router-dom'
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  Image as ImageIcon, Edit, Trash
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin'


export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export function Inventory() {

  const dummyData = [
    { id: 1, name: "Handcrafted Ceramic Vase", status: "Active", price: 89.99, totalSales: 42, category: "Home Decor", image: "/placeholder.svg" },
    { id: 2, name: "Artisanal Cheese Board", status: "Active", price: 59.99, totalSales: 28, category: "Kitchen", image: "/placeholder.svg" },
    { id: 3, name: "Hand-knitted Wool Scarf", status: "Draft", price: 45.00, totalSales: 0, category: "Accessories", image: "/placeholder.svg" },
    { id: 4, name: "Wooden Wall Clock", status: "Active", price: 79.99, totalSales: 15, category: "Home Decor", image: "/placeholder.svg" },
    { id: 5, name: "Handmade Leather Wallet", status: "Active", price: 69.99, totalSales: 37, category: "Accessories", image: "/placeholder.svg" },
    { id: 6, name: "Botanical Print Set", status: "Draft", price: 34.99, totalSales: 0, category: "Art", image: "/placeholder.svg" },
  ];

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Draft: "bg-yellow-100 text-yellow-800",
  };

  const categoryColors = {
    "Home Decor": "bg-blue-100 text-blue-800",
    Kitchen: "bg-purple-100 text-purple-800",
    Accessories: "bg-pink-100 text-pink-800",
    Art: "bg-indigo-100 text-indigo-800",
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <NavbarAdmin />
      <div className="flex flex-col gap-4 p-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Local Artisan Products</CardTitle>
            <CardDescription>Manage your artisanal products and view their sales performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Price</TableHead>
                  <TableHead className="w-[120px]">Total Sales</TableHead>
                  <TableHead className="w-[150px]">Category</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyData.map((product) => (
                  
                    <TableRow className="cursor-pointer hover:bg-gray-100"> {/* Added cursor-pointer */}
                      <TableCell>
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-500" />
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[product.status]} font-semibold`} variant="outline">
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.totalSales}</TableCell>
                      <TableCell>
                        <Badge className={`${categoryColors[product.category]} font-semibold`} variant="outline">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-gray-500">
              Showing <strong>{dummyData.length}</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
