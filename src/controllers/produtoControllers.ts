import type { Request, Response } from "express";
import Produto from "../models/Produto.js";
import type { InterfaceProduto } from "../models/Produto.js";

class ProdutoController {
  //GET - Listar todos os produtos
static async listar(req: Request, res: Response) {
        try {
        const listaProdutos = await Produto.find({});
        res.status(200).json(listaProdutos);
    }catch (error) {
        res.status(500).json({ message: "Erro ao buscar Produtos." });
        }
    }

//GET - BUSCAR UM PRODUTO ESPECÍFICO PELO ID - REQ PARAMS
    static async buscarPorId (req: Request<{ id: string }>, res: Response){
        try{
            const { id } = req.params;
            const produtoEncontrado = await Produto.findById(id);

            if(!produtoEncontrado) {
                res.status(404).json({mensagem: "Produto não encontrado."});
            }

            res.status(200).json(produtoEncontrado);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar produtos por ID."})
        }
    }

    //GET - FILTRAR PRODUTOS POR CRITÉRIOS OPCIONAIS - REQ QUERY
    static async buscarPorFiltro (req: Request, res: Response){
        try{
            //Extrair os possiveis filtros enviados apos o "?" na URL
            const { nome, categoria, descrição} = req.query;

            //Criar um objeto vazio para receber apenas os filtros preenchidos
            const filtro: Record<string, any> = {};

            if(nome) {
                filtro.name = String(nome); //Buscar exata
            }

            if(categoria) {
                filtro.category = String(categoria);
            }
            
            if(descrição) {
                //$regex: busca parcial 
                filtro.description = { $regex: String(descrição), $options: "1"}
            }

            const produtosFiltrados = await Produto.find(filtro);
            
            res.status(500).json({mensagem: "Erro ao filtrar produtos."})

        }catch(error) {
            res.status(500).json({mensagem: "Erro ao cadastrar produtos."})

        }
    }

    //POST - Cadastrar novo produto
static async cadastrar(req: Request<{},{},InterfaceProduto>, res: Response) {
        try {
        const { name, category, size, price, stock, description, cover } = req.body;

        const novoProduto = await Produto.create({
            name,
            category,
            price: Number(price),
            size: Number(size),
            stock: Number(stock),
            description,
            cover
        });

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            Produto: novoProduto,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar produto." });
    }
    }

    //PUT - Atualizar dados do produto
static async atualizar(req: Request<{ id: string }, {}, InterfaceProduto>, res: Response) {
        try {
        const { id } = req.params;
        const { name, category, size, price, stock, description, cover } = req.body;

        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            {
                name,
                category,
                price: Number(price),
                size: Number(size),
                stock: Number(stock),
                description,
                cover
            },
            { returnDocument: "after" }
        );

        if (!produtoAtualizado) {
            res.status(404).json({ message: "Produto não encontrado!" });
            return;
        }

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            Produto: produtoAtualizado,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar produto." });
    }
    }

    //PATCH - Atualizar parcialmente os dados do produto
static async atualizarParcial(req: Request<{ id: string }, {}, Partial<InterfaceProduto>>, res: Response) {
        try {
        const { id } = req.params;

        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            { $set : req.body },
            { returnDocument: "after" }
        );

        if (!produtoAtualizado) {
            res.status(404).json({ message: "Produto não encontrado!" });
            return;
        }

        res.status(200).json({
            mensagem: "Produto atualizado parcialmente com sucesso!",
            Produto: produtoAtualizado,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar parcialmente o produto." });
    }
    }

    //DELETE - Deletar produto
static async deletar(req: Request<{ id: string }>, res: Response) {
        try {
        const { id } = req.params;

        const produtoDeletado = await Produto.findByIdAndDelete(id);

        if (!produtoDeletado) {
            res.status(404).json({ message: "Produto não encontrado!" });
            return;
        }

        res.status(200).json({
            mensagem: "Produto removido com sucesso!",
            Produto: produtoDeletado,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar produto." });
    }
    }
};

export default ProdutoController;

