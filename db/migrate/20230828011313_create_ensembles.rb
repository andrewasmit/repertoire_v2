class CreateEnsembles < ActiveRecord::Migration[7.0]
  def change
    create_table :ensembles do |t|
      t.integer :organization_id
      t.string :name
      t.string :grade_level

      t.timestamps
    end
  end
end
