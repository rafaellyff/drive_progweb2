Rails.application.routes.draw do
	resources :diretorios do
		collection do
			match "sub_pastas", via: :post
			match "seu_diretorio", via: :post
			match "ver_pasta/:id", to: "diretorios#ver_pasta", via: :get
		end
	end
	resources :pessoas do
		collection do
			match "listagem", via: :get
			match "verificar_login", via: :post
			match "ver/:id", to: "pessoas#ver", via: :get

  		# TELA DE LOGIN
  		match "login", via: :get
  		match "logar", via: :post
  	end
  end

  match "arquivos/upload_arquivo", via: :post
  match "arquivos/listagem_arquivos", via: :get
  match "arquivos/download", via: :post 
  match "arquivos/:id" , to: "arquivos#deletar" , via: :DELETE
  root to: "pessoas#login"
end
