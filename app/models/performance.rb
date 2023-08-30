class Performance < ApplicationRecord
  belongs_to :ensemble
  belongs_to :piece
  belongs_to :concert 

  validates_presence_of :piece_id, :concert_id, :ensemble_id
end
