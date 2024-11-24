const Empresa = require('../models/Empresa');

// Criar uma nova empresa
exports.createEmpresa = async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.save();
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obter todas as empresas
exports.getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter uma empresa por ID
exports.getEmpresaById = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma empresa
exports.updateEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.status(200).json(empresa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Excluir uma empresa
exports.deleteEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });
    res.status(200).json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
