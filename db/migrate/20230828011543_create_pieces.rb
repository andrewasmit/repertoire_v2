class CreatePieces < ActiveRecord::Migration[7.0]
  def change
    create_table :pieces do |t|
      t.string :title
      t.string :composer
      t.integer :number_of_players
      t.string :genre
      t.integer :difficulty

      t.timestamps
    end
  end
end
