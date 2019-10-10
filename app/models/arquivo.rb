class Arquivo < ApplicationRecord
	def self.upload_arquivo(arquivo, diretorio)
		FileUtils.mkdir(diretorio) unless File.exists?(diretorio)
		File.open(File.join(diretorio, arquivo.split('C:\\fakepath\\')[1]), "wb") { |f| f.write{arquivo.read} }
		
	end
end
