// Importa o módulo Express para criar um servidor web.
import express from "express";
// Importa o módulo Multer para fazer upload de arquivos.
import multer from "multer";
// Importa as funções do controlador de posts para manipular as requisições relacionadas aos posts.
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configuração do armazenamento para o Multer, definindo o diretório de destino e o nome do arquivo.
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos enviados serão armazenados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo a ser salvo.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do middleware Multer com a configuração de armazenamento.
const upload = multer({ dest: "./uploads", storage });

// Alternativa para configuração no Linux ou Mac, sem uso explícito do armazenamento personalizado.
// const upload = multer({ dest: "./uploads" });

// Define as rotas da aplicação.
const routes = (app) => {
    // Habilita o middleware JSON para que o Express possa entender requisições com corpo em formato JSON.
    app.use(express.json());
    
    // Define uma rota GET para a URL '/posts' que lista os posts.
    app.get("/posts", listarPosts);
    
    // Define uma rota POST para a URL '/posts' que permite criar um novo post.
    app.post("/posts", postarNovoPost);
    
    // Define uma rota POST para a URL '/upload' que permite o upload de uma imagem.
    // Utiliza o middleware Multer para processar o upload do arquivo.
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta as rotas para serem usadas em outras partes da aplicação.
export default routes;
