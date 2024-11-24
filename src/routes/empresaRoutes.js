const express = require('express');
const router = express.Router();
const {createEmpresa, getEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } = require('../controllers/empresaController');

router.post('/', createEmpresa);
router.get('/', getEmpresas);
router.get('/:id', getEmpresaById);
router.put('/:id', updateEmpresa);
router.delete('/:id', deleteEmpresa);

module.exports = router;