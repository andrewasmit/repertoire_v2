class User < ApplicationRecord
  has_secure_password

  belongs_to :organization
  has_many :notes

  validates_presence_of :username, :password, :password_confirmation, :email_address, :is_admin
  validates_length_of :username, :email_address, maximum: 50
  validates_length_of :username, :email_address, :password, minimum: 6
  validates_format_of :email_address, with: URI::MailTo::EMAIL_REGEXP
  validates_uniqueness_of :username, :email_address
end
