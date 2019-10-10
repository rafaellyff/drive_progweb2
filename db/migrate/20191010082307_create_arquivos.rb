class CreateArquivos < ActiveRecord::Migration[5.2]
  def change
    create_table :arquivos do |t|
      t.string :diretorio
      t.string :nome

      t.timestamps
    end
  end
end
