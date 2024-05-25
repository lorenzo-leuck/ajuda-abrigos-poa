const mongoose = require("mongoose");
const { Schema } = mongoose;

// usuarios

const usuariosSchema = new mongoose.Schema({
  username: String,
  password: String,
  abrigo: String,
  tipo: String,
});

const Usuarios = mongoose.model('usuarios', usuariosSchema);

// doacoes

const DoacoesSchema = new mongoose.Schema({
  label: String,
  categoria: String,
});

const Doacoes = mongoose.model('doacoes', DoacoesSchema);

// demandas

const DemandasSchema = new mongoose.Schema({
  abrigo: String,
  doacoes: Schema.Types.Mixed,
  nao_aceitamos: Schema.Types.Mixed,
  voluntarios: Schema.Types.Mixed,
  date: { type: Date, default: Date.now }
});

const Demandas = mongoose.model('demandas', DemandasSchema);


// voluntarios

const VoluntariosSchema = new mongoose.Schema({
  area: String
});

const Voluntarios = mongoose.model('areaVoluntarios', VoluntariosSchema, 'areaVoluntarios');



const AbrigosSchema = new mongoose.Schema({
  titulo: String,
  abrigo: String,
  endereco: String,
  contato: String,
  info: String,
});

const Abrigos = mongoose.model('abrigos', AbrigosSchema, 'abrigos');


module.exports = {
    Usuarios, Doacoes,Demandas, Voluntarios, Abrigos
};