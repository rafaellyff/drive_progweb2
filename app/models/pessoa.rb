class Pessoa < ApplicationRecord

	def self.email_disponivel(email)
		if self.where(login: email).blank?
			return true
		else
			return false
		end
	end
end
