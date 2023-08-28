class Note < ApplicationRecord
  belongs_to :piece
  belongs_to :user
end
