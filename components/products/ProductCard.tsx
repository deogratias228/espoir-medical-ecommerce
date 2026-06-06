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

  const whatsappLink = `https://wa.me/22891798292?text=Bonjour!%20Je%20souhaite%20avoir%20plus%20d'informations%20sur%20le%20produit%20*${encodeURIComponent(
    product.name
  )}*.`;
  const detailsLink = `/products/${product.slug}`;

  const formattedPrice =
    product.price != null
      ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        maximumFractionDigits: 0,
      }).format(product.price)
      : "Prix sur demande";

  const handleWhatsappClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Empêche la redirection vers la page produit
    addToCart(product);
  };

  return (
    <article
      className="bg-gray-50 rounded md:rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer"
      onClick={() => (window.location.href = detailsLink)}
    >
      {/* Image du produit */}
      <div className="relative w-full h-32 md:h-52 bg-gray-100">
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Détails du produit */}
      <div className="p-2 md:p-4 flex flex-col justify-between space-y-0 md:space-y-2">
        <div>
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-700 font-bold mt-0 md:mt-1">Prix sur demande</p> 
          {/* <p className="text-gray-700 font-bold mt-0 md:mt-1">{formattedPrice}</p> */}
        </div>

        <div className="gap-2 mt-1 md:mt-2 flex">
          <Link
            href={whatsappLink}
            target="_blank"
            onClick={handleWhatsappClick}
            className="text-center text-white bg-green-700 hover:bg-green-800 hover:font-semibold text-sm py-1 px-1 md:px-6 md:py-2 rounded md:rounded-lg transition"
          >
            Commander
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 text-green-900 font-bold hover:bg-green-200 text-sm py-0 md:py-2 px-auto cursor-pointer rounded-lg transition flex items-center justify-center"
          >
            <ShoppingCartIcon size={22} />
          </button>
        </div>
      </div>
    </article>
  );
}
