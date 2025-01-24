const mongoose = require('mongoose');

// Conectar ao banco de dados MongoDB 'codecash'
mongoose.connect('mongodb://localhost:27017/codecash', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB - codecash');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
  });

  // Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
    cpf: { type: String, required: true },
    nome: { type: String, required: true },
    rg: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    senha: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // Criando o modelo a partir do esquema
  const User = mongoose.model('User', userSchema, 'users'); // 'users' é o nome da coleção no MongoDB
  
  // Exportando o modelo para uso em outros arquivos
  module.exports = User;