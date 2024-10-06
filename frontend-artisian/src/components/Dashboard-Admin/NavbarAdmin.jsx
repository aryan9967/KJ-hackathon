import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import {
    CircleUser,
    Package2,
    Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Joyride from "react-joyride"

function NavbarAdmin() {
    const [runTour, setRunTour] = useState(false)

    const steps = [
        {
            target: '.navbar_joy',
            content: 'Navigation bar to access different parts of the website.',
        },
        {
            target: '.chatbot',
            content: 'This is your personal chatbot. It will help you to navigate through the website.',
        },
    ]

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour')
        if (!hasSeenTour) {
            setRunTour(true)
        }
    }, [])

    const handleJoyrideCallback = (data) => {
        const { status } = data
        if (status === 'finished' || status === 'skipped') {
            localStorage.setItem('hasSeenTour', 'true')
        }
    }

    return (
        <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 navbar_joy">
            <Joyride
                steps={steps}
                run={runTour}
                continuous={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
            />
            <nav className="hidden flex-col gap-6 text-md font-medium md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-12">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    to='/admin'
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    to='/admin/orders'
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Orders
                </Link>
                <Link
                    to='/admin/inventory'
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Inventory
                </Link>
                <Link
                    to='/admin/add-product'
                    className="text-muted-foreground transition-colors hover:text-foreground add-product"
                >
                    AddProduct
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    {/* Sheet content remains the same */}
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default NavbarAdmin