var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;


var PedidoArqSchema = Schema({
    codPedidoArq: {
        type: Number,
        require: true
    },
    dataPed: {
        type: String,
        require: true
    },
    qtdPedArq: {
        type: Number,
        require: true
    },
    cod_prod: {
        type: Number,
        require: true
    }
});
module.exports = mongoose.model('pedidos_Arq', PedidoArqSchema);