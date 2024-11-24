const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController'); // Importa o controlador completo
const Produto = require('../models/Produto'); // Modelo Produto

// Rota para buscar produtos pelo nome
router.get('/buscar', produtoController.buscarProdutoPorNome);

// Rotas para CRUD de produtos
router.get('/', produtoController.getAllProdutos);  // Listar todos os produtos
router.get('/:id', produtoController.getProdutoById);  // Listar produto por ID
router.post('/', produtoController.createProduto);  // Criar produto
router.get("/buscar", produtoController.buscarProdutos);

// Rota para listar produtos por categoria específica
router.get('/categoria/:categoriaId', produtoController.getProdutosByCategoria); 

router.put('/:id', produtoController.updateProduto);  // Editar produto
router.delete('/:id', produtoController.deleteProduto);  // Deletar produto

// Rota para inserir múltiplos produtos em uma única requisição (bulk insert)
router.post('/bulk', async (req, res) => {
  try {
    const produtos = await Produto.insertMany(req.body);
    res.status(201).json(produtos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
