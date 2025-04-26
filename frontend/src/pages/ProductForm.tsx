import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/shared/product-form-schema";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "../styles/product-form.scss";
import { Product } from "@/shared/DTOS/product-dto";

export const ProductForm = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const product = location.state?.product as Product | undefined;
  console.log(product);

  const productId = id || "0";
  const { createProduct: create } = useCreateProduct();
  const { updateProduct: update } = useUpdateProduct();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      qtd: product?.qty || undefined,
      price: product?.price || undefined,
      category: product?.categories?.[0]?.name || "",
      photo: undefined,
    },
  });

  const handleSubmit = async ({
    name,
    category,
    photo,
    price,
    qtd,
  }: z.infer<typeof formSchema>) => {
    if (productId === "0") {
      await create({
        name,
        category,
        photo: photo!.name,
        price,
        qty: qtd,
      });

      toaster.create({
        title: "Produto criado com sucesso!",
        type: "success",
      });

      navigate("/product");
    } else {
      await update(productId, {
        name,
        category,
        photo: photo!.name,
        price,
        qty: qtd,
      });

      toaster.create({
        title: "Produto atualizado com sucesso!",
        type: "success",
      });

      navigate("/product");
    }
  };

  const { categories, error, loading } = useCategories();

  return (
    <div className="product-form-container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="product-form"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="form-group">
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Panela" {...field} />
                </FormControl>
                <FormMessage className="error-message" />{" "}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="form-group">
                <FormLabel>Preço:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 250"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="error-message" />{" "}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qtd"
            render={({ field }) => (
              <FormItem className="form-group">
                <FormLabel>Quantidade:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 100"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="error-message" />{" "}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="form-group">
                <FormLabel>Categoria:</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="select-trigger">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  {error && (
                    <p className="error-message mt-1">
                      Erro ao carregar categorias: {error}
                    </p>
                  )}
                  <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {loading ? (
                      <div className="py-2 text-center text-gray-500">
                        Carregando categorias...
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem
                          key={category.name}
                          value={category.name}
                          className="hover:bg-teal-50 focus:bg-teal-50 cursor-pointer text-gray-800 w-full"
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        key={"Outras"}
                        value={"Outras"}
                        className="hover:bg-teal-50 focus:bg-teal-50 cursor-pointer text-gray-800 w-full"
                      >
                        Outras
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="error-message" />{" "}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem do Produto:</FormLabel>
                <FormControl>
                  <div className="relative h-20 bg-gray-50">
                    <Input
                      type="file"
                      id="file-upload"
                      accept="image/jpeg, image/png, image/webp"
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-teal-500 text-center">
                        {field.value?.name ||
                          "Clique para selecionar um arquivo"}
                      </span>
                      {!field.value && (
                        <span className="text-gray-400">
                          Formatos aceitos: JPG, PNG, WEBP
                        </span>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="error-message" />{" "}
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
};
