# frozen_string_literal: true

json.contact do
  json.partial! 'api/v1/contacts/contact', contact: @contact
end
