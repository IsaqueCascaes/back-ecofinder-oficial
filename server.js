const express = require('express'); // Importa o framework Express para criar o servidor
const mongoose = require('mongoose'); // Importa o Mongoose para conectar e interagir com o MongoDB
const bodyParser = require('body-parser'); // Middleware para processar dados JSON no corpo das requisições
const cors = require('cors'); // Middleware para permitir requisições cross-origin
const produtoRoutes = require('./src/routes/produtoRoutes'); // Importa as rotas relacionadas aos produtos
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas relacionadas à autenticação

const app = express(); // Inicializa a aplicação Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor (usa a porta definida nas variáveis de ambiente ou 5000 por padrão)

// Middleware
app.use(cors()); // Habilita o CORS para permitir que o servidor seja acessado por diferentes origens
app.use(bodyParser.json()); // Configura o Body-Parser para que o servidor possa lidar com requisições no formato JSON

// Conectar ao MongoDB Atlas
const mongoUri = 'mongodb+srv://isaquecascaes:12345@cluster0.bmbh4.mongodb.net/produtosDB?retryWrites=true&w=majority'; // String de conexão para o MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB Atlas')) // Loga no console caso a conexão seja bem-sucedida
  .catch((err) => console.error(err)); // Loga no console caso ocorra um erro na conexão

// Usar rotas de produto
app.use('/api/produtos', produtoRoutes); // Define as rotas para a URL base `/api/produtos` que serão manipuladas pelo `produtoRoutes`
app.use('/api/auth', authRoutes); // Define as rotas para a URL base `/api/auth` que serão manipuladas pelo `authRoutes`

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe no console que o servidor está rodando e a porta que está sendo usada
});
