'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight, Shield, HeartPulse, Dumbbell } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getTopProducts } from '@/lib/products';
import { motion, Variants } from 'framer-motion';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const topProducts = await getTopProducts();
        setProducts(topProducts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };


  return (
    <main className="text-gray-700 w-full">
      {/* ===== Hero Section ===== */}
      <section className="bg-green-50">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto px-4 container py-16 grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={fadeUp}>
            <motion.h1
              variants={fadeUp}
              className="text-2xl md:text-4xl font-bold text-green-900 leading-tight mb-4"
            >
              Matériel Médical & Sportif <br /> Fiable et Accessible
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mb-6 max-w-md"
            >
              Chez <strong>Espoir Médical</strong>, nous fournissons du matériel médical et sportif
              de qualité pour les professionnels de santé et les particuliers au Togo.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center space-x-4">
              <Link
                href="/products"
                className="bg-green-700 hover:bg-transparent text-white hover:text-green-700 border-green-700 hover:border px-2 md:px-6 py-2 rounded md:rounded-xl font-semibold transition"
              >
                Voir le catalogue
              </Link>

              <Link
                href="https://wa.me/22891798292"
                target="_blank"
                className="flex items-center text-green-700 hover:bg-green-700 font-medium hover:text-white transition px-2 md:px-6 py-2 rounded md:rounded-xl border border-green-700"
              >
                Contact WhatsApp
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex justify-center"
          >
            <motion.img
              src="/images/home/hero-medical.png"
              alt="Équipements médicaux modernes"
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </section>


      {/* ===== Section : Avantages ===== */}
      <section className="mx-auto px-4 py-14 container">
        <h2 className="text-center text-2xl font-bold text-green-900 mb-10">
          Pourquoi choisir Espoir Médical ?
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[Shield, HeartPulse, Dumbbell].map((Icon, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="text-center bg-white/50 border border-gray-200 p-2 py-6 md:p-6 rounded-lg md:rounded-2xl shadow hover:shadow-2xl transition"
            >
              <Icon className="mx-auto text-green-700 mb-3" size={40} />
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                {index === 0 && "Qualité garantie"}
                {index === 1 && "Santé & Bien-être"}
                {index === 2 && "Sport & Rééducation"}
              </h3>
              <p>
                {index === 0 &&
                  "Des produits certifiés, sélectionnés auprès de fournisseurs fiables."}
                {index === 1 &&
                  "Des équipements pour les cliniques, hôpitaux, cabinets et particuliers."}
                {index === 2 &&
                  "Une gamme complète pour le fitness, la kinésithérapie et la remise en forme."}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* ===== Section : Produits phares ===== */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto px-4 container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-green-900" id='top-products'>Produits populaires</h2>
            <Link href="/products" className="text-sm md:text-base flex items-center text-green-700 font-medium hover:text-green-800">
              Voir tout <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6"
          >
            {products.map((product) => (
              <motion.div key={product.slug} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ===== Section : Engagement ===== */}
      <section className="container mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">Notre engagement</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Nous croyons que la santé ne doit pas être un luxe. Espoir Médical s'engage à offrir
          des produits fiables, à prix juste, avec un service client à l’écoute.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Nous contacter
        </Link>
      </section>
    </main>
  );
}
