# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins Rails.env.production? ? 'https://contact-hub.vercel.app' : 'http://localhost:5173'
    resource '/api/v1/*',
             headers: :any,
             methods: %i[get post patch put delete]
  end
end
