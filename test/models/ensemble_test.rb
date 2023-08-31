require "test_helper"

class EnsembleTest < ActiveSupport::TestCase

  test 'Ens should save with correct validations.' do
    organization = Organization.create(name: 'Testing Organization')

    ens = Ensemble.new
    ens.organization_id = organization.id
    ens.name = Faker::Educator.primary_school
    ens.grade_level = Faker::Lorem.characters(number: 1, min_alpha: 0, min_numeric: 1)
    
    assert ens.save, 'Ens should save with correct validations.'
  end

end
