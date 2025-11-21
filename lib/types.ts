export interface Category {
    id: number;
    slug: string;
    name: string;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    price?: number | null;
    image: string;
    description?: string | null;
    category: string;
}

export interface ProductDetails {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
    price?: number | null;
    images: string[];
    updated_at: string;
    category: string;
}
