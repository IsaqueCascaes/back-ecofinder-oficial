const express = require('express'); // Importa o framework Express para criar o servidor
const mongoose = require('mongoose'); // Importa o Mongoose para conectar e interagir com o MongoDB
const bodyParser = require('body-parser'); // Middleware para processar dados JSON no corpo das requisições
const cors = require('cors'); // Middleware para permitir requisições cross-origin
const produtoRoutes = require('./src/routes/produtoRoutes'); // Importa as rotas relacionadas aos produtos
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas relacionadas à autenticação
const empresaRoutes = require('./src/routes/empresaRoutes'); // Importa as rotas de empresa
const categoriaRoutes = require('./src/routes/categoriaRoutes'); // Importa as rotas de categorias

const app = express(); // Inicializa a aplicação Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor (usa a porta definida nas variáveis de ambiente ou 5000 por padrão)

// Configuração de CORS
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:5173', 
  'https://ecofinder-oficial.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (ex.: Postman) e valida as origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Origem permitida
    } else {
      console.error(`Origin não permitida pelo CORS: ${origin}`); // Loga origens não permitidas
      callback(new Error('Not allowed by CORS')); // Rejeita a origem
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite envio de cookies e autenticação
}));

// Middleware para processar requisições JSON
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas
const mongoUri = 'mongodb+srv://isaquecascaes:12345@cluster0.bmbh4.mongodb.net/produtosDB?retryWrites=true&w=majority';
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB Atlas')) // Loga no console caso a conexão seja bem-sucedida
  .catch((err) => console.error(err)); // Loga no console caso ocorra um erro na conexão

// Definição das rotas
app.use('/api/produtos', produtoRoutes); // Define as rotas para a URL base `/api/produtos` que serão manipuladas pelo `produtoRoutes`
app.use('/api/auth', authRoutes); // Define as rotas para a URL base `/api/auth` que serão manipuladas pelo `authRoutes`
app.use('/api/empresas', empresaRoutes); // Define as rotas para a URL base `/api/empresas`
app.use('/api/categorias', categoriaRoutes); // Define as rotas para a URL base `/api/categorias`

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe no console que o servidor está rodando e a porta que está sendo usada
});
