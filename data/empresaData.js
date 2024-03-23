/* DATA empresas */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Empresa){
return [ 
			Empresa.id, 
			Empresa.cnpj_cpf, 
			Empresa.razao, 
			Empresa.cliente_id, 
			Empresa.cliente_secret, 
			Empresa.link, 
			Empresa.url_redirecionamento, 
			Empresa.code, 
			Empresa.access_token, 
			Empresa.refresh_token, 
			Empresa.id_deposito, 
			Empresa.id_categoria, 
			Empresa.ativo, 
			Empresa.user_insert, 
			Empresa.user_update, 
 ]; 
}; 
/* CRUD GET */
exports.getEmpresa = function(id){
	strSql = ` select   
			   emp.id as  id  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.cliente_id as  cliente_id  
			,  emp.cliente_secret as  cliente_secret  
			,  emp.link as  link  
			,  emp.url_redirecionamento as  url_redirecionamento  
			,  emp.code as  code  
			,  emp.access_token as  access_token  
			,  emp.refresh_token as  refresh_token  
			,  emp.id_deposito as  id_deposito  
			,  emp.id_categoria as  id_categoria  
			,  emp.ativo as  ativo  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update    
 			FROM empresas emp 	     
			 where emp.id = ${id}  `;
	return  db.oneOrNone(strSql);
}
/* CRUD GET ALL*/
exports.getEmpresas = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'emp.id';
	if(params.orderby == 'Código') orderby = 'emp.id';
	if(params.orderby == 'Razão') orderby = 'emp.razao';
	if(params.orderby == 'CNPJ/CPF') orderby = 'emp.id,emp.cnpj_cpf';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id  !== 0 ){
		if (where != "") where += " and "; 
		where += `emp.id = ${params.id} `;
	}
	if(params.razao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `emp.razao = '${params.razao}' `;
		} else 
		{
			where += `emp.razao like '%${params.razao.trim()}%' `;
		}
	}
	if(params.cnpj_cpf.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `emp.cnpj_cpf = '${params.cnpj_cpf}' `;
		} else 
		{
			where += `emp.cnpj_cpf like '%${params.cnpj_cpf.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM empresas emp      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   emp.id as  id  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.cliente_id as  cliente_id  
			,  emp.cliente_secret as  cliente_secret  
			,  emp.link as  link  
			,  emp.url_redirecionamento as  url_redirecionamento  
			,  emp.code as  code  
			,  emp.access_token as  access_token  
			,  emp.refresh_token as  refresh_token  
			,  emp.id_deposito as  id_deposito  
			,  emp.id_categoria as  id_categoria  
			,  emp.ativo as  ativo  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update     
			FROM empresas emp      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   emp.id as  id  
			,  emp.cnpj_cpf as  cnpj_cpf  
			,  emp.razao as  razao  
			,  emp.cliente_id as  cliente_id  
			,  emp.cliente_secret as  cliente_secret  
			,  emp.link as  link  
			,  emp.url_redirecionamento as  url_redirecionamento  
			,  emp.code as  code  
			,  emp.access_token as  access_token  
			,  emp.refresh_token as  refresh_token  
			,  emp.id_deposito as  id_deposito  
			,  emp.id_categoria as  id_categoria  
			,  emp.ativo as  ativo  
			,  emp.user_insert as  user_insert  
			,  emp.user_update as  user_update    
			FROM empresas emp			     `;
		return  db.manyOrNone(strSql);
	}
}
/* CRUD - INSERT */
 exports.insertEmpresa = function(empresa){
	strSql = `insert into empresas (
		     cnpj_cpf 
		 ,   razao 
		 ,   cliente_id 
		 ,   cliente_secret 
		 ,   link 
		 ,   url_redirecionamento 
		 ,   code 
		 ,   access_token 
		 ,   refresh_token 
		 ,   id_deposito 
		 ,   id_categoria 
		 ,   ativo 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     '${empresa.cnpj_cpf}' 
		 ,   '${empresa.razao}' 
		 ,   '${empresa.cliente_id}' 
		 ,   '${empresa.cliente_secret}' 
		 ,   '${empresa.link}' 
		 ,   '${empresa.url_redirecionamento}' 
		 ,   '${empresa.code}' 
		 ,   '${empresa.access_token}' 
		 ,   '${empresa.refresh_token}' 
		 ,   ${empresa.id_deposito} 
		 ,   ${empresa.id_categoria} 
		 ,   '${empresa.ativo}' 
		 ,   ${empresa.user_insert} 
		 ,   ${empresa.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateEmpresa = function(empresa){
	strSql = `update   empresas set  
		     cnpj_cpf = '${empresa.cnpj_cpf}' 
 		 ,   razao = '${empresa.razao}' 
 		 ,   cliente_id = '${empresa.cliente_id}' 
 		 ,   cliente_secret = '${empresa.cliente_secret}' 
 		 ,   link = '${empresa.link}' 
 		 ,   url_redirecionamento = '${empresa.url_redirecionamento}' 
 		 ,   code = '${empresa.code}' 
 		 ,   access_token = '${empresa.access_token}' 
 		 ,   refresh_token = '${empresa.refresh_token}' 
 		 ,   id_deposito = ${empresa.id_deposito} 
 		 ,   id_categoria = ${empresa.id_categoria} 
 		 ,   ativo = '${empresa.ativo}' 
 		 ,   user_insert = ${empresa.user_insert} 
 		 ,   user_update = ${empresa.user_update} 
 		 where id = ${empresa.id}  returning * `;
	return  db.oneOrNone(strSql);
}
/* CRUD - DELETE */
 exports.deleteEmpresa = function(id){
	strSql = `delete from empresas 
		 where id = ${id}  `;
 	return  db.oneOrNone(strSql);
}


