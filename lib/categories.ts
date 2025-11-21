import axios from "axios";
import { Category } from "./types";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Récupérer la liste des catégories
export const getCategory = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data.data;
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des catégories: ", error);
        return [];
    }
}