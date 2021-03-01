var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;


var PedidoSchema = Schema({
    cod_Ped: {
        type: String,
        require: true
    },
    data_Ped: {
        type: String,
        require: true
    },
    qtd_Total: {
        type: Number,
        require: true
    },
    cod_prod: {
        type: Number,
        require: true
    }
});
module.exports = mongoose.model('pedidos', PedidoSchema);
