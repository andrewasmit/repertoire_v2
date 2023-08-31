class Concert < ApplicationRecord
  has_many :performances
  has_many :pieces, through: :performances

  validates_presence_of :title, :year, :organization_id
end
