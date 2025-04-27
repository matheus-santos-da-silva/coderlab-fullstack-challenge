import { Category } from "@/shared/DTOS/category-dto";
import { useEffect, useState } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/category`
        );
        setCategories(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Erro ao trazer as Categorias."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return { categories, loading, error };
};
