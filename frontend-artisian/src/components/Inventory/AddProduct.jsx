import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react';
import NavbarAdmin from '../Dashboard-Admin/NavbarAdmin'; // Adjust the import path as needed
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

export function AddProduct() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: 'Gamer Gear Pro Controller',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.',
            price: '',
            quantity: '',
            lowStockThreshold: '',
            category: '',
            status: '',
            images: []
        }
    });

    const onSubmit = (data) => {
        
    };

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e, onChange) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        onChange(files);
        if (!selectedImage && newImages.length > 0) {
            setSelectedImage(newImages[0].preview);
        }
    };

    return (
        <div className="main_container">
            <div className="navbar_container">
                <NavbarAdmin />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col bg-beige-100">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
                        <div className="mx-auto grid max-w-[65rem] flex-1 auto-rows-max gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Add Product
                                </h1>
                                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                    <Button type="button" variant="outline" size="sm">
                                        Discard
                                    </Button>
                                    <Button type="submit" size="sm">Add Product</Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card x-chunk="dashboard-07-chunk-0">
                                        <CardHeader>
                                            <CardTitle>Product Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} id="name" type="text" className="w-full" />}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="description">Description</Label>
                                                    <Controller
                                                        name="description"
                                                        control={control}
                                                        render={({ field }) => <Textarea {...field} id="description" className="min-h-32" />}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-2">
                                        <CardHeader>
                                            <CardTitle>Product Details</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="price">Price</Label>
                                                    <Controller
                                                        name="price"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="text" id="price" placeholder="Enter price" />}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="quantity">Quantity Available</Label>
                                                    <Controller
                                                        name="quantity"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="number" id="quantity" placeholder="Enter quantity available" />}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                                                    <Controller
                                                        name="lowStockThreshold"
                                                        control={control}
                                                        render={({ field }) => <Input {...field} type="number" id="low-stock-threshold" placeholder="Enter low stock threshold" />}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-2">
                                        <CardHeader>
                                            <CardTitle>Product Category</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-center items-center">
                                                <div className="grid gap-3">
                                                    <Controller
                                                        name="category"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger id="category" aria-label="Select category">
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="handbags">Handbags</SelectItem>
                                                                    <SelectItem value="jewelry">Jewelery</SelectItem>
                                                                    <SelectItem value="woodworking">WoodWorking</SelectItem>
                                                                    <SelectItem value="paintings">Paintings</SelectItem>
                                                                    <SelectItem value="marble-furnishing">Marble Furnishing</SelectItem>

                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                    <Card x-chunk="dashboard-07-chunk-3">
                                        <CardHeader>
                                            <CardTitle>Product Status</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="status">Status</Label>
                                                    <Controller
                                                        name="status"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger id="status" aria-label="Select status">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="draft">Draft</SelectItem>
                                                                    <SelectItem value="published">Active</SelectItem>
                                                                    <SelectItem value="archived">Archived</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                                        <CardHeader>
                                            <CardTitle>Product Images</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-2">
                                                {selectedImage ? (
                                                    <img
                                                        alt="Selected product image"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="300"
                                                        src={selectedImage}
                                                        width="300"
                                                    />
                                                ) : (
                                                    <div className="aspect-square w-full rounded-md border-2 border-dashed flex items-center justify-center text-gray-400">
                                                        No image selected
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {images.map((image, index) => (
                                                        <button key={index} onClick={() => setSelectedImage(image.preview)}>
                                                            <img
                                                                alt={`Product image ${index + 1}`}
                                                                className="aspect-square w-full rounded-md object-cover"
                                                                height="84"
                                                                src={image.preview}
                                                                width="84"
                                                            />
                                                        </button>
                                                    ))}
                                                    {images.length < 3 && (
                                                        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                                            <Controller
                                                                name="images"
                                                                control={control}
                                                                render={({ field }) => (
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        onChange={(e) => handleImageUpload(e, field.onChange)}
                                                                        multiple
                                                                        accept="image/*"
                                                                    />
                                                                )}
                                                            />
                                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                                            <span className="sr-only">Upload</span>
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-5">
                                        <CardHeader>
                                            <CardTitle>Archive Product</CardTitle>
                                            <CardDescription>
                                                Archive your Product here.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div></div>
                                            <Button type="button" size="sm" variant="secondary">
                                                Archive Product
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button type="button" variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button type="submit" size="sm">Save Product</Button>
                            </div>
                        </div>
                    </main>
                </div>
            </form>
        </div>
    );
}