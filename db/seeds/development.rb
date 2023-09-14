# frozen_string_literal: true

require 'faker'

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'Contact Hub Web', redirect_uri: '',
                                  scopes: '')
end

# add user if there is no user
if User.count.zero?
  User.create!(
    email: 'bmarianoleite4@gmail.com',
    password: '11111111',
    first_name: 'Bruno',
    last_name: 'Leite',
    role: :admin
  )

  User.create!(
    email: 'bmarianoleite3@gmail.com',
    password: '11111111',
    first_name: 'Bruno2',
    last_name: 'Leite',
    role: :user
  )
end

# add locations if there is no location
if Location.count.zero?
  locations = Array.new(100) do
    {
      address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      country: Faker::Address.country,
      zip_code: Faker::Address.zip_code,
      latitude: Faker::Address.latitude,
      longitude: Faker::Address.longitude
    }
  end

  Location.create!(locations)
end

# add contacts if there is no contact
if Contact.count.zero?
  contacts = Array.new(100) do
    {
      name: Faker::Name.name,
      cpf: Faker::IDNumber.brazilian_citizen_number,
      phone_number: Faker::Number.number(digits: 11),
      user_id: User.all.sample.id,
      location_id: Location.all.sample.id
    }
  end

  Contact.create!(contacts)
end
