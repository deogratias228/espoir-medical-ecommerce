"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductDetails } from "@/lib/types";

export default function ProductDetailClient({
    product,
}: {
    product: ProductDetails;
}) {
    const router = useRouter();
    const { addToCart, increaseQuantity, decreaseQuantity, getItemQuantity } = useCart();
    const quantity = getItemQuantity(product.id);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-300 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold truncate">
                        {product.name}
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                        <Image
                            src={
                                product.images?.[selectedImage] ||
                                "/images/placeholder.jpg"
                            }
                            alt={product.name}
                            fill
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    {product.images?.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedImage === i
                                        ? "border-green-600"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Infos */}
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                    <h2 className="text-3xl font-bold">{product.name}</h2>

                    {/* {product.price ? (
                        <p className="text-3xl font-bold text-green-600">
                            {product.price.toLocaleString()} F CFA
                        </p>
                    ) : (
                        <p className="text-gray-500">Prix sur demande</p>
                        )} */}
                        <p className="text-gray-500">Prix sur demande</p>

                    {product.description && (
                        <p className="text-gray-700 whitespace-pre-line">
                            {product.description}
                        </p>
                    )}

                    <div className="border-t border-gray-300 pt-4">
                        {quantity === 0 ? (
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    slug: product.slug,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images?.[0] || "/images/placeholder.jpg",
                                    description: product.description,
                                    category: product.category || "",
                                })}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                            >
                                <ShoppingCart size={20} />
                                Ajouter au panier
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-4 bg-gray-100 py-3 rounded-lg">

                                <button
                                    onClick={() => decreaseQuantity(product.id)}
                                    className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                                >
                                    -
                                </button>

                                <span className="text-lg font-semibold w-8 text-center">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => increaseQuantity(product.id)}
                                    className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                                >
                                    +
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
