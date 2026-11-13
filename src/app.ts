import express from "express";
import type {Request, Response} from "express";
import Produto, { type InterfaceProduto } from "./models/Produto.js";


// export interface Produto {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     size: string;
// }

const app = express();

// MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

// const produtos: Produto[] = [
//     {
//         id: 1,
//         name: "Camiseta Básica Algodão",
//         category: "Camisetas",
//         price: 19.99,
//         size: "M"
//     },
//     {
//         id:2,
//         name: "Calça Jeans Slim",
//         category: "Calças",
//         price: 29.99,
//         size: "46"
//     }
// ];

//FUNÇÃO PARA BUSCAR PRODUTOS PELO ID
// function buscaProdutos(id: string | number): number{
//     return produtos.findIndex(Produtos => {
//         return Produtos.id === Number(id);
//     });
// }

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("API Loja de Roupas Seminovas");
});

app.get("/produtos", (req:Request, res: Response) => {
    try{
        const listaProdutos = Produto.find({});
        res.status(200).json(listaProdutos);
    }catch (error){
        res.status(500).json({mensagem: "Erro ao buscar Produto."})
    }
    
});

//REQUISIÇÃO POST (CADASTRAR NOVO PRODUTO)
// app.get("/produtos", (req:Request, res: Response) => {
//     const{id, name, category, size, price, stock, description} = req.body;
// });

app.post("/produtos", async (req: Request<{},{},InterfaceProduto>, res: Response) => {

    try{
    const{ name, category, size, price, stock, description} = req.body;

    const novoProduto = await Produto.create({
            name,
            category,
            price: Number(price),
            size: Number (size),
            stock: Number (stock),
            description,
        });

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            Produto: novoProduto
        });
    }catch (error){
        res.status(500).json({mensagem: "Erro ao cadastrar produto."})
    }
    });


//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/produtos/:id", async (req: Request<{id: string}, {}, InterfaceProduto>, res: Response) => {

    try{
        const { id } = req.params;

        const { name, category, size, price, stock, description } = req.body;

        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            {
                name,
                category,
                price: Number(price),
                size: Number (size),
                stock: Number (stock),
                description,
            },
            {new: true}
        
        );

        if(!produtoAtualizado){
            res.status(404).json({mensagem: "Produto não encontrada!"});
            return;
        }

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            Produto: produtoAtualizado
        });
    } catch(error){
        res.status(500).json({mensagem: "Erro ao atualizar com sucesso!"})
    
    };
});

// REQUISIÇÃO PATCH (ATUALIZAÇÃO PARCIAL)
app.patch("/produtos/:id", (req: Request, res: Response) => {
    const index = buscaProdutos(String(req.params.id));

    if (index === -1) {
        res.status(404).json({ mensagem: "Produto não encontrado!" });
        return;
    }

    const { name, category, size, price } = req.body;

    // ATUALIZA APENAS OS CAMPOS ENVIADOS NO BODY, MANTENDO OS VALORES ANTIGOS NOS DEMAIS
    produto[index] = {
        ...produto[index]!,
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(size !== undefined && { size }),
        ...(price !== undefined && { price: Number(price) })
    };

    res.status(200).json({
        mensagem: "Produto atualizado parcialmente com sucesso!",
        Produto: produtos[index]
    });
});

//REQUISIÇÃO DELETE (REMOVER DADOS)
app.delete("/produtos/:id", (req: Request, res: Response) => {
    const index = buscaProdutos(String(req.params.id));

    if (index === -1) {
        res.status(404).json({ mensagem: "Produto não encontrado!" });
        return;
    }

    //Remover o Produto do array base (Produtos) com base no índice (id)
    produtos.splice(index, 1);

    res.status(200).json({ mensagem: "Produto removido com sucesso!" });
});

export default app;