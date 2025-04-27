import { useState } from "react";
import { UpdateProductDTO } from "@/shared/DTOS/update-product-dto";
import axios from "axios";

export const useUpdateProduct = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (
    productId: string,
    productData: UpdateProductDTO
  ) => {
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URLL}/product/${productId}`,
        productData
      );

      if (response.status === 200) setSuccess(true);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erro ao atualizar o Produto."
        );
      }
    }
  };

  return {
    updateProduct,
    success,
    error,
  };
};
