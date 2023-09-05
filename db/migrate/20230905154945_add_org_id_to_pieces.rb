class AddOrgIdToPieces < ActiveRecord::Migration[7.0]
  def change
    add_column :pieces, :organization_id, :integer
  end
end
