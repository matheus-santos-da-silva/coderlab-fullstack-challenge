import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/shared/DTOS/product-dto";
import { Button, Image, Text, Box } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";

import "../../styles/product-card.scss";

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const { deleteProduct: deleteProduct } = useDeleteProduct();

  const handleEdit = () => {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  };

  const handleDelete = async () => {
    await deleteProduct(product.id);
    window.location.reload();
  };

  return (
    <Card className="product-card-container">
      <CardHeader className="header">
        <Text
          fontSize="8px"
          color="gray.500"
          mt={1}
          textTransform="uppercase"
          fontWeight="medium"
        >
          {product.categories[0]?.name}
        </Text>
        <CardTitle className="product-card-title">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="product-card-content">
        <Box className="image-wrapper">
          <Image
            src={`${import.meta.env.VITE_BACKEND_URL}/${product.photo}`}
            alt={product.name}
            borderRadius="lg"
            boxShadow="md"
            objectFit="cover"
            width="100%"
            height="250px"
          />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.500" mt={4}>
          R${" "}
          {product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </CardContent>
      <CardFooter className="product-card-footer">
        <Button
          onClick={handleEdit}
          size="sm"
          colorPalette="teal"
          variant="solid"
          mr={2}
        >
          <FiEdit2 />
          Editar
        </Button>

        <Button
          onClick={handleDelete}
          className="product-list-remove-btb"
          size="sm"
        >
          <FiTrash2 /> Remover
        </Button>
      </CardFooter>
    </Card>
  );
};
