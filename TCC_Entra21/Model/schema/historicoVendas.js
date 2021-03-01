var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;


var histVendasSchema = Schema({
    cod_Venda: {
        type: String,
        require: true
    },
    data_Venda: {
        type: String,
        require: true
    },
    qtd: {
        type: String,
        require: true
    },
    cod_Prods: {
        type: Object,
        require: true
    }
});

module.exports = mongoose.model('histVendas', histVendasSchema);