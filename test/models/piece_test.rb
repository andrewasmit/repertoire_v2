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
    byebug

    assert piece.save,  "Piece should save with correct validations"
  end
end
