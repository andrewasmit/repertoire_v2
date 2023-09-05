class RemoveOrgIdFromPerformanceTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :performances, :organization_id
  end
end
