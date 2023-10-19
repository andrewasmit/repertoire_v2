require 'faker'
puts 'Seeding db 🌱'

org = Organization.create(name: 'Smit School of Percussion')
# test_org = Organization.create(name: 'This is a Test')

me = User.create(
  username: 'andrewasmit',
  password: '123456',
  password_confirmation: '123456',
  email_address: 'fake@email.com',
  organization_id: org.id,
  is_admin: true
)

test_user = User.create(
  username: 'Another Director in my Organization',
  password: '123456',
  password_confirmation: '123456',
  email_address: 'test@email.com',
  organization_id: org.id,
  is_admin: true
)

june_bug = Piece.create(
  title: 'June Bug',
  composer: 'Andrew Smit',
  number_of_players: 1,
  genre: 'solo',
  difficulty: 2,
  reference_recording: 'https://www.youtube.com/watch?v=kwUETmmisKY',
  organization_id: org.id
)

final_boss = Piece.create(
  title: 'The Final Boss',
  composer: 'Andrew Smit',
  number_of_players: 8,
  genre: 'ensemble',
  difficulty: 3,
  reference_recording: 'https://soundcloud.com/tapspacepublications/the-final-boss-andrew-smit',
  organization_id: org.id
)

note = Note.create(
  piece_id: june_bug.id,
  user_id: me.id,
  note: Faker::Lorem.paragraph
)

test_note = Note.create(
  piece_id: june_bug.id,
  user_id: test_user.id,
  note: Faker::Lorem.paragraph
)

concert = Concert.create(
  title: Faker::Show.adult_musical,
  year: 2023,
  organization_id: org.id
)

ensemble = Ensemble.create(
  organization_id: org.id,
  name: 'Beginner Percussion',
  grade_level: 6
)

ensemble2 = Ensemble.create(
  organization_id: org.id,
  name: 'Junior High Percussion',
  grade_level: 7
)

performance = Performance.create(
  piece_id: june_bug.id,
  ensemble_id: ensemble.id,
  concert_id: concert.id
)

performance2 = Performance.create(
  piece_id: final_boss.id,
  ensemble_id: ensemble2.id,
  concert_id: concert.id
)

puts 'Finished seeding db ✅'