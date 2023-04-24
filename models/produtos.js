const { model, Schema } = require("mongoose");
const Joi = require('@hapi/joi');

const produtoSchema = new Schema({
    nome: {
        type: String,
    },
    descricao: {
        type: String,
    },
    quantidade: {
        type: Number,
    },
    preco: {
        type: Number,
    },
    desconto: {
        type: Number,
    },
    dataDesconto: {
        type: Date,
    },
    categoria: {
        type: String,
    },
    imagem: {
        type: String,
    }
});

const Produto = model("produto", produtoSchema);

function validarProduto(produto) {
    const schema = Joi.object({
        nome: Joi.string().min(1).required(),
        descricao: Joi.string().min(1).max(255).required(),
        quantidade: Joi.number().min(1).max(100000).required(),
        preco: Joi.number().min(1).max(10000).required(),
        desconto: Joi.number().optional(),
        dataDesconto: Joi.date().optional(),
        categoria: Joi.string().min(1).max(50).required(),
        imagem: Joi.string().required()
    });

    return schema.validate(produto);
}

module.exports = { Produto, validarProduto };
