// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

var carregar = true;

$(function (){
	console.log(carregar);
	// AÇÕES DA TABELA DE LISTAGEM
	$('#listagem').on('click', '.btnVer', ver);
	$('#listagem').on('click', '.btnEditar', editar)
	$('#listagem').on('click', '.btnDeletar', deletar);

	// BTN FORM EDITAR 
	$('#alterar').on('click', atualizar);

	// BTN FORM SALVAR
	$('#salvar').on('click', adicionar);

	// VOLTAR LISTAGEM
	$('.voltar').on('click', voltar);

	// TELA DE NOVO
	$('#novo').on('click', novo);


	// ROTAS PARA CHAMAR AS FUNÇÕES
	if (window.location.pathname != "/" || window.location.pathname !="/pessoas/login" ){
		var usuario = localStorage.getItem("usuario");
		if (usuario != null) {
			$("#menu").show();
			if( window.location.pathname.match(/listagem/)){
				listagem();
			} else if ( window.location.pathname.match(/edit/)) {
				form_editar();
			} else if (window.location.pathname.match(/ver/)){
				preencherVer();
			}
		} else {
			$("#menu").hide();
			if (carregar) {
				// carregar = false;
				//	$(location).attr('href', '/pessoas/login/');
			}
		}
	}
});

// EXIBIR LISTAGEM 
function listagem(){
	var $listagem = $('#listagem'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/pessoas',
		success: function(pessoas){
			$.each(pessoas, function(i, pessoa) {
				$listagem.append('<tr><td>'+this.nome+'</td><td>'+this.login+'</td><td><a href="#" class="btn btn-light btnVer" data-id="' + this.id + '">Visualizar</a></td><td><a href="#" class="btn btn-light btnEditar" data-id="' + this.id + '">Editar</a></td><td><a href="#" class="btn btn-danger text-white btnDeletar" data-id="' + this.id + '">Deletar</a></td></tr>');
			});
		}
	});
}

// ABRIR TELA DE VISUALIZAR
function ver(event){
	event.preventDefault();
	var thisId = $(this).data('id');
	$(location).attr('href', '/pessoas/ver/'+ thisId);
}

// PREENCHER TELA DE VISUALIZAR 
function preencherVer(){
	var id = window.location.pathname.replace(/[^0-9]/g,'');
	$.getJSON('/pessoas/' + id).done(function(data) {
		$('#nome').text(data.nome);
		$('#login').text(data.login);
	});
}

// DELETAR ITEM
function deletar(event) {
	event.preventDefault();
	var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
	if (confirmation === true) {
		$.ajax({
			type: 'DELETE',
			url: '/pessoas/' + $(this).data('id')
		}).done(function( response ) {
			location.reload(true);
		});
	}else {
		return false;
	}
};

// ABRIR TELA DE EDITAR 
function editar(event){
	event.preventDefault();
	var thisId = $(this).data('id');
	$(location).attr('href', '/pessoas/'+ thisId+'/edit');
}

// PREENCHER FORM DE EDITAR
function form_editar(event){
	var id = window.location.pathname.replace(/[^0-9]/g,'');
	$.getJSON('/pessoas/' + id).done(function(data) {
		$('#nome').val(data.nome);
		$('#login').val(data.login);
		$('#senha').val(data.senha);	
	})
}

// ATUALIZAR REGISTRO
function atualizar(event){
	event.preventDefault();
	var id = window.location.pathname.slice(9, 11);
	var nome = $('#nome').val();
	var login = $('#login').val(); 
	var senha =  $('#senha').val() ;
	if (nome != "" && login != "" && senha != "") {
		var pessoa = {
			'nome': nome ,
			'login': login ,
			'senha': senha   
		};

		pessoa = {
			"pessoa": pessoa
		}

		$.ajax({
			type: 'PUT',
			data: pessoa,
			url: '/pessoas/'+id,
			dataType:"json",
		}).done(function( response ) {
			$(location).attr('href', '/pessoas/ver/'+response.id);
		});
	} else {
		alert("Nenhum dos campos pode ficar vazio!")
	}
};

// ADICIONAR REGISTRO
function adicionar(event) {
	event.preventDefault();
	var nome = $('#nome').val();
	var login = $('#login').val(); 
	var senha =  $('#senha').val() ;

	if (nome != "" && login != "" && senha != "") {
		$.ajax({
			type: 'POST',
			data: {login: login},
			url: '/pessoas/verificar_login',
			dataType:"json",


		}).done(function( response ) {
			if(response){
				var pessoa = {
					'nome': nome ,
					'login': login ,
					'senha': senha   
				};

				pessoa = {
					"pessoa": pessoa
				}

				$.ajax({
					type: 'POST',
					data: pessoa,
					url: '/pessoas',

					dataType:"json",


				}).done(function( response ) {
					$(location).attr('href', '/diretorios/ver_pasta/'+response.id);
      		localStorage.setItem("usuario", response.usuario);
				});
			} else {
				alert("O email escolhido já está em uso")
			}
		});

	} else {
		alert("Nenhum dos campos pode ficar vazio!")
	}
};

// VOLTAR PARA A TELA DE LISTAGEM
function voltar(){
	$(location).attr('href', '/pessoas/login');
}

// ABRIR TELA DE NOVO
function novo(){
	$(location).attr('href', '/pessoas/new');
}


// DIRETÓRIOS

