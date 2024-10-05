import { Link } from "react-router-dom"

import {
    CircleUser,
    NotebookPen,
    Menu,
    Package2,
    Search,
    CircleCheck,
    CircleDashed,
    ShieldAlert,
    BadgeDollarSign,
    TrendingUp,
    PackageCheck,
} from "lucide-react"

import { BarChartComponent } from "./BarChart"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { useEffect, useState } from "react"
import NavbarAdmin from "./NavbarAdmin"
import ChatbotArtisan from "../ChatbotArtisan"



export const description =
    "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales."

export function Dashboard() {
    const [recentComplaints, setRecentComplaints] = useState([{
        product_name: "Handcrafted Pottery",
        buyer_email: "buyer1@example.com",
        sell_price: 1500,
        product_image: ""
    },
    {
        product_name: "Woven Baskets",
        buyer_email: "buyer2@example.com",
        sell_price: 800,
        product_image: ""
    },
    {
        product_name: "Leather Goods",
        buyer_email: "buyer3@example.com",
        sell_price: 1200,
        product_image: ""
    },
    {
        product_name: "Wooden Sculptures",
        buyer_email: "buyer4@example.com",
        sell_price: 2000,
        product_image: ""
    },
    {
        product_name: "Textile Products",
        buyer_email: "buyer5@example.com",
        sell_price: 1800,
        product_image: ""
    },
    {
        product_name: "Handmade Jewelry",
        buyer_email: "buyer6@example.com",
        sell_price: 1000,
        product_image: ""
    }])

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/v1/complaint/get-all-complaints', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const result = await res.json();
                console.log(result);

                if (!res.ok)
                    throw new Error("Error while fetching complaints")

                setRecentComplaints(result.complants);
            } catch (error) {
                console.log(error);

            }
        }
    }, [recentComplaints])



    const handleViewDetails = (complaint) => {

    };


    return (
        <div className="main_container">
            <div className="flex min-h-screen w-full flex-col main_screen">
                <div className="navbar_container">
                    <NavbarAdmin />
                </div>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card x-chunk="dashboard-01-chunk-0" className="shadow-md dark:border-gray-800 bg-blend-darken">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Monthly Sales
                                </CardTitle>
                                <BadgeDollarSign className="rounded-full  p-1 text-white w-8 h-8 bg-orange-800" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4523</div>
                                <p className="text-xs text-green-500">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-0" className="shadow-md dark:border-gray-800 bg-blend-darken">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Monthly Profit
                                </CardTitle>
                                <TrendingUp className="rounded-full  p-1 text-white w-8 h-8 bg-orange-800" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1050</div>
                                <p className="text-xs  text-green-500">
                                    +10% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-0" className="shadow-md dark:border-gray-800 bg-blend-darken">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active SKU'S
                                </CardTitle>
                                <PackageCheck className="rounded-full  p-1 text-white w-8 h-8 bg-orange-800" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3473</div>
                                <p className="text-xs text-green-500">
                                    +15% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-0" className="shadow-md dark:border-gray-800 bg-blend-darken">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Pending Orders
                                </CardTitle>
                                <CircleDashed className="rounded-full  p-1 text-white w-8 h-8 bg-orange-800" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">680</div>
                                <p className="text-xs text-muted-foreground text-red-500">
                                    +5.1% from last month
                                </p>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
                        <BarChartComponent />
                        <Card x-chunk="dashboard-01-chunk-5" className="dark:border-gray-800 dark:shadow-lg">
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                {recentComplaints.map((sale) => (
                                    <div
                                        key={sale.product_name}
                                        className="flex items-center gap-4 hover:shadow-lg hover:scale-95 hover:cursor-pointer"
                                        onClick={() => {
                                            handleViewDetails(sale);
                                        }}
                                    >
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={sale.product_image || "https://ui.shadcn.com/avatars/01.png"} alt="Product Image" />
                                            <AvatarFallback>{sale.product_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium text-start">
                                                {sale.product_name.toUpperCase()}
                                            </p>
                                            <p className="text-sm text-muted-foreground text-start">
                                                {sale.buyer_email}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-semibold text-sm text-white rounded-full px-2 py-1 bg-orange-800">
                                            ${sale.sell_price}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                    </div>
                    <ChatbotArtisan />
                </main>
            </div>
        </div>
    )
}
