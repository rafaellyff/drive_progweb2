class CreateDiretorios < ActiveRecord::Migration[5.2]
  def change
    create_table :diretorios do |t|
      t.string :nome
      t.references :pessoa, foreign_key: true
      t.integer :diretorio_id

      t.timestamps
    end
  end
end
