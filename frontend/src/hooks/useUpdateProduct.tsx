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

    const formData = new FormData();

    if (productData.photo) formData.append("photo", productData.photo);
    if (productData.name) formData.append("name", productData.name);
    formData.append("categoryIds", String(productData.categoryIds));
    formData.append("price", String(productData.price));
    formData.append("qty", String(productData.qty));

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,
        formData
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
