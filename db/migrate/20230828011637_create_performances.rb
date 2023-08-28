class CreatePerformances < ActiveRecord::Migration[7.0]
  def change
    create_table :performances do |t|
      t.integer :piece_id
      t.integer :ensemble_id
      t.integer :concert_id
      t.integer :organization_id

      t.timestamps
    end
  end
end
