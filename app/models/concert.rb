class Concert < ApplicationRecord
  has_many :performances
  has_many :pieces, through: :performances
  belongs_to :organization

  validates_presence_of :title, :year, :organization_id
end
