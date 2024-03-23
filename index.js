/*

Tras várias promisses de uma vez
https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

*/
const express = require('express');
const axios = require('axios')

const chgSrv = require('./service/chgService.js');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const allowCors = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*"); // colocar os dominios permitidos | ex: 127.0.0.1:3000

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Access-Token, X-Key");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");

    res.header("Access-Control-Allow-Credentials", "false");

    next();
}




const chgGetCatalogo = (pagina) => {
    const url = `https://loja.chg.com.br/api/catalogo/produtos?key=cuJDtZKp55fFzsUZYM4XDgGYbGNurkFX&filial=CPS&pagina=${pagina}`
    axios
        .get(url)
        .then((res) => {
            const produtos = res.data.data;
            produtos.forEach(produto => {
                console.log(`Cod: ${produto.codigo} Nome: ${produto.nome}`)
            });
            //console.log(res.data.data)
        })
        .catch(console.error);
}


const getCatalogo = async function(pagina) {
    let dados = await chgSrv.getChgCatalogo(pagina);

    for (const [index, dado] of dados.entries()) {
        const produto = await chgSrv.getProdutoByCodigo(dado.codigo)
        if (produto.estoque > 0) {
            console.log(index, dado.codigo, dado.nome, produto.estoque);
        }
    }
    return;
}

const getSeteExemplos = async function() {

    const produtos = [
        { codigo: "1386530" },
        { codigo: "0218223" },
        { codigo: "0906154" },
        { codigo: "0533823" },
        { codigo: "0081114" },
        { codigo: "1751034" }


    ];

    for (const [index, dado] of produtos.entries()) {
        const produto = await chgSrv.getProdutoByCodigo(dado.codigo)
        console.log(index, produto.codigo, produto.nome, produto.estoque);
    }
    return;

}

const chama50Paginas = async function() {
    let idx = 1;
    while (idx < 6) {
        console.log("Página :", idx);
        await getCatalogo(idx);
        idx++
    }
}



app.use(allowCors);


app.use('/', require('./route/helloRoute.js'));
app.use('/', require('./route/blingRoute.js'));
app.use('/', require('./route/empresaRoute.js'));
app.use('/', require('./route/tarefaRoute.js'));
app.use('/', require('./route/usuarioRoute.js'));

app.listen(PORT, () => { console.log(`Servidor No Ar. Porta ${PORT}`); });


//chama50Paginas()

getSeteExemplos()