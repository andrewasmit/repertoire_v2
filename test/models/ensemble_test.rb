require "test_helper"
require 'faker'

class EnsembleTest < ActiveSupport::TestCase

  test 'Ens should save with correct validations.' do
    organization = Organization.create(name: 'Testing Organization')

    ens = Ensemble.new
    ens.organization_id = organization.id
    ens.name = Faker::Lorem.characters(number: 5, min_alpha: 3, min_numeric: 1)
    ens.grade_level = Faker::Lorem.characters(number: 5, min_alpha: 3, min_numeric: 1)

    
    assert ens.save, 'Ens should save with correct validations.'
  end

end
