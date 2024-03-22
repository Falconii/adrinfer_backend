const erroDB = require('../util/userfunctiondb');

exports.empresas = function() { 
const parametros = { 
		razao:{check:true,require:true,maxLength:40},
		cliente_id:{check:true,require:true,maxLength:150},
		cliente_secret:{check:true,require:true,maxLength:150},
		link:{check:true,require:true,maxLength:255},
		url_redirecionamento:{check:true,require:true,maxLength:255},
		code:{check:true,require:true,maxLength:100},
		token:{check:true,require:true,maxLength:100},
		refresh_code:{check:true,require:true,maxLength:100},
	};
	return parametros; 
} 

