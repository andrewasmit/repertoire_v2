class Organization < ApplicationRecord
  has_many :users
  has_many :ensembles
  has_many :concerts
  has_many :performances, through: :concerts

  validates_presence_of :name
end
