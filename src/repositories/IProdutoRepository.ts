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
    listar(): Promise<ProdutoDTO[]>;
    buscarPorId(id: string): Promise<ProdutoDTO | null>;
    buscarPorFiltro(filtros: FiltroProdutoDTO): Promise<ProdutoDTO[]>;
    cadastrar(dados: ProdutoDTO): Promise<ProdutoDTO>;
    atualizar(id: string, dados: ProdutoDTO): Promise<ProdutoDTO | null>;
    atualizarParcial(id: string, dados:Partial<ProdutoDTO>): Promise<ProdutoDTO | null>;
    deletar(id: string): Promise<boolean>;
}