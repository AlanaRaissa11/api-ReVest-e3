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

app.get("/", (req, res) => {
    res.status(200).send("API Loja de Roupas Seminovas");
});

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

export default app;