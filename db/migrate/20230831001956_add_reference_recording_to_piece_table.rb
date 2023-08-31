class AddReferenceRecordingToPieceTable < ActiveRecord::Migration[7.0]
  def change
    add_column :pieces, :reference_recording, :string
  end
end
