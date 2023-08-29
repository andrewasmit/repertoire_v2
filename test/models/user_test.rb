require 'test_helper'
require 'faker'
require 'byebug'

class UserTest < ActiveSupport::TestCase
  
  test "User should have correct validations" do
    organization = Organization.create(name: 'Testing Organization')
    password = Faker::Lorem.characters(number: 10, min_alpha: 4, min_numeric: 1)
    username = Faker::Lorem.characters(number: 12, min_alpha: 8, min_numeric: 2)

    user = User.new
    user.username = username
    user.password = password
    user.password_confirmation = password
    user.email_address = username + '@gmail.com'
    user.organization_id = organization.id

    assert user.save, 'User should save if validations are correct.'
  end

  test 'User should not save if username length is less than 6.' do
    organization = Organization.create(name: 'Testing Organization')
    password = Faker::Lorem.characters(number: 10, min_alpha: 4, min_numeric: 1)
    username = Faker::Lorem.characters(number: 5, min_alpha: 1, min_numeric: 1)

    user = User.new
    user.username = username
    user.password = password
    user.password_confirmation = password
    user.email_address = username + '@gmail.com'
    user.organization_id = organization.id
    
    assert_not user.save, 'User should not save if username length is less than 6.'
  end

  test 'User should not save if password length is less than 6.' do
    organization = Organization.create(name: 'Testing Organization')
    password = Faker::Lorem.characters(number: 3, min_alpha: 1, min_numeric: 1)
    username = Faker::Lorem.characters(number: 8, min_alpha: 1, min_numeric: 1)

    user = User.new
    user.username = username
    user.password = password
    user.password_confirmation = password
    user.email_address = username + '@gmail.com'
    user.organization_id = organization.id
    
    assert_not user.save, 'User should not save if password length is less than 6.'
  end

  
  
end
