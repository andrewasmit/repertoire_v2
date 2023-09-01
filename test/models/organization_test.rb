require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  test "Organizations should have a UUID auto-generated when initialized" do
    org = Organization.create(name:'Test Org')
    byebug
    
    assert org.uuid, "Organizations should have a UUID auto-generated when initialized"
  end
end
