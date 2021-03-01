const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true }
)
    .then(connection => {
        console.log("MongoDB Conectado!");
        global.connection = connection.db("projetoFinal")//Conectando no Banco "projetoFinal"
    })
    .catch(err => console.log(err));
function buscarProdutosPCod(cod) {
    var codTeste = Number(cod);

    console.log(codTeste);
    //console.log("=========BuscarProdutosPCod=========");
    return global.connection
        .collection("produtos")
        .find({ cod_prod: codTeste })
        .toArray();
};

function ConsultaCsv() {
    console.log("=========BuscarCsv=========");
    return global.connection
        .collection("csvs")
        .find()
        .toArray();
};
module.exports = { buscarProdutosPCod, ConsultaCsv }; //exportando produtos para o server
