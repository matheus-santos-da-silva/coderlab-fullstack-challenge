import { useState } from "react";
import { Button, Input, Link, SimpleGrid, Spinner } from "@chakra-ui/react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useProducts } from "@/hooks/useProducts";

import "../styles/product-list.scss";

export const ProductList = () => {
  const [filter, setFilter] = useState("");
  const { products, error, loading } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="product-list-filter">
        <Input
          placeholder="Filtrar por nome"
          value={filter}
          width={"90%"}
          className="product-list-input"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Link href="/product/0">
          <Button colorPalette="teal">Adicionar Produto</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-600 gap-3">
          <Spinner size="xl" color="teal.500" />
          <p className="text-xl text-gray-600">Carregando produtos...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-xl text-gray-600">
          <p>{error ? error : "Nenhum produto encontrado"}</p>
        </div>
      ) : (
        <SimpleGrid className="gap-8" columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};
