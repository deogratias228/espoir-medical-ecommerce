"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Search, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartSidebar from "../cart/CardSidebar";
import SearchBar from "../search/SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-300">
      <div className="bg-green-800 p-2 text-center text-sm font-medium text-white">
        Livraison disponible partout au Togo!
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link
          href="/"
          className="text-xl md:text-2xl font-extrabold tracking-tight text-green-900 hover:text-green-700 transition"
        >
          Espoir<span className="text-green-700">Médical</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
          <Link href="/products">Catalogue</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-600 hover:text-green-800 p-2 rounded-full transition cursor-pointer"
          >
            <Search size={20} />
          </button>

          {/* Panier */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Panier"
            className="relative text-gray-600 hover:text-green-800 p-2 rounded-full transition cursor-pointer"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-green-800 p-2 rounded-full transition cursor-pointer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Barre de recherche (desktop) */}
      {searchOpen && (
        <div className="hidden md:block border-t border-gray-200 bg-transparent py-4">
          <div className="container flex justify-center mx-auto px-4">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <nav className="flex flex-col space-y-3 p-4 text-gray-700 font-medium">
            <Link href="/" onClick={toggleMenu}>Accueil</Link>
            <Link href="/about" onClick={toggleMenu}>À propos</Link>
            <Link href="/products" onClick={toggleMenu}>Catalogue</Link>
            <Link href="/contact" onClick={toggleMenu}>Contact</Link>
            
            {/* Recherche mobile */}
            <div className="pt-3 border-t border-gray-200">
              <SearchBar onClose={toggleMenu} />
            </div>
          </nav>
        </div>
      )}

      {/* Sidebar Panier */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
