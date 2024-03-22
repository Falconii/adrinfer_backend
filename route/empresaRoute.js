/* ROUTE empresas */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const empresaSrv = require('../service/empresaService');

/* ROTA GETONE empresa */
router.get("/api/empresa/:id",async function(req, res) {
	{
		const lsLista = await empresaSrv.getEmpresa(req.params.id);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Empresa Não Encontrada.' });
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'empresa', message: err.message });
		}
	}
})
/* ROTA GETALL empresa */
router.get("/api/empresas",async function(req, res) {
	{
		const lsLista = await empresaSrv.getEmpresas();
		if (lsLista.length == 0) 
		{
			res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.'} );
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'empresa', message: err.message });
		}
	}
})
/* ROTA INSERT empresa */
router.post("/api/empresa",async function(req, res) {
	{
		const empresa = req.body;
		const registro = await empresaSrv.insertEmpresa(empresa);
		{
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Empresa', message: err.message });
		}
	}
})
/* ROTA UPDATE empresa */
router.put("/api/empresa",async function(req, res) {
	{
		const empresa = req.body;
		const registro = await empresaSrv.updateEmpresa(empresa);
		{
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Empresa', message: err.message });
		}
	}
})
/* ROTA DELETE empresa */
router.delete("/api/empresa/:id",async function(req, res) {
	{
		await empresaSrv.deleteEmpresa(req.params.id);
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Empresa', message: err.message });
		}
	}
})
/* ROTA CONSULTA POST empresas */
router.post("/api/empresas",async function(req, res) {
	{
		"id":0, 
		"razao":"", 
		"cnpj_cpf":"", 
		"ativo":"", 
		"pagina":0, 
		"tamPagina":50, 
		"contador":"N", 
		"orderby":"", 
		"sharp":false 
	}
*/
try 
	{
		const params = req.body;
		const lsRegistros = await empresaSrv.getEmpresas(params);
		{
		}
		else
		{
			res.status(200).json(lsRegistros);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Empresa', message: err.message });
		}
	}
})

module.exports = router;