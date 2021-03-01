var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = Schema({
    cep_user: {
        type: Number,
        require: true
    },
    nomeEmpresa_user: {
        type: String,
        require: true
    },
    email_user: {
        type: String,
        require: true
    },
    CNPJ_user: {
        type: Number,
        require: true
    },
    senha_user: {
        type: String,
        require: true
    },
    nome_user: {
        type: String,
        require: true
    },
    CPF_user: {
        type: String,
        require: true
    },
    endereco_user: {
        type: Number,
        require: true
    },
    complemento_user: {
        type: Number,
        require: true
    }

});

module.exports = mongoose.model('usuarios', usuarioSchema);

