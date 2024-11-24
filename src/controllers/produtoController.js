const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

// Listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find()
      .populate('empresa', 'nome')
      .populate('categoria', 'nome');
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)
      .populate('empresa', 'nome')
      .populate('categoria', 'nome');
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, empresa, categoria: categoriaId, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;

  try {
    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });

    const novoProduto = new Produto({
      nome,
      empresa,
      nivel,
      urlImagem,
      ingredientes,
      razaoPrejudicial,
      categoria: categoria._id,
    });

    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Buscar produtos por categoria
exports.getProdutosByCategoria = async (req, res) => {
  try {
    const produtos = await Produto.find({ categoria: req.params.categoriaId })
      .populate('categoria', 'nome');
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos pela categoria' });
  }
};

// Atualizar um produto
exports.updateProduto = async (req, res) => {
  const { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;

  try {
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial },
      { new: true }
    ).populate("empresa", "nome").populate("categoria", "nome");
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar produtos pelo nome
exports.buscarProdutos = async (req, res) => {
  try {
    const { nome } = req.query;

    const produtos = await Produto.find({ nome: new RegExp(nome, "i") })
      .populate("empresa", "nome")
      .populate("categoria", "nome");

    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar produto pelo nome (versão específica)
exports.buscarProdutoPorNome = async (req, res) => {
  try {
    const { nome } = req.query;
    if (!nome) return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório" });

    const produtos = await Produto.find({ nome: new RegExp(nome, "i") })
      .populate("empresa", "nome")
      .populate("categoria", "nome");

    if (produtos.length === 0) return res.status(404).json({ message: "Nenhum produto encontrado com esse nome" });

    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};
