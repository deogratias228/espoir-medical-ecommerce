"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { MouseEvent } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const whatsappLink = `https://wa.me/22891798292?text=Bonjour!%20Je%20souhaite%20avoir%20plus%20d'informations%20sur%20le%20produit%20"${encodeURIComponent(
    product.name
  )}".`;
  const detailsLink = `/products/${product.slug}`;

  const formattedPrice =
    product.price != null
      ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        maximumFractionDigits: 0,
      }).format(product.price)
      : "Prix non défini";

  const handleWhatsappClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Empêche la redirection vers la page produit
    addToCart(product);
  };

  return (
    <article
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer"
      onClick={() => (window.location.href = detailsLink)}
    >
      {/* Image du produit */}
      <div className="relative w-full h-36 md:h-52 bg-gray-100">
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Détails du produit */}
      <div className="p-4 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-700 font-bold mt-1">{formattedPrice}</p>
        </div>

        <div className="flex gap-2 mt-2">
          <Link
            href={whatsappLink}
            target="_blank"
            onClick={handleWhatsappClick}
            className="flex-2 text-center border border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm py-2 rounded-lg transition"
          >
            WhatsApp
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 text-green-900 font-bold hover:bg-green-200 text-sm py-2 px-auto cursor-pointer rounded-lg transition flex items-center justify-center space-x-2"
          >
            <ShoppingCartIcon size={22} />
          </button>
        </div>
      </div>
    </article>
  );
}
