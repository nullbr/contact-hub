# frozen_string_literal: true

FactoryBot.define do
  factory :doorkeeper_application, class: 'Doorkeeper::Application' do
    Faker::Config.locale = 'pt-BR'
    name { 'Example Client' }
    redirect_uri { '' }
    scopes { '' }
  end
end
