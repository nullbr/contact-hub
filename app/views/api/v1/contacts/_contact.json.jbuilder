# frozen_string_literal: true

json.extract! contact, :id, :name, :cpf, :phone_number, :created_at, :updated_at

json.location do
  json.extract! contact.location, :id, :state, :city
end

json.user do
  json.extract! contact.user, :id, :first_name, :last_name, :email
end
