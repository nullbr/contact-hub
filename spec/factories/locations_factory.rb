# frozen_string_literal: true

FactoryBot.define do
  # create a factory for location
  factory :location do
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    country { Faker::Address.country }
    zip_code { Faker::Address.zip_code }
    latitude { Faker::Address.latitude * rand(0.0..1.0) }
    longitude { Faker::Address.longitude * rand(0.0..1.0) }
  end
end
