Rails.application.routes.draw do
  resources :pessoas do
  	collection do
  		match "listagem", via: :get
  		match "verificar_login", via: :post
  		match "ver/:id", to: "pessoas#ver", via: :get
  	end
  end
end
