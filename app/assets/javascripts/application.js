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


$(function (){
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
	if( window.location.pathname.match(/listagem/)){
		listagem();
	} else if ( window.location.pathname.match(/edit/)) {
		form_editar();
	} else if (window.location.pathname.match(/ver/)){
		preencherVer();
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
					$(location).attr('href', '/pessoas/ver/'+response.id);
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
	$(location).attr('href', '/pessoas/listagem');
}

// ABRIR TELA DE NOVO
function novo(){
	$(location).attr('href', '/pessoas/new');
}