class Pessoa < ApplicationRecord

	def self.email_disponivel(email)
		if self.where(login: email).blank?
			return true
		else
			return false
		end
	end

	def self.validar_sessao(email,senha)
		sessao = self.where(login: email, senha: senha)
		if sessao.blank?
			return {entrar: false, usuario: nil}
		else
			return {entrar: true, usuario: sessao.first.id}
		end
	end
end
