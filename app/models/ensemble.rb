class Ensemble < ApplicationRecord
  has_many :performances
  has_many :concerts, through: :performances
  belongs_to :organization
end
