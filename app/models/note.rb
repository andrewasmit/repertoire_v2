class Note < ApplicationRecord
  belongs_to :piece
  belongs_to :user

  validates_presence_of :note, :piece_id, :user_id, 
end
