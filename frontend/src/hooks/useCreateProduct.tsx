import { useState } from "react";
import { CreateProductDTO } from "@/shared/DTOS/create-product-dto";
import axios from "axios";

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: CreateProductDTO) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY.BACKEND_URL}/product`,
        productData
      );

      if (response.status === 201) {
        setSuccess(true);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Erro ao criar o Produto.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    isLoading,
    success,
    error,
  };
};
