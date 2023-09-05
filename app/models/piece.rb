class Piece < ApplicationRecord
  has_many :notes
  has_many :performances
  has_many :concerts, through: :performances
  belongs_to :organization

  validates_presence_of :title, :composer
end
