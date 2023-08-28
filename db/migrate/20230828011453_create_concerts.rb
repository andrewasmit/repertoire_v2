class CreateConcerts < ActiveRecord::Migration[7.0]
  def change
    create_table :concerts do |t|
      t.string :title
      t.integer :year
      t.integer :organization_id

      t.timestamps
    end
  end
end
