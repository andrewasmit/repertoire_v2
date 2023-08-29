class Piece < ApplicationRecord
  has_many :notes
  has_many :performances
  has_many :concerts, through: :performances

  validates_presence_of :title, :composer, :number_of_players, :difficulty, :genre
end
