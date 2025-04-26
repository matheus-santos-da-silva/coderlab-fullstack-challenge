import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto é obrigatório!",
  }),

  price: z
    .number({
      invalid_type_error: "Digite um valor válido",
      required_error: "O preço é obrigatório!",
    })
    .positive("O preço deve ser maior que zero")
    .refine((val) => val !== 0, "O preço não pode ser zero"),

  qtd: z
    .number({
      invalid_type_error: "Digite um valor válido",
      required_error: "A quantidade é obrigatória!",
    })
    .positive("A quantidade deve ser maior que zero")
    .refine((val) => val !== 0, "A quantidade não pode ser zero"),

  photo: z
    .instanceof(File)
    .refine((file) => file.size < 5_000_000, {
      message: "A imagem deve ter menos de 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Apenas imagens .jpg, .png ou .webp são aceitas",
      }
    )
    .optional(),

  category: z.string().min(1, {
    message: "A categoria é obrigatória!",
  }),
});
