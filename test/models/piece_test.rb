require "test_helper"
require 'faker'

class PieceTest < ActiveSupport::TestCase

  test "Add Pieces w/ correct validations" do
    piece = Piece.new
    piece.composer = Faker::Name.name
    piece.title = Faker::Quote.yoda
    piece.difficulty = Faker::Number.between(from: 1, to: 5)
    piece.number_of_players = Faker::Number.between(from: 1, to: 12)
    piece.genre = Faker::Music.genre

    assert piece.save,  "Piece should save with correct validations"
  end

  test "Add Pieces w/ only the mandatory properties" do
    piece = Piece.new
    piece.composer = Faker::Name.name
    piece.title = Faker::Quote.yoda

    assert piece.save,  "Piece should save with only title and composer"
  end

  test "Add Pieces without correct validations" do
    piece = Piece.new
    piece.title = Faker::Quote.yoda
    piece.difficulty = Faker::Number.between(from: 1, to: 5)
    piece.number_of_players = Faker::Number.between(from: 1, to: 12)
    piece.genre = Faker::Music.genre

    assert_not piece.save,  "Piece should not save without a composer property added"
  end

end
