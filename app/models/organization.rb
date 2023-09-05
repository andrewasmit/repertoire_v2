class Organization < ApplicationRecord
  before_create :add_uuid

  has_many :users
  has_many :ensembles
  has_many :concerts
  belongs_to :organization

  validates_presence_of :name

  private
  def add_uuid
    self.uuid = SecureRandom.uuid
  end
  
end