$(function () {
	preencherVerDiretorio();
	$('#pastas').on('click', '.verDiretorio', verPasta);
	$('#arquivos').on('click', '.btnDownload', download_arquivos);
	$('#arquivos').on('click', '.btnDeletarArquivo', delete_arquivo);
	arquivos();
});
function preencherVerDiretorio(){
	var id = window.location.pathname.replace(/[^0-9]/g,'');
	$.getJSON('/diretorios/' + id).done(function(data) {
		preencherVerSubDiretorio(data.id);
		$('#nome').text(data.nome);
	});
}

function preencherVerSubDiretorio(id){
	var $pastas = $('#pastas'); 
	$('.btn-outline-secondary').remove();
	$.ajax({  
		type: 'POST',
		dataType: 'json',
		data: {id: id} ,
		url: '/diretorios/sub_pastas',
		success: function(diretorios){
			$.each(diretorios, function(i, diretorio) {
				$pastas.append('<a href="#" class="btn btn-outline-secondary m-10 verDiretorio" data-id="' + this.id + '"><i class="fa fa-folder-open" ></i> '+this.nome+'</a>');
			});
		}
	});
}

function addSubDiretorio() {

	var nome =  $('#nome_sub').val();
	var diretorio_id = window.location.pathname.replace(/[^0-9]/g,'');
	var diretorio = {
		"diretorio": { 'nome': nome , "diretorio_id": diretorio_id}
	}
	if (nome != "") {
		$.ajax({
			type: 'POST',
			data: diretorio,
			url: '/diretorios',
			dataType:"json",
		}).done(function( response ) {
			preencherVerSubDiretorio(diretorio_id);
			$('#nome_sub').val("");
		});
	} else {
		alert("Nenhum dos campos pode ficar vazio!")
	}
};

function verPasta(){
	var thisId = $(this).data('id');
	$(location).attr('href', '/diretorios/ver_pasta/'+ thisId);
}

function deletarPasta() {
	var confirmation = confirm('Você tem certeza que deseja excluir essa pasta? Com isso você excluirá tudo que tem dentro dela');
	if (confirmation === true) {
		var id =  window.location.pathname.replace(/[^0-9]/g,'');
		$.ajax({
			type: 'DELETE',
			url: '/diretorios/' + id
		}).done(function( response ) {
			window.history.back();
		});
	}else {
		return false;
	}
};


function upload(){
	var arquivo = $("#anexo_arquivo").val();
	var diretorio =  window.location.pathname.replace(/[^0-9]/g,'');
	if (arquivo != "") {
		$.ajax({
			type: 'POST',
			data: {arquivo: arquivo, diretorio: diretorio},
			url: '/arquivos/upload_arquivo',
			dataType:"json",
		}).done(function( response ) {
			arquivos();
		});
	} else {
		alert("Nenhum arquivo anexado!")
	}
}

function arquivos(){
	var $arquivos = $('#arquivos'); 
	$('.linha_arquivos').remove();
	var id = window.location.pathname.replace(/[^0-9]/g,'');
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		data: {diretorio: id} ,
		url: '/arquivos/listagem_arquivos',
		success: function(arquivos){
			$.each(arquivos, function(i, arquivo) {
				$arquivos.append('<tr class="linha_arquivos"><td>'+this.nome+'</td><td><a data-id="'+ this.id+'" class="btn btn-info text-white btnDownload" ><i class="fa fa-download"></i></a></td><td><a href="#" class="btn btn-danger text-white btnDeletarArquivo" data-id="' + this.id + '"><i class="fa fa-trash"></i></a></td></tr>');
			});
		}
	});
	$('#anexo_arquivo').val("");
}

function download_arquivos(){
  //  var filepath = $(this).attr('data-filepath');
  //  location.href = filepath;
	 var arquivo = $(this).data('id');
	 alert(arquivo);
	 var diretorio = window.location.pathname.replace(/[^0-9]/g,'');
	// //alert("<%= Rails.root%>");
	// window.location.href = "/home/rafaelly/drive_progweb2/arquivos/"+diretorio+"/	"+ arquivo;
	 $.ajax({
	 	type: 'POST',
	 	data: {arquivo: arquivo, diretorio: diretorio},
	 	url: '/arquivos/download',
	 	dataType: "json",
	 })
}

function delete_arquivo(event){
	event.preventDefault();
	var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
	if (confirmation === true) {
		$.ajax({
			type: 'DELETE',
			url: '/arquivos/' + $(this).data('id')
		}).done(function( response ) {
			location.reload(true);
		});
	}else {
		return false;
	}
}


// LOGIN

function logar(){
  var login = $('#login_email').val(); 
  var senha =  $('#login_senha').val();
  if (login != "" && senha != "") {
    $.ajax({
      type: 'POST',
      data: {login: login, senha: senha},
      url: '/pessoas/logar',
      dataType:"json"
    }).done(function( response ) {
      if (response.entrar == true) {
      	localStorage.setItem("usuario", response.usuario);
      	home();
      } else {
        alert("Email ou senha inválidos");
      }
    });
  } else {
    alert("Preencha todas as informações");
  }
}

function sair(){
	localStorage.removeItem("usuario");
	$(location).attr('href', '/pessoas/login');
}

function home(){
	var usuario = localStorage.getItem("usuario");
	$.ajax({  
		type: 'POST',
		data: {id: usuario} ,
		dataType: 'json',
		url: '/diretorios/seu_diretorio/'
	}).done(function( response ) {
		console.log(response);
		$(location).attr('href', '/diretorios/ver_pasta/'+ response.id);
	}); 
}