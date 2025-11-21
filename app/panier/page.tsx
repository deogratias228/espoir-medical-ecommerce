"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";

interface CartItem {
    id: number;
    name: string;
    price: number | null;
    quantity: number;
}

function CartViewContent() {
    const searchParams = useSearchParams();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const data = searchParams.get("data");
        if (data) {
            try {
                const decoded = JSON.parse(decodeURIComponent(data));
                setCart(decoded);
            } catch (err) {
                console.error("Erreur de décodage:", err);
                setError(true);
            }
        } else {
            setError(true);
        }
    }, [searchParams]);

    const total = cart.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">
                        Panier non trouvé
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Le lien du panier est invalide ou a expiré.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Home size={18} />
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <ShoppingCart size={28} />
                            Panier partagé
                        </h1>
                        <p className="text-blue-100 text-sm mt-1">
                            {cart.length} {cart.length > 1 ? "articles" : "article"}
                        </p>
                    </div>

                    {/* Liste des produits */}
                    <div className="p-6 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                            >
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg">
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ShoppingCart size={32} />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <p className="text-gray-600">
                                            {item.price
                                                ? `${item.price.toLocaleString()} F CFA`
                                                : "Prix non défini"}
                                        </p>
                                        <span className="text-gray-400">•</span>
                                        <p className="text-gray-600">Quantité : {item.quantity}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-gray-800">
                                        {item.price
                                            ? `${(item.price * item.quantity).toLocaleString()} F`
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-gray-50 px-6 py-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-700">
                                Total estimé :
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                                {total.toLocaleString()} F CFA
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Retour à la boutique
                        </Link>
                        <Link
                            href={`https://wa.me/22891798292?text=${encodeURIComponent(
                                `Bonjour, je souhaite commander les produits suivants :\n\n${cart
                                    .map((item) => `- ${item.name} x${item.quantity}`)
                                    .join("\n")}\n\nMontant total estimé : ${total.toLocaleString()} F CFA`
                            )}`}
                            target="_blank"
                            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition"
                        >
                            Commander via WhatsApp
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CartViewPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement du panier...</p>
                    </div>
                </div>
            }
        >
            <CartViewContent />
        </Suspense>
    );
}