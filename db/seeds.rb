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

puts 'Finished seeding db ✅'