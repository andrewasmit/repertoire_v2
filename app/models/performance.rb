class Performance < ApplicationRecord
  belongs_to :ensemble
  belongs_to :piece
  belongs_to :concert 
end
