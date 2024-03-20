const axios = require('axios')
const variaveis = require('../global/variaveis')
const qs = require('querystring');
//const ACESSTOKEN = "824066939464910bcb89eee3bd77ace9e17aaf5e"
//const ACESSTOKEN = "b878e80a59a823c2339cff192ca67888070813e8"
const ID_DEPOSITO = 14887604950
const ID_CATEGORIA = 9260994


exports.getToken = async function(code) {

    const data = {
        'grant_type': 'authorization_code',
        'code': code
    };
    const options = {
        url: 'https://www.bling.com.br/Api/v3/oauth/token',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${variaveis.getCredentialsBase64(1)}`,
            'Accept': '1.0',
        },
        data: qs.stringify(data),
    }

    response = await axios(options);

    return response.data;

}

exports.getProdutoFullById = async function(id_produto) {

    let lista = {}

    //console.log(`params: ${id_produto}`)

    const options = {
        url: `https://www.bling.com.br/Api/v3/produtos/${id_produto}`,
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    response = await axios(options);

    return response.data.data

}

exports.getProdutoSimpleByIds = async function(id_produtos, id_Categoria) {

    let lista = {}

    const options = {
        url: `https://www.bling.com.br/Api/v3/produtos`,
        method: 'get',
        params: {
            idProdutos: id_produtos,
            idCategoria: id_Categoria
        },
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    response = await axios(options);

    return response.data.data

}

exports.postAjustaSaldo = async function(id_deposito, id_produto, qtd, preco, histo) {

    let lista = {}

    const options = {
        url: `https://www.bling.com.br/Api/v3/estoques`,
        method: 'post',
        data: {
            deposito: {
                id: id_deposito
            },
            operacao: "B",
            produto: {
                id: id_produto
            },
            quantidade: qtd,
            preco: preco,
            custo: preco,
            observacoes: histo
        },
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    response = await axios(options);

    return response.data.data

}

exports.getSaldos = async function(produtos) {

    const options = {
        url: `https://www.bling.com.br/Api/v3/estoques/saldos/${ID_DEPOSITO}`,
        method: 'get',
        params: { idsProdutos: produtos },
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }
    try {
        reponse = await axios(options);
        return reponse.data.data;
    } catch (err) {
        throw err
    }


}

exports.getListaWork = async function() {


    let workList = [];

    const idProdutos = []

    try {

        let lista = await this.getProdutoSimpleByIds(idProdutos, ID_CATEGORIA)

        //console.log("RETORNO ", lista);

        lista.forEach(async(bling) => {

            workList.push({
                id: bling.id,
                nome: bling.nome,
                codigo: bling.codigo,
                preco: bling.preco,
                id_deposito: ID_DEPOSITO,
                saldo_bling: 0,
                saldo_chg: 0
            })

        });

        return workList;

    } catch (err) {

        throw err

    }

};