const express = require('express'); // Importa o framework Express para criar o servidor
const mongoose = require('mongoose'); // Importa o Mongoose para conectar e interagir com o MongoDB
const bodyParser = require('body-parser'); // Middleware para processar dados JSON no corpo das requisições
const cors = require('cors'); // Middleware para permitir requisições cross-origin

// Importa as rotas
const produtoRoutes = require('./src/routes/produtoRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
const empresaRoutes = require('./src/routes/empresaRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');

const app = express(); // Inicializa a aplicação Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor (usa a porta definida nas variáveis de ambiente ou 5000 por padrão)

// Middleware de CORS
const allowedOrigins = ['http://localhost:3000', 'https://ecofinder-oficial.netlify.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite cookies, se necessário
}));

// Middleware para JSON
app.use(bodyParser.json()); 

// Conectar ao MongoDB Atlas
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://isaquecascaes:12345@cluster0.bmbh4.mongodb.net/produtosDB?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/categorias', categoriaRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
