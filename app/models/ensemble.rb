class Ensemble < ApplicationRecord
  has_many :performances
  has_many :concerts, through: :performances
  belongs_to :organization

  validates_presence_of :organization_id, :name, :grade_level
end
