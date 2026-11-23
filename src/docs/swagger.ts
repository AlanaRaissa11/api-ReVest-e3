export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
    title: "API de Produtos",
    version: "1.0.0",
    description: "Documentação OpenAPI 3.0.0 da API REST para gerenciamento de produtos.",
},
servers: [
    {
    url: "http://localhost:3000",
    description: "Servidor local de desenvolvimento",
    },
],
tags: [
    {
    name: "Produtos",
    description: "Operações de consulta, cadastro, atualização e remoção de produtos",
    },
],
paths: {
    "/produtos": {
    get: {
        tags: ["Produtos"],
        summary: "Listar todos os produtos",
        description: "Retorna uma lista com todos os produtos cadastrados no banco de dados.",
        operationId: "listarProdutos",
        responses: {
        "200": {
            description: "Lista de produtos retornada com sucesso.",
            content: {
            "application/json": {
                schema: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/Produto",
                },
                },
                },
            },
        },
        "500": {
            description: "Erro interno ao buscar produtos.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                message: "Erro ao buscar Produtos.",
                },
                },
            },
            },
        },
    },
    post: {
        tags: ["Produtos"],
        summary: "Cadastrar um novo produto",
        description: "Valida os dados de entrada com Zod e cria um novo produto.",
        operationId: "cadastrarProduto",
        requestBody: {
        required: true,
        description: "Dados do produto a ser cadastrado.",
        content: {
            "application/json": {
            schema: {
                $ref: "#/components/schemas/ProdutoInput",
            },
            example: {
                name: "Tênis Running Pro",
                category: "Calçados",
                price: 299.9,
                size: 42,
                stock: 15,
                description: "Tênis leve e confortável para corridas de longa distância.",
                cover: "https://exemplo.com/imagens/tenis-running-pro.jpg",
            },
            },
        },
        },
        responses: {
        "201": {
            description: "Produto cadastrado com sucesso.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ProdutoMutationResponse",
                },
                example: {
                mensagem: "Produto cadastrado com sucesso!",
                Produto: {
                    _id: "665f1a2b3c4d5e6f7a8b9c0d",
                    name: "Tênis Running Pro",
                    category: "Calçados",
                    price: 299.9,
                    size: 42,
                    stock: 15,
                    description: "Tênis leve e confortável para corridas de longa distância.",
                    cover: "https://exemplo.com/imagens/tenis-running-pro.jpg",
                    createdAt: "2026-11-23T14:00:00.000Z",
                    updatedAt: "2026-11-23T14:00:00.000Z",
                },
                },
            },
            },
        },
        "400": {
            $ref: "#/components/responses/BadRequestValidation",
        },
        "500": {
            description: "Erro interno ao cadastrar produto.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                message: "Erro ao cadastrar produto.",
                },
            },
            },
        },
        },
    },
    },
    "/produtos/busca": {
    get: {
        tags: ["Produtos"],
        summary: "Buscar produtos por filtros",
        description: "Filtra produtos por nome (exato), categoria (exata) ou descrição (parcial).",
        operationId: "buscarProdutosPorFiltro",
        parameters: [
        {
            name: "nome",
            in: "query",
            required: false,
            description: "Nome exato do produto.",
            schema: {
            type: "string",
            example: "Tênis Running Pro",
            },
        },
        {
            name: "categoria",
            in: "query",
            required: false,
            description: "Categoria exata do produto.",
            schema: {
            type: "string",
            example: "Calçados",
            },
        },
        {
            name: "descrição",
            in: "query",
            required: false,
            description: "Termo para busca parcial na descrição do produto.",
            schema: {
            type: "string",
            example: "corridas",
            },
        },
        ],
        responses: {
        "200": {
            description: "Lista de produtos filtrados retornada com sucesso.",
            content: {
            "application/json": {
                schema: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/Produto",
                },
                },
            },
            },
        },
        "500": {
            description: "Erro interno ao filtrar produtos.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ErrorMensagemResponse",
                },
                example: {
                mensagem: "Erro ao filtrar produtos.",
                },
            },
            },
        },
        },
    },
    },
    "/produtos/{id}": {
    parameters: [
        {
        $ref: "#/components/parameters/ProdutoIdParam",
        },
        ],
        get: {
        tags: ["Produtos"],
        summary: "Buscar produto por ID",
        description: "Retorna os detalhes de um produto específico a partir do seu ID.",
        operationId: "buscarProdutoPorId",
        responses: {
        "200": {
            description: "Produto encontrado com sucesso.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/Produto",
                },
            },
            },
            },
            "404": {
            description: "Produto não encontrado.",
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ErrorMensagemResponse",
                },
                example: {
                mensagem: "Produto não encontrado.",
                },
            },
            },
        },
          "500": {
            description: "Erro interno ao buscar produto por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMensagemResponse",
                },
                example: {
                  mensagem: "Erro ao buscar produtos por ID.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Produtos"],
        summary: "Atualizar completamente um produto",
        description: "Substitui todos os dados de um produto existente identificado pelo ID.",
        operationId: "atualizarProduto",
        requestBody: {
          required: true,
          description: "Payload completo com os novos dados do produto.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProdutoInput",
              },
              example: {
                name: "Tênis Running Ultra",
                category: "Calçados",
                price: 349.9,
                size: 42,
                stock: 20,
                description: "Versão atualizada com amortecimento reforçado.",
                cover: "https://exemplo.com/imagens/tenis-running-ultra.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Produto atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProdutoMutationResponse",
                },
                example: {
                  mensagem: "Produto atualizado com sucesso!",
                  Produto: {
                    _id: "665f1a2b3c4d5e6f7a8b9c0d",
                    name: "Tênis Running Ultra",
                    category: "Calçados",
                    price: 349.9,
                    size: 42,
                    stock: 20,
                    description: "Versão atualizada com amortecimento reforçado.",
                    cover: "https://exemplo.com/imagens/tenis-running-ultra.jpg",
                    createdAt: "2026-11-23T14:00:00.000Z",
                    updatedAt: "2026-11-23T14:15:00.000Z",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequestValidation",
          },
          "404": {
            description: "Produto não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Produto não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar produto.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Erro ao atualizar produto.",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Produtos"],
        summary: "Atualizar parcialmente um produto",
        description: "Atualiza um ou mais campos de um produto existente identificado pelo ID.",
        operationId: "atualizarProdutoParcial",
        requestBody: {
          required: true,
          description: "Campos do produto a serem atualizados parcialmente.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProdutoPartialInput",
              },
              example: {
                price: 279.9,
                stock: 8,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Produto atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProdutoMutationResponse",
                },
                example: {
                  mensagem: "Produto atualizado parcialmente com sucesso!",
                  Produto: {
                    _id: "665f1a2b3c4d5e6f7a8b9c0d",
                    name: "Tênis Running Pro",
                    category: "Calçados",
                    price: 279.9,
                    size: 42,
                    stock: 8,
                    description: "Tênis leve e confortável para corridas de longa distância.",
                    cover: "https://exemplo.com/imagens/tenis-running-pro.jpg",
                    createdAt: "2026-11-23T14:00:00.000Z",
                    updatedAt: "2026-11-23T14:20:00.000Z",
                  },
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequestValidation",
          },
          "404": {
            description: "Produto não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Produto não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar parcialmente o produto.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Erro ao atualizar parcialmente o produto.",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Produtos"],
        summary: "Remover um produto",
        description: "Exclui permanentemente um produto pelo seu ID.",
        operationId: "deletarProduto",
        responses: {
          "200": {
            description: "Produto removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProdutoMutationResponse",
                },
                example: {
                  mensagem: "Produto removido com sucesso!",
                  Produto: {
                    _id: "665f1a2b3c4d5e6f7a8b9c0d",
                    name: "Tênis Running Pro",
                    category: "Calçados",
                    price: 299.9,
                    size: 42,
                    stock: 15,
                    description: "Tênis leve e confortável para corridas de longa distância.",
                    cover: "https://exemplo.com/imagens/tenis-running-pro.jpg",
                    createdAt: "2026-11-23T14:00:00.000Z",
                    updatedAt: "2026-11-23T14:00:00.000Z",
                  },
                },
              },
            },
          },
          "404": {
            description: "Produto não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Produto não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao deletar produto.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessageResponse",
                },
                example: {
                  message: "Erro ao deletar produto.",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      ProdutoIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "Identificador único do produto (ObjectId do MongoDB).",
        schema: {
          type: "string",
          pattern: "^[0-9a-fA-F]{24}$",
          example: "665f1a2b3c4d5e6f7a8b9c0d",
        },
      },
    },
    responses: {
      BadRequestValidation: {
        description: "Erro de validação nos dados enviados (Zod).",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ValidationErrorResponse",
            },
            example: {
              message: "Erro de validação nos dados enviados.",
              errors: [
                {
                  campo: "name",
                  mensagem: "O nome deve ter pelo menos 3 caracteres.",
                },
              ],
            },
          },
        },
      },
    },
    schemas: {
      Produto: {
        type: "object",
        required: ["_id", "name", "category", "price", "size", "stock", "description"],
        properties: {
          _id: {
            type: "string",
            description: "Identificador único gerado pelo MongoDB.",
            example: "665f1a2b3c4d5e6f7a8b9c0d",
          },
          name: {
            type: "string",
            minLength: 3,
            description: "Nome do produto.",
            example: "Tênis Running Pro",
          },
          category: {
            type: "string",
            minLength: 3,
            description: "Categoria do produto.",
            example: "Calçados",
          },
          price: {
            type: "number",
            format: "float",
            minimum: 0,
            exclusiveMinimum: true,
            description: "Preço unitário positivo do produto.",
            example: 299.9,
          },
          size: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true,
            description: "Tamanho positivo do produto.",
            example: 42,
          },
          stock: {
            type: "integer",
            minimum: 0,
            description: "Quantidade inteira em estoque (maior ou igual a zero).",
            example: 15,
          },
          description: {
            type: "string",
            minLength: 5,
            description: "Descrição detalhada do produto.",
            example: "Tênis leve e confortável para corridas de longa distância.",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "URL válida da imagem de capa do produto.",
            example: "https://exemplo.com/imagens/tenis-running-pro.jpg",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-11-23T14:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-11-23T14:00:00.000Z",
          },
        },
      },
      ProdutoInput: {
        type: "object",
        required: ["name", "category", "price", "size", "stock", "description"],
        properties: {
          name: {
            type: "string",
            minLength: 3,
            description: "O nome deve ter pelo menos 3 caracteres.",
            example: "Tênis Running Pro",
          },
          category: {
            type: "string",
            minLength: 3,
            description: "A categoria deve ter pelo menos 3 caracteres.",
            example: "Calçados",
          },
          price: {
            type: "number",
            format: "float",
            minimum: 0,
            exclusiveMinimum: true,
            description: "O preço deve ser um valor positivo.",
            example: 299.9,
          },
          size: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true,
            description: "O tamanho deve ser um valor positivo.",
            example: 42,
          },
          stock: {
            type: "integer",
            minimum: 0,
            description: "O estoque deve ser um número inteiro não negativo.",
            example: 15,
          },
          description: {
            type: "string",
            minLength: 5,
            description: "A descrição deve ter pelo menos 5 caracteres.",
            example: "Tênis leve e confortável para corridas de longa distância.",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "A capa deve ser uma URL válida (opcional ou string vazia).",
            example: "https://exemplo.com/imagens/tenis-running-pro.jpg",
          },
        },
      },
      ProdutoPartialInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 3,
            description: "O nome deve ter pelo menos 3 caracteres.",
            example: "Tênis Running Pro",
          },
          category: {
            type: "string",
            minLength: 3,
            description: "A categoria deve ter pelo menos 3 caracteres.",
            example: "Calçados",
          },
          price: {
            type: "number",
            format: "float",
            minimum: 0,
            exclusiveMinimum: true,
            description: "O preço deve ser um valor positivo.",
            example: 279.9,
          },
          size: {
            type: "number",
            minimum: 0,
            exclusiveMinimum: true,
            description: "O tamanho deve ser um valor positivo.",
            example: 42,
          },
          stock: {
            type: "integer",
            minimum: 0,
            description: "O estoque deve ser um número inteiro não negativo.",
            example: 8,
          },
          description: {
            type: "string",
            minLength: 5,
            description: "A descrição deve ter pelo menos 5 caracteres.",
            example: "Tênis leve e confortável para corridas de longa distância.",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "A capa deve ser uma URL válida (opcional ou string vazia).",
            example: "https://exemplo.com/imagens/tenis-running-pro.jpg",
          },
        },
      },
      ProdutoMutationResponse: {
        type: "object",
        required: ["mensagem", "Produto"],
        properties: {
          mensagem: {
            type: "string",
            example: "Produto cadastrado com sucesso!",
          },
          Produto: {
            $ref: "#/components/schemas/Produto",
          },
        },
      },
      ValidationErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro de validação nos dados enviados.",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campo: {
                  type: "string",
                  example: "price",
                },
                mensagem: {
                  type: "string",
                  example: "O preço deve ser um valor positivo.",
                },
              },
            },
          },
        },
      },
      ErrorMessageResponse: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "string",
            example: "Erro interno no servidor.",
          },
        },
      },
      ErrorMensagemResponse: {
        type: "object",
        required: ["mensagem"],
        properties: {
          mensagem: {
            type: "string",
            example: "Produto não encontrado.",
          },
        },
      },
    },
  },
};