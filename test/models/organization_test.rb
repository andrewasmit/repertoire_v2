require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  test "Organizations should have a UUID auto-generated when initialized" do
    org = Organization.create(name:'Test Org')
    
    assert org.uuid, "Organizations should have a UUID auto-generated when initialized"
  end

  test "Organizations should not be able to save to db without a name" do
    org = Organization.new
    
    assert_not org.save, "Organizations should not be able to save to db without a name"
  end

end
