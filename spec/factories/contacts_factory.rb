# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    name { Faker::Name.name }
    phone_number { Faker::Number.number(digits: 11) }
    cpf { Faker::IDNumber.brazilian_citizen_number }

    user_id { FactoryBot.create(:user).id }
    location_id { FactoryBot.create(:location).id }
  end
end
