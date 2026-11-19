import { z } from "zod";

// CRIAR AS REGRAS PARA CADASTRO (POST) E ATUALIZAÇÃO (PUT)
export const criarProdutoValidator = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    category: z.string().min(3, "A categoria deve ter pelo menos 3 caracteres."),
    price: z.number().positive("O preço deve ser um valor positivo."),
    size: z.number().positive("O tamanho deve ser um valor positivo."),
    stock: z.number().int("O estoque deve ser um número inteiro.").min(0, "O estoque não pode ser negativo."),
    description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres."),
    cover: z
        .string()
        .url("A capa deve ser uma URL válida.")
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined : val)),
});

export const atualizarProdutoValidator = criarProdutoValidator.partial();