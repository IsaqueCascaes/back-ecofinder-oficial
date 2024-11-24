const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

module.exports = mongoose.model('Empresa', EmpresaSchema);