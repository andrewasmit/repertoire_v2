class Piece < ApplicationRecord
  has_many :notes
  has_many :performances
  has_many :concerts, through: :performances
end
