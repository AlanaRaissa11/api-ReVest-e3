export interface ProdutoDTO {
    id?: string;
    name: string;
    category: string;
    price: number;
    size: number;
    stock: number;
    description: string;
    cover?: string | undefined;
}

export interface FiltroProdutoDTO {
    nome?: string;
    categoria?: string;
    descrição?: string;
}

export interface IProdutoRepository{
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any[] | null>;
    buscarporFiltro(filtros: FiltroProdutoDTO): Promise<any[]>;
    cadastrar(dados: ProdutoDTO): Promise<any[]>;
    atualizar(id: string, dados: ProdutoDTO): Promise<any[]>;
    atualizarParcial(id: string, dados:Partial<ProdutoDTO>): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;
}