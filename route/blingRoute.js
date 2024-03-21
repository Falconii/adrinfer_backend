const express = require('express');
const axios = require('axios')
const blingSrv = require('../service/blingService.js');
const chgSrv = require('../service/chgService.js');
const variaveis = require('../global/variaveis')

const qs = require('querystring');
const router = express.Router();


router.get('/api/bling/recebercode', async function(req, res) {

    console.log("ENTREI NA recebercode");

    if (req.query.code) {

        variaveis.setCode(req.query.code);

        try {

            const retorno = await blingSrv.getToken();

            variaveis.setAcessToken(retorno.access_token);

            variaveis.setRefreshToken(retorno.refresh_token);

            response.status(200).json(retorno);

        } catch (error) {

            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                response.status(200).json({ message: error.response.status });
            }
        }


    }

    res.status(200).json(req.query.code);

})


router.get('/api/bling/token', async function(req, response) {

    try {

        const retorno = await blingSrv.getToken();

        variaveis.setAcessToken(retorno.access_token);

        variaveis.setRefreshToken(retorno.refresh_token);

        response.status(200).json(retorno);

    } catch (error) {

        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            response.status(200).json({ message: error.response.status });
        }
    }


    /*
        axios(options).then(function(res) {
            console.log(res);
            const retorno = res.data;
            variaveis.setAcessToken(retorno.access_token);
            variaveis.setRefreshToken(retorno.refresh_token)
            response.status(200).json(retorno);
        }).catch(function(error) {
            let status = 200;
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                response.status(200).json({ message: error.response.status });
            }
        });
        */
})


router.get('/api/bling/refreshtoken', function(req, response) {

    const clientId = "ad4ef071ff95286ac58508d99f21c195266fab6a";
    const secretClient = "137452b9150016a50c705116480a86982056c287d50b0909f60378e82aa0";
    const chave = clientId + ":" + secretClient;
    const credentials = clientId + ":" + secretClient;
    let buff = Buffer.from(chave);
    const credBase64 = buff.toString('base64')
    console.log(`credencial ${chave}`)
    console.log(`credential base64  ${credBase64}`)
    const data = {
        'grant_type': 'refresh_token',
        'refresh_token': variaveis.getRefreshToken()
    };
    const options = {
        url: 'https://www.bling.com.br/Api/v3/oauth/token',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credBase64}`,
            'Accept': '1.0',
        },
        data: qs.stringify(data),
    }

    axios(options).then(function(res) {
        console.log(res);
        const retorno = res.data.data
        variaveis.setAcessToken = retorno.access_token
        variaveis.setRefreshToken = retorno.refresh_token
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getcode', function(req, response) {

    const options = {
        url: 'https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=ad4ef071ff95286ac58508d99f21c195266fab6a&state=122a1900f33fa161a1d9e3f8da605937',
        headers: {
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Accept': '*/*',
        },
        method: 'get',
    }

    axios.get(options).then(function(res) {
        response.status(200).json({ message: "Code Solicitado !" });
    }).catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            response.status(200).json({ message: error.response.status });
        }
    });

})

router.get('/api/bling/getprodutos/:id_produto', function(req, response) {
    const lixo = `https://www.bling.com.br/Api/v3/produtos/${req.params.id_produto}`;
    console.log(lixo)
    const options = {
        url: `https://www.bling.com.br/Api/v3/produtos/${req.params.id_produto}`,
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}}`
        }
    }

    axios(options).then(function(res) {
        const retorno = res.data.data
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getprodutos', function(req, response) {
    const options = {
        url: `https://www.bling.com.br/Api/v3/produtos`,
        method: 'get',
        params: {
            idCategoria: 9260994
        },
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    axios(options).then(function(res) {
        const retorno = res.data.data
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getdepositos', function(req, response) {
    const lixo = `https://www.bling.com.br/Api/v3/depositos`;
    console.log(lixo)
    const options = {
        url: `https://www.bling.com.br/Api/v3/depositos`,
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    axios(options).then(function(res) {
        const retorno = res.data.data
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getsaldos', function(req, response) {
    const options = {
        url: `https://www.bling.com.br/Api/v3/estoques/saldos/14887604950`,
        method: 'get',
        params: { idsProdutos: [16226515369, 16225647233] },
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    axios(options).then(function(res) {
        const retorno = res.data.data
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getcategorias', function(req, response) {
    const options = {
        url: `https://www.bling.com.br/Api/v3/categorias/produtos`,
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${variaveis.getAcessToken()}`
        }
    }

    axios(options).then(function(res) {
        const retorno = res.data.data
        response.status(200).json(retorno);
    }).catch(function(err) {
        console.log("error = " + err);
        const retorno = { message: err.message };
        response.status(200).json(retorno);
    });


})

router.get('/api/bling/getprodutofullbyid/:id_produto', async function(req, resp) {

    try {
        const lista = await blingSrv.getProdutoFullById(req.params.id_produto)

        resp.status(200).json(lista);
    } catch (err) {
        resp.status(200).json({ message: "DEU ERRO ", err });
    }

})

router.get('/api/bling/getprodutoSimplebyids', async function(req, resp) {

    const id_produtos = []
    const id_Categoria = 9260994
    try {
        const lista = await blingSrv.getProdutoSimpleByIds(id_produtos, id_Categoria)
        resp.status(200).json(lista);
    } catch (err) {
        resp.status(200).json({ message: "DEU ERRO ", err });
    }

})

router.get('/api/bling/sincronizarsaldo', async function(req, resp) {
    let idsProdutos = [];
    let codigoProdutos = [];
    let contador = 0;
    try {
        const listaWork = await blingSrv.getListaWork();
        listaWork.forEach(produto => {
            idsProdutos.push(produto.id)
            codigoProdutos.push({ codigo: produto.codigo })
        });
        //console.log(idsProdutos);
        //console.log("BUSCAR SALDOS BLING");
        const saldosBling = await blingSrv.getSaldos(idsProdutos)
            //console.log(saldosBling);
            //console.log("BUSCAR SALDOS CHG");
            //console.log(codigoProdutos)
        saldosCHG = await chgSrv.getProdutoByCodigoArray(codigoProdutos)
            //console.log(saldosCHG)
        listaWork.forEach(item => {
            //console.log("item", item);
            var bling = saldosBling.filter(x => x.produto.id === item.id);
            if (bling) {
                //console.log("bling", bling);
                //console.log("bling.produto", bling[0].produto.id);
                item.saldo_bling = bling[0].saldoFisicoTotal;
            }
            var chg = saldosCHG.filter(x => x.codigo === item.codigo);
            if (chg) {
                //console.log("chg", chg);
                item.saldo_chg = chg[0].estoque;
            }
        })
        for (const [index, dado] of listaWork.entries()) {
            if (dado.saldo_bling != dado.saldo_chg) {
                console.log("Produto - ", dado.id, dado.saldo_bling, dado.saldo_chg);
                await blingSrv.postAjustaSaldo(dado.id_deposito, dado.id, dado.saldo_chg, dado.preco, "AJUSTE AUTOMÁTICO CHG")
                contador++;
            }
        }
        const men = `Fim Do Processamento. ${contador == 0 ? 'NENHUM PRODUTO AJUSTADO!': contador.toString()+' PRODUTOS AJUSTADOS!'}`;
        resp.status(200).json({ message: men });
    } catch (err) {
        resp.status(200).json(err);
    }


})





module.exports = router;