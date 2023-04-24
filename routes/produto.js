const { Router } = require("express");
const {Produto, validarProduto} = require("../models/produtos");

const multer = require("multer");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Rotas

// Lista geral

router.get("/produtos", async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
});

// Lista por ID

router.get("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produtosExistentes = await Produto.findById(id);

        if (produtosExistentes) {
            res.status(200).json(produtosExistentes);
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Adicionar produto

router.post("/produtos", upload.single("imagemProduto"), async (req, res) => {
    try {
        const {
            nome,
            descricao,
            quantidade,
            preco,
            desconto,
            dataDesconto,
            categoria,
            
        } = req.body;

        const imagem = req.file ? `http://localhost:3000/${req.file.filename}` : '';
        // console.log(imagem);

        const produto = new Produto({
            nome,
            descricao,
            quantidade,
            preco,
            desconto,
            dataDesconto,
            categoria,
            imagem,
        });
        validarProduto();

        await produto.save();
        res.status(201).json(produto);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// Atualizar produto
router.put("/produtos/:id", upload.single("imagem"), async (req, res) => {
    try {
        const {
            nome,
            descricao,
            quantidade,
            preco,
            desconto,
            dataDesconto,
            categoria,
        } = req.body;
        const imagem = req.file ? `http://localhost:3000/${req.file.filename}` : '';
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            {
                nome,
                descricao,
                quantidade,
                preco,
                desconto,
                dataDesconto,
                categoria,
                imagem,
            },
            { new: true }
        );
        if (!produto) {
            res.status(404).json({ message: "Produto não encontrado." });
        } else {
            res.status(200).json(produto);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// Remover produto

router.delete("/produtos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletarProduto = await Produto.findByIdAndDelete(id);

        const outrosProdutos = await Produto.find();

        if(deletarProduto) {
            res.status(200).json({ message: "Produto removido", outrosProdutos});
        } else {
            res.status(404).json({ message: "Produto não encontrado"})
        }
    }

    catch(err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


module.exports = router;
