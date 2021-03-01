var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var ProdutoSchema = Schema({
    cod_prod: {
        type: Number,
        require: true
    },
    nome_Prod: {
        type: String,
        require: true
    },
    qtd_Estoque: {
        type: Number,
        require: true
    },
    data: {
        type: String,
        require: true
    },
    consumido: {
        type: Number,
        require: true
    },
    diasAb: {
        type: Number,
        require: true
    },
    qtd_Total:{
        type: Number,
        require: true
    },
    porcentagem:{
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('produtos', ProdutoSchema);

