const User = require('../models/User'); // Importa o modelo de Usuário para interagir com o banco de dados

// Função de registro para criar novos usuários
const register = async (req, res) => {
  const { user_name, senha, isAdmin } = req.body; // Extrai os dados do corpo da requisição

  try {
    // Verificar se o usuário já existe no banco de dados
    const userExists = await User.findOne({ user_name });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' }); // Retorna erro 400 se o usuário já estiver cadastrado
    }

    // Criar um novo usuário com os dados fornecidos
    const newUser = new User({
      user_name,
      senha,
      isAdmin: isAdmin || false, // Se isAdmin não for passado, o valor padrão será 'false'
    });

    // Salvar o novo usuário no banco de dados
    await newUser.save();

    // Retornar sucesso com status 201 (recurso criado)
    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    // Retornar erro 500 se houver algum problema interno do servidor
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função de login para autenticação
const login = async (req, res) => {
  const { user_name, senha } = req.body; // Extrai o nome de usuário e a senha do corpo da requisição

  try {
    // Busca o usuário pelo nome de usuário
    const user = await User.findOne({ user_name });

    // Se o usuário não for encontrado, retorna erro 401 (não autorizado)
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se a senha fornecida é igual à armazenada no banco de dados
    if (user.senha === senha) {
      // Se a senha estiver correta, retornar sucesso com status 200 e informar se o usuário é admin
      return res.status(200).json({
        message: 'Acesso permitido',
        isAdmin: user.isAdmin, // Retorna se o usuário tem privilégios de administrador
      });
    } else {
      // Se a senha estiver incorreta, retorna erro 401 (não autorizado)
      return res.status(401).json({ message: 'Acesso negado. Senha incorreta.' });
    }
  } catch (error) {
    // Retornar erro 500 se houver algum problema interno do servidor
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  register, // Exporta a função de registro
  login,    // Exporta a função de login
};
