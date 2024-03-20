const chgData = require('../data/chgData');
const axios = require('axios')

exports.getChgCatalogo = async function(pagina) {
    const url = `https://loja.chg.com.br/api/catalogo/produtos?key=cuJDtZKp55fFzsUZYM4XDgGYbGNurkFX&filial=CPS&pagina=${pagina}`
    let response = await axios.get(url);
    return response.data.data
};

exports.getProdutoByCodigo = async function(codigo) {
    const url = `https://loja.chg.com.br/api/catalogo/produto?key=cuJDtZKp55fFzsUZYM4XDgGYbGNurkFX&produto=${codigo}&filial=CPS`
    let response = await axios.get(url);
    return response.data.data
};


exports.getProdutoByCodigoArray = async function(produtos) {
    let retorno = []
        //console.log("Parametro funcao getProdutoByCodigoArray:", produtos)
    for (const [index, dado] of produtos.entries()) {
        const produto = await this.getProdutoByCodigo(dado.codigo)
        retorno.push({
            index: index,
            codigo: produto.codigo,
            estoque: produto.estoque

        })
    }
    return retorno;
};