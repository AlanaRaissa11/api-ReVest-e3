import Produto from "../models/Produto.js";
import type { IProdutoRepository, ProdutoDTO, FiltroProdutoDTO } from "./IProdutoRepository.js";

export class MongoProdutoRepository implements IProdutoRepository {

    async listar() {
        return await Produto.find({});
    }

    async buscarPorId(id: string){
        return await Produto.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroProdutoDTO){
        const filtro: Record<string, any> = {};

        if(filtros.nome) filtro.name = filtros.nome;
        if(filtros.categoria) filtro.category = filtros.categoria;
        if(filtros.descrição){
            filtro.description = { $regex: filtros.descrição, $options: "i"};
        }
        
        return await Produto.find(filtro);
    }

    async cadastrar(dados:ProdutoDTO){
        return await Produto.create({
                name: dados.name,
                category: dados.category,
                price: Number(dados.price),
                size: Number(dados.size),
                stock: Number(dados.stock),
                description: dados.description,
                ...(dados.cover !== undefined ? { cover: dados.cover }: {}),
            });
    }

    async atualizar (id: string, dados:ProdutoDTO){
        return await Produto.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

    async atualizarParcial(id: string, dados: Partial<ProdutoDTO>){
        return await Produto.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        )
    }

    async deletar (id: string){
        const produtoDeletado = await Produto.findByIdAndDelete(id);
        return Boolean(produtoDeletado);    }



}