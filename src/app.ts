import express from "express";
import type {Request, Response} from "express"

export interface Produto {
    id: number;
    name: string;
    category: string;
    price: number;
    size: string;
    

}

const app = express();
app.use(express.json());

const produtos: Produto[] = [
    {
        id: 1,
        name: "Camiseta Básica Algodão",
        category: "Camisetas",
        price: 19.99,
        size: "M"
    },
    {
        id:2,
        name: "Calça Jeans Slim",
        category: "Calças",
        price: 29.99,
        size: "46"
    }
];

//FUNÇÃO PARA BUSCAR PRODUTOS PELO ID
function buscaProdutos(id: string | number): number{
    return produtos.findIndex(Produtos => {
        return Produtos.id === Number(id);
    });
}

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("API Loja de Roupas Seminovas");
});

app.get("/produtos", (req:Request, res: Response) => {
    res.status(200).json(produtos);
});

//REQUISIÇÃO POST (CADASTRAR NOVO PRODUTO)
app.get("/produtos", (req:Request, res: Response) => {
    const{id, name, category, size, price} = req.body;
});

app.post("/produtos", (req: Request, res: Response) => {
    const {id, name, category, size, price} = req.body;

    const novoProduto: Produto = {
            id: Number(id),
            name,
            category,
            price: Number(price),
            size,
        }
    })


//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/produtos/:id", (req: Request, res: Response) => {
    const index = buscaProdutos(String(req.params.id));

    if (index === -1) {
        res.status(404).json({ mensagem: "Produto não encontrado!" });
        return;
    }

    const { id, name, category, size, price } = req.body;

    produtos[index] = {
        ...produtos[index]!,
        name,
        category,
        price: Number(price),
        size
    };

    res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
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