import { useState } from "react";
import axios from "axios";

export const useDeleteProduct = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SOME_KEY.BACKEND_URL}/product/${id}`
      );

      if (response.status === 201) {
        setSuccess(true);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Erro ao remover o Produto.");
      }
    }
  };

  return {
    deleteProduct,
    success,
    error,
  };
};
