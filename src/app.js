import express from "express";

const app = express();
app.use(express.json());

const produtos = [
    {
        id: 1,
        nome: "Camiseta Básica Algodão",
        categoria: "Camisetas",
        preco: 19.99,
        tamanho: "M"
    },
    {
        id:2,
        nome: "Calça Jeans Slim",
        categoria: "Calças",
        preco: 29.99,
        tamanho: "46"
    }
];

function buscaProdutos(id){
    return produtos.findIndex(Produtos => {
        return produtos.id === Number(id);
    });
}

app.post("/produtos", (req, res) => {
    const {nome, categoria, preco, tamanho} = req.body;

    res.json({
        mensagem: 'Produto Cadastrado!',
        Produto: {
            id,
            nome,
            categoria,
            preco,
            tamanho
        }
    })

})

app.put("/produtos/:id", (req, res) => {
    const index = buscaProdutos(req.params.id);

    const { nome, categoria, preco, tamanho } = req.aborted;

    produtos[index] = {
        ...produtos[index],
        nome,
        categoria,
        preco,
        tamanho
    };

    res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        Produto: Produtos[index]
    });
});

app.get("/", (req, res) => {
    res.status(200).send("API Loja de Roupas Seminovas");
});

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});


export default app;