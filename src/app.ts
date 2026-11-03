import express, from "express";
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

function buscaProdutos(id: string | number): number{
    return produtos.findIndex(Produtos => {
        return produtos.id === Number(id);
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

app.post("/produtos", (req, res) => {
    const {id, name, category, size, price} = req.body;

    const novoProduto: Produto = {
            id: Number(id),
            name,
            category,
            price: Number(price),
            size: Number(size)
        }
    })




app.put("/produtos/:id", (req, res) => {
    const index = buscaProdutos(req.params.id);

    const { id, name, category, size, price } = req.aborted;

    produtos[index] = {
        ...produtos[index],
        name,
        category,
        price,
        size
    };

    res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        Produto: produtos[index]
    });
});



export default app;