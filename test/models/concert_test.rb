require "test_helper"
require 'faker'

class ConcertTest < ActiveSupport::TestCase

  test "Concert should save with correct validations" do
    organization = Organization.create(name: 'Testing Organization')

    concert = Concert.new
    concert.title = Faker::Books::CultureSeries.book
    concert.organization_id = organization.id
    concert.year = 2023
    byebug

    assert concert.save, "Concert should save with correct validations"
  end

end
