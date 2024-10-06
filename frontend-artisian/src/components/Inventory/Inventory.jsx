import { Link, useNavigate } from 'react-router-dom'
import {
  MoreHorizontal,
  Image as ImageIcon, Edit, Trash
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin'
import { useEffect, useState } from 'react'


export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export function Inventory() {

  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('http://localhost:3000/all_products')
      const result = await response.json();
      console.log(result);
      
      setDummyData(result.products)
    }

    fetchInventory();
  }, []);

  const statusColors = {
    active: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
  };

  const categoryColors = {
    ceramics: "bg-green-100 text-green-800",
    jewelery: "bg-yellow-100 text-yellow-800",
    woodworking: "bg-orange-800 text-white",
    paintings: "bg-red-100 text-red-800",
    marbles: "bg-teal-100 text-teal-800",
  };
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col bg-beige-100">
      <NavbarAdmin />
      <div className="flex flex-col gap-4 p-6">
        <div className='flex justify-end pr-2 '> 
          <Button className="bg-orange-800 text-white hover:bg-orange-900" onClick = {() => {
            navigate("/admin/add-product")
          }}>
            Add Product
          </Button>
        </div>
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
              <TableBody >
                {dummyData.map((product) => (
                
                  <TableRow key={product.id} className="cursor-pointer hover:bg-gray-100"> {/* Added cursor-pointer */}
                    <TableCell>
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Link to={'/admin/product'}
                        state={{product}}>
                        <img
                          src= {product.images[0]}
                          alt="Image description"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        </Link>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[product.status]} font-semibold`} variant="outline">
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.sales}</TableCell>
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
