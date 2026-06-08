import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
    params: Promise<{ slug: string }>;
};

// 🔥 SEO dynamique
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Produit non trouvé",
            description: "Ce produit n'existe pas ou n'est plus disponible.",
        };
    }

    const description =
        product.description?.substring(0, 155) ||
        `Achetez ${product.name} à Lomé, Togo. Prix: ${product.price?.toLocaleString()} FCFA.`;

    const url = `https://espoir-medical.com/products/${product.slug}`;

    return {
        title: `${product.name} - Achat en ligne à Lomé | Espoir Médical`,
        description: `${description} \nDisponible chez Espoir Médical, votre fournisseur de matériel médical et sportif fiable au Togo.\n${product.description ? "Détails : " + product.description : ""}`,
        openGraph: {
            title: product.name,
            description,
            url,
            siteName: "Espoir Médical",
            locale: "fr_TG",
            type: "website",
            images: [
                {
                    url: product.images?.[0] || "/images/placeholder.jpg",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description,
            images: [product.images?.[0] || "/images/placeholder.jpg"],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // 📊 JSON-LD structuré (serveur = parfait pour SEO)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description:
            product.description || `${product.name} disponible à Lomé, Togo`,
        image: product.images || [],
        sku: product.id,
        brand: {
            "@type": "Brand",
            name: "Espoir Médical",
        },
        offers: {
            "@type": "Offer",
            url: `https://espoir-medical.com/products/${product.slug}`,
            priceCurrency: "XOF",
            price: product.price,
            availability: product.price
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            seller: {
                "@type": "Organization",
                name: "Espoir Médical",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            {/* UI interactive */}
            <ProductDetailClient product={product} />
        </>
    );
}
