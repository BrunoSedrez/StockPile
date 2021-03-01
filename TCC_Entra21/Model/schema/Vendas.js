var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendasSchema = Schema({
    cod_Venda: {
        type: String,
        require: true
    },
    cod_prod: {
        type: Number,
        require: true
    },
    quant_Consumida: {
        type: Number,
        require: true
    },
    data: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('vendas', VendasSchema);