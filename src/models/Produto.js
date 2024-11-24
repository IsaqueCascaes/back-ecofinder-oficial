const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const produtoSchema = new mongoose.Schema({
  nome: { type: String,
  required: true 
  },
  empresa: {
  type: Schema.Types.ObjectId,
  ref: 'Empresa', //ref ao modelo de Empresa
  required: true 
  },
  categoria: {
  type: Schema.Types.ObjectId,
  ref: 'Categoria',
  required: true
  }, 
  nivel: { type: String, required: false },
  urlImagem: { type: String, required: false },
  ingredientes: { type: String, required: false },
  razaoPrejudicial: { type: String, required: false },
});

module.exports = mongoose.model('Produto', produtoSchema);
