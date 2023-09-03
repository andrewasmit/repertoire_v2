require 'faker'
puts 'Seeding db 🌱'

org = Organization.create(name: 'Smit School of Percussion')
me = User.create(
  username: 'andrewasmit',
  password: '123456',
  password_confirmation: '123456',
  email_address: 'fake@email.com',
  organization_id: org.id,
  is_admin: true
)

june_bug = Piece.create(
  title: 'June Bug',
  composer: 'Andrew Smit',
  number_of_players: 1,
  genre: 'solo',
  difficulty: 2,
  reference_recording: 'https://www.youtube.com/watch?v=kwUETmmisKY'
)

note = Note.create(
  piece_id: june_bug.id,
  user_id: me.id,
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

performance = Performance.create(
  piece_id: june_bug.id,
  ensemble_id: ensemble.id,
  concert_id: concert.id
)

puts 'Finished seeding db ✅'