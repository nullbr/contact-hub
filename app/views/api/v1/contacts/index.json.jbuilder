# frozen_string_literal: true

json.contacts do
  json.array! @contacts, partial: 'api/v1/contacts/contact', as: :contact
end

json.partial! 'api/v1/shared/pagination', pagy: @pagy

json.ids @contacts.pluck(:id)
