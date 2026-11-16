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


export default app;