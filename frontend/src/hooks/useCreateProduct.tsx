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

    const formData = new FormData();
    if (productData.photo) {
      formData.append("photo", productData.photo);
      formData.append("name", productData.name);
      formData.append("categoryIds", String(productData.categoryIds));
      formData.append("price", String(productData.price));
      formData.append("qty", String(productData.qty));
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/product`,
        formData
      );

      if (response.status === 201) setSuccess(true);
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
