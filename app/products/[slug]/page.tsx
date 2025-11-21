"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ShoppingCart, Share2, Check } from "lucide-react";
import { ProductDetails } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copied, setCopied] = useState(false);

  // Chargement du produit à partir du slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getProduct(params.slug as string);
        console.log(data);

        if (data) setProduct(data);
        else setError(true);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) fetchProduct();
  }, [params.slug]);

  // 📊 Injection des données structurées JSON-LD pour Google
  useEffect(() => {
    if (product) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description || `${product.name} disponible à Lomé, Togo`,
        image: product.images || [],
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "Votre Marque", // À personnaliser
        },
        offers: {
          "@type": "Offer",
          url: typeof window !== "undefined" ? window.location.href : "",
          priceCurrency: "XOF",
          price: product.price,
          availability: product.price ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split("T")[0],
          seller: {
            "@type": "Organization",
            name: "Votre Boutique", // À personnaliser
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lomé",
              addressCountry: "TG",
            },
          },
        },
        category: product.category || "Produits",
      };

      // Ajouter ou mettre à jour le script JSON-LD
      let script = document.getElementById("product-schema");
      if (!script) {
        script = document.createElement("script");
        script.id = "product-schema";
        // script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);

      // Mettre à jour les meta tags dynamiquement
      updateMetaTags(product);

      return () => {
        // Nettoyer le script lors du démontage
        const oldScript = document.getElementById("product-schema");
        if (oldScript) oldScript.remove();
      };
    }
  }, [product]);

  // 🏷️ Mise à jour des meta tags pour SEO
  const updateMetaTags = (product: ProductDetails) => {
    // Titre
    document.title = `${product.name} - Achat en ligne à Lomé | Votre Boutique`;

    // Description
    const description =
      product.description?.substring(0, 155) ||
      `Achetez ${product.name} à Lomé, Togo. Prix: ${product.price?.toLocaleString()} FCFA. Livraison disponible.`;
    updateOrCreateMeta("description", description);

    // Open Graph tags
    updateOrCreateMeta("og:title", `${product.name} - Votre Boutique Lomé`);
    updateOrCreateMeta("og:description", description);
    updateOrCreateMeta("og:image", product.images?.[0] || "/images/placeholder.jpg");
    updateOrCreateMeta("og:type", "product");
    updateOrCreateMeta("og:url", window.location.href);
    updateOrCreateMeta("og:locale", "fr_TG");
    updateOrCreateMeta("og:site_name", "Votre Boutique");

    // Twitter Card
    updateOrCreateMeta("twitter:card", "summary_large_image", "name");
    updateOrCreateMeta("twitter:title", product.name, "name");
    updateOrCreateMeta("twitter:description", description, "name");
    updateOrCreateMeta("twitter:image", product.images?.[0] || "/images/placeholder.jpg", "name");

    // Product specific tags
    updateOrCreateMeta("product:price:amount", product.price?.toString() || "0");
    updateOrCreateMeta("product:price:currency", "XOF");
  };

  const updateOrCreateMeta = (name: string, content: string, attr: string = "property") => {
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  // ➕ Ajout au panier
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/images/placeholder.jpg",
        description: product.description,
        category: product.category || "",
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // 📤 Copier lien du produit
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur de copie:", err);
    }
  };

  // ⏳ État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  // ❌ Erreur ou produit introuvable
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Produit non trouvé</h1>
          <p className="text-gray-600 mb-6">
            Le produit que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  // ✅ Contenu principal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header produit */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Retour à la page précédente"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold truncate flex-1">{product.name}</h1>
          {/* <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Partager ce produit"
          >
            {copied ? <Check size={20} className="text-green-600" /> : <Share2 size={20} />}
          </button> */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <article className="grid lg:grid-cols-2 gap-8">
          {/* Galerie d'images */}
          <section className="space-y-4" aria-label="Galerie d'images du produit">
            <div className="relative aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
              {product.images?.length ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={`${product.name} - Image ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Aucune image disponible</span>
                </div>
              )}
            </div>

            {/* Miniatures */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2" role="list" aria-label="Miniatures">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition ${
                      selectedImage === i
                        ? "border-green-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-label={`Afficher l'image ${i + 1}`}
                    aria-pressed={selectedImage === i}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Miniature ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Infos produit */}
          <section className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content={product.name} />
                <h2 className="text-3xl font-bold text-gray-900 mb-2" itemProp="name">
                  {product.name}
                </h2>
                {product.price ? (
                  <div className="flex items-baseline gap-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="XOF" />
                    <meta itemProp="price" content={product.price.toString()} />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <span className="text-3xl font-bold text-green-600" itemProp="price">
                      {product.price.toLocaleString()} F
                    </span>
                    <span className="text-gray-500">CFA</span>
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg">Prix sur demande</p>
                )}
              </div>

              {product.description && (
                <div className="border-t border-gray-300 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Description du produit</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line" itemProp="description">
                    {product.description}
                  </p>
                </div>
              )}

              {product.category && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Catégorie:</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                </div>
              )}

              {/* Bouton panier */}
              <div className="border-t border-gray-300 pt-4 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.price}
                  className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    product.price
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  aria-label={addedToCart ? "Produit ajouté au panier" : "Ajouter ce produit au panier"}
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact WhatsApp */}
            <aside className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                Des questions sur ce produit ? Contactez-nous à Lomé
              </p>
              <a
                href={`https://wa.me/22891798292?text=${encodeURIComponent(
                  `Bonjour, j'ai une question concernant le produit : ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-medium hover:bg-green-700 transition"
                aria-label="Contacter le service client via WhatsApp"
              >
                Contacter via WhatsApp
              </a>
            </aside>

            {/* Badge local */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700">
              <p>📍 <strong>Livraison disponible à Lomé, Togo</strong></p>
              <p className="text-xs text-gray-600 mt-1">Paiement à la livraison ou par mobile money</p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}