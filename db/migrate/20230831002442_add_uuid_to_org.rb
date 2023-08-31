class AddUuidToOrg < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :uuid, :string
  end
end
