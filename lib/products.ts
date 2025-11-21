import axios from "axios";
import { Product, ProductDetails } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
console.log('Base url: ', API_BASE_URL)


// Récupérer la liste des produits
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data.data;
    } catch (error) {
        console.log('Erreur lors du chargement des produits : ', error);
        return [];
    }
}

// Récupérer les produits phares
export const getTopProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top-products`);
        return response.data.data;
    } catch (error) {
        console.log('Erreur lors de la récupération des produits phars: ', error);
        return [];
    }
}

// Récupérer les détails sur un produit spécifique
export const getProduct = async (slug: string): Promise<ProductDetails | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${slug}`);
        return response.data.data;
    } catch (error) {
        console.log('Erreur lors de la récupération du produit : ', error);
        return null;
    }
}

// Rechercher des produits
export const searchProducts = async(query: string) : Promise<Product[]> => {
    try {
        if(!query.trim()) return [];
        const response = await axios.get(`${API_BASE_URL}/products-search`, {
            params: {q: query}
        });

        console.log(query);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log('Erreur lors de la recherche des produits : ', error);
        return [];
    }
}