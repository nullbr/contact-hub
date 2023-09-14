# frozen_string_literal: true

json.extract! contact, :id, :name, :cpf, :phone_number, :created_at, :updated_at

json.location do
  json.partial! 'api/v1/locations/location', location: contact.location
end

json.user do
  json.partial! 'api/v1/users/info', user: contact.user
end
