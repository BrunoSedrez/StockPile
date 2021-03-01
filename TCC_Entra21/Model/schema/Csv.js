var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;


var CSVSchema = Schema({
    Nome: {
        type: String,
        require: true
    },
    CodFornecedor: {
        type: String,
        require: true
    },
    CodCSV: {
        type: String,
        require: true
    },
    LeadTime: {
        type: String,
        require: true
    },
    Capacidade: {
        type: String,
        require: true
    },
    PrecoUnit: {
        type: String,
        require: true
    },
    CodProd: {
        type: String,
        require: true
    },
  });
  module.exports = mongoose.model('csvs', CSVSchema);