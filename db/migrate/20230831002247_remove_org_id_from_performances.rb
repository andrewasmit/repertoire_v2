class RemoveOrgIdFromPerformances < ActiveRecord::Migration[7.0]
  def change
    remove_column :performances, :organization_id, :number
  end
end
