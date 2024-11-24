const Categoria = require('../models/Categoria');

// Criar uma nova categoria
exports.createCategoria = async (req, res) => {
  try {
    const categoria = new Categoria({ nome: req.body.nome });
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

// Listar todas as categorias
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// Obter uma categoria pelo ID
exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a categoria' });
  }
};

exports.updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  try {
    // Encontra e atualiza a categoria com os dados fornecidos
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(
      id,
      { nome, descricao },
      { new: true } // Retorna o documento atualizado
    );

    if (!categoriaAtualizada) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar categoria', error: error.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    // Encontra e remove a categoria
    const categoriaRemovida = await Categoria.findByIdAndDelete(id);

    if (!categoriaRemovida) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir categoria', error: error.message });
  }
};