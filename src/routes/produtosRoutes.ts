//Importa o método router do express
import {Router} from "express";

//Importação do controller de produtos
import ProdutoController from "../controllers/produtoControllers.js";

//Inicilizar o gerenciador de rotas do express
const router = Router();

//Criação de rotas da entidade produtos
router.get("/produtos", ProdutoController.listar);
router.post("/produtos", ProdutoController.cadastrar);
router.put("/produtos/:id", ProdutoController.atualizar);
router.patch("/produtos/:id", ProdutoController.atualizarParcial);
router.delete("/produtos/:id", ProdutoController.deletar);

//Exportação do gerenciador de rotas para app.ts
export default router;