import express from "express";
import type {Request, Response} from "express";
import Produto, { type InterfaceProduto } from "./models/Produto.js";


const app = express();

// MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//REQUISIÇÕES
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("API Loja de Roupas Seminovas");
});

app.get("/produtos", (req:Request, res: Response) => {
    
});

app.post("/produtos", async (req: Request<{},{},InterfaceProduto>, res: Response) => {
    });


//REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/produtos/:id", async (req: Request<{id: string}, {}, InterfaceProduto>, res: Response) => {
});

// REQUISIÇÃO PATCH (ATUALIZAÇÃO PARCIAL)
app.patch("/produtos/:id", async (req: Request<{id: string}, {}, InterfaceProduto>, res: Response) => {

});


//REQUISIÇÃO DELETE (REMOVER DADOS)
app.delete("/produtos/:id",async (req: Request<{ id: string }>, res: Response) => {

});

export default app;