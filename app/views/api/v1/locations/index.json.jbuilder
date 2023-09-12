# frozen_string_literal: true

json.locations do
  json.array! @locations, partial: 'api/v1/locations/location', as: :location
end
