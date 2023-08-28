class Organization < ApplicationRecord
  has_many :users
  has_many :ensembles
  has_many :concerts
  has_many :performances, through: :concerts
end
