//Importa o método router do express
import {Router} from "express";

//Importação do controller de produtos
import ProdutoController from "../controllers/produtoControllers.js";

//IMPORTA O MIDDLEWARE (VALIDAÇÃO DE DADOS)
import { validarDados } from "../middlewares/dataValidator.js";

// IMPORTA OS SCHEMAS DO ZOD (VALIDADOR)
import { criarProdutoValidator, atualizarProdutoValidator } from "../validators/produtoValidator.js";

//Inicilizar o gerenciador de rotas do express
const router = Router();

//1º - ROTAS FIXAS E DE BUSCAS
router.get("/produtos", ProdutoController.listar);
router.get("/produtos/busca", ProdutoController.buscarPorFiltro);

//2º - ROTAS DE BUSCAS COM PARÂMETRO DINÂMICO
router.get("/produtos/:id", ProdutoController.buscarPorId);

//3º - ROTAS DE ESCRITA E REMOÇÃO (ESTÁTICAS E DINÂMICAS)

router.post("/produtos", validarDados(criarProdutoValidator), ProdutoController.cadastrar);
router.put("/produtos/:id", validarDados(criarProdutoValidator), ProdutoController.atualizar);
router.patch("/produtos/:id", validarDados(criarProdutoValidator), ProdutoController.atualizarParcial);
router.delete("/produtos/:id", ProdutoController.deletar);

//EXPORTÇÃO DO GERENCIADOR DE ROTAS PARA APP.TS
export default router;