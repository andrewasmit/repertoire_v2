require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "User should have correct validations" do
    user = User.new(
      username: 'andrewasmit', 
      password:'123456789', 
      password_confirmation:'123456789', 
      email_address:'andrewasmit@hotmail.com'
    )
    assert user
  end
end
