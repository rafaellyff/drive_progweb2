class ArquivosController < ApplicationController

	def listagem_arquivos
		@arquivos = Arquivo.where(diretorio: params[:diretorio])
		render json: @arquivos
	end

	def upload_arquivo	
		@arquivo = Arquivo.new
		diretorio = "#{Rails.root}/public/arquivos/#{params[:diretorio]}"
		@arquivo.diretorio = params[:diretorio]
		Arquivo.upload_arquivo(params[:arquivo], diretorio)
		@arquivo.nome = params[:arquivo].split('C:\\fakepath\\')[1]
		@arquivo.save

		render json: @arquivo
	end

	def download
		@arquivo = Arquivo.find(params[:arquivo])
		render json: @arquivo
	end

	def deletar 
		arquivo = Arquivo.find(params[:id])
		path_to_file = "#{Rails.root}/arquivos/#{arquivo.diretorio}/#{arquivo.nome}"
		File.delete(path_to_file) if File.exist?(path_to_file)
		@arquivo = arquivo.destroy
		render json: @arquivo
	end

end
