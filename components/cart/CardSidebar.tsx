"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Share2, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite commander les produits suivants :\n\n${cart
      .map((item) => `\n* *${item.name}* x${item.quantity}\n`)
      .join("\n")}\n\nMontant total estimé : ${total.toLocaleString()} F CFA`
  );

  const whatsappLink = `https://wa.me/22891798292?text=${whatsappMessage}`;

  // Créer un lien partageable avec les produits du panier
  const createShareableLink = () => {
    const cartData = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    const encoded = encodeURIComponent(JSON.stringify(cartData));
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/panier?data=${encoded}`;
  };

  const handleCopyLink = async () => {
    const link = createShareableLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Mon panier</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-10">
              Votre panier est vide.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 border-b pb-2">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    {item.price
                      ? `${item.price.toLocaleString()} F`
                      : "Prix non défini"}
                  </p>
                  <p className="text-xs text-gray-600">Qté : {item.quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-600 cursor-pointer"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pied */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-semibold text-sm">
              <span>Total :</span>
              <span>{total.toLocaleString()} F CFA</span>
            </div>

            {/* <button
              onClick={handleCopyLink}
              className="w-full text-sm text-blue-600 border border-blue-300 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Lien copié !</span>
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  <span>Partager le panier</span>
                </>
              )}
            </button> */}

            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-600 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Vider le panier
            </button>

            <Link
              href={whatsappLink}
              target="_blank"
              className="block w-full bg-green-700 text-white text-center py-2 rounded-lg text-sm hover:bg-green-800 transition cursor-pointer"
              onClick={onClose}
            >
              Commander via WhatsApp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}