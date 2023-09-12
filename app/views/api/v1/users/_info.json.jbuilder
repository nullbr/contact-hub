# frozen_string_literal: true

json.id                   user.id
json.first_name           user.first_name.capitalize
json.last_name            user.last_name.capitalize
json.email                user.email
json.role                 user.role.titleize
json.created_at           user.created_at
json.updated_at           user.updated_at
json.avatar_url           user.image&.url
