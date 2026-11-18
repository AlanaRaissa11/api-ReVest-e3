//Importa o método router do express
import {Router} from "express";

//Importação do controller de produtos
import ProdutoController from "../controllers/produtoControllers.js";

//Inicilizar o gerenciador de rotas do express
const router = Router();

//1º - ROTAS FIXAS E DE BUSCAS
router.get("/produtos", ProdutoController.listar);
router.get("/produtos/busca", ProdutoController.buscarPorFiltro);

//2º - ROTAS DE BUSCAS COM PARÂMETRO DINÂMICO
router.get("/produtos/:id", ProdutoController.buscarPorId);

//3º - ROTAS DE ESCRITA E REMOÇÃO (ESTÁTICAS E DINÂMICAS)

router.post("/produtos", ProdutoController.cadastrar);
router.put("/produtos/:id", ProdutoController.atualizar);
router.patch("/produtos/:id", ProdutoController.atualizarParcial);
router.delete("/produtos/:id", ProdutoController.deletar);

//EXPORTÇÃO DO GERENCIADOR DE ROTAS PARA APP.TS
export default router;