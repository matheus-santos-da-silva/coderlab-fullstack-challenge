import { Product } from "@/shared/DTOS/product-dto";
import { useEffect, useState } from "react";
import axios from "axios";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Erro ao trazer o Produto."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return { product, loading, error };
};
