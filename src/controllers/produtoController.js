const Produto = require('../models/Produto'); // Importa o modelo Produto para interagir com o banco de dados MongoDB

// Função para listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    // Busca todos os produtos no banco de dados usando o método find()
    const produtos = await Produto.find();
    // Retorna a lista de produtos com o status 200 (OK)
    res.status(200).json(produtos);
  } catch (err) {
    // Se ocorrer um erro, retorna o status 500 (erro do servidor) com a mensagem do erro
    res.status(500).json({ message: err.message });
  }
};

// Função para listar um produto por ID
exports.getProdutoById = async (req, res) => {
  try {
    // Busca o produto pelo ID passado como parâmetro na URL
    const produto = await Produto.findById(req.params.id);
    // Se o produto não for encontrado, retorna o status 404 (não encontrado)
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    // Se o produto for encontrado, retorna os dados com o status 200 (OK)
    res.status(200).json(produto);
  } catch (err) {
    // Em caso de erro, retorna o status 500 (erro do servidor) com a mensagem do erro
    res.status(500).json({ message: err.message });
  }
};

// Função para criar um novo produto
exports.createProduto = async (req, res) => {
  // Extrai os dados do corpo da requisição (nome, empresa, etc.)
  const { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;
  // Cria uma nova instância do modelo Produto com os dados fornecidos
  const novoProduto = new Produto({ nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial });

  try {
    // Salva o novo produto no banco de dados
    await novoProduto.save();
    // Retorna o novo produto criado com o status 201 (criado com sucesso)
    res.status(201).json(novoProduto);
  } catch (err) {
    // Em caso de erro, retorna o status 400 (requisição inválida) com a mensagem do erro
    res.status(400).json({ message: err.message });
  }
};

// Função para atualizar um produto existente
exports.updateProduto = async (req, res) => {
  // Extrai os dados do corpo da requisição para atualização
  const { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial } = req.body;

  try {
    // Atualiza o produto pelo ID com os novos dados e retorna o novo estado do produto atualizado
    const produto = await Produto.findByIdAndUpdate(
      req.params.id, // O ID do produto passado pela URL
      { nome, empresa, categoria, nivel, urlImagem, ingredientes, razaoPrejudicial }, // Dados atualizados
      { new: true } // Retorna o produto atualizado em vez do antigo
    );
    // Se o produto não for encontrado, retorna o status 404 (não encontrado)
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    // Se for atualizado com sucesso, retorna o produto com o status 200 (OK)
    res.status(200).json(produto);
  } catch (err) {
    // Em caso de erro, retorna o status 400 (requisição inválida) com a mensagem do erro
    res.status(400).json({ message: err.message });
  }
};

// Função para deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    // Deleta o produto pelo ID passado pela URL
    const produto = await Produto.findByIdAndDelete(req.params.id);
    // Se o produto não for encontrado, retorna o status 404 (não encontrado)
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    // Se deletado com sucesso, retorna o status 200 (OK) e uma mensagem de sucesso
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    // Em caso de erro, retorna o status 500 (erro do servidor) com a mensagem do erro
    res.status(500).json({ message: err.message });
  }
};

// Função para buscar produtos por nome
exports.buscarProdutoPorNome = async (req, res) => {
  try {
    // Captura o parâmetro de consulta "nome" da URL
    const { nome } = req.query;
    // Se o nome não for fornecido, retorna erro 400 (requisição inválida)
    if (!nome) {
      return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório" });
    }

    // Realiza a busca por nome usando uma expressão regular para buscar case-insensitive
    const produtos = await Produto.find({ nome: new RegExp(nome, 'i') });

    // Se nenhum produto for encontrado, retorna status 404 (não encontrado)
    if (produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado com esse nome" });
    }

    // Se encontrado, retorna os produtos correspondentes
    res.json(produtos);
  } catch (err) {
    // Em caso de erro, retorna o status 500 (erro do servidor)
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};
