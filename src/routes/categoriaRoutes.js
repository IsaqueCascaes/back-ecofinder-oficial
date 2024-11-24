const express = require('express');
const router = express.Router();
const { createCategoria, getCategorias, getCategoriaById, updateCategoria, deleteCategoria } = require('../controllers/categoriaController');

router.post('/', createCategoria); // Rota para criar uma nova categoria
router.get('/', getCategorias); // Rota para listar todas as categorias
router.get('/:id', getCategoriaById); // Rota para obter uma categoria específica
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);
module.exports = router;