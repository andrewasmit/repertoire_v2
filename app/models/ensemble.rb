class Ensemble < ApplicationRecord
  has_many :performances, dependent: :destroy
  has_many :concerts, through: :performances
  belongs_to :organization

  validates_presence_of :organization_id, :grade_level, :name
end
