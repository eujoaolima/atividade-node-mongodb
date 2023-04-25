require("dotenv").config();

// console.log(process.env.MONGODB_ROOT);

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("uploads"));

app.use(express.json());
mongoose.connect(process.env.MONGODB_ROOT); 

// Rotas

const rotaProdutos = require("./routes/produto");
const rotaSwagger = require("./routes/swagger");

app.use(rotaProdutos);
app.use(rotaSwagger);
// Escuta

app.listen(3000, () => {
    console.log("Executando em http://localhost:3000");
});

