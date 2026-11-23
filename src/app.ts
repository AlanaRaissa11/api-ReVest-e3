import express from "express";
import type {Request, Response} from "express";
import Produto, { type InterfaceProduto } from "./models/Produto.js";
import produtosRoutes from "./routes/produtosRoutes.js"
import { swaggerDocument } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";


const app = express();

// MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//ROTA DA DOCUMENTAÇÃO INTERFACE
app.use("docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ROTA BASE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("ReVeste - Roupas Seminovas");
});

//REGISTRAR AS ROTAS DE "PRODUTOS" NA APLICAÇÃO
app.use(produtosRoutes);

export default app;