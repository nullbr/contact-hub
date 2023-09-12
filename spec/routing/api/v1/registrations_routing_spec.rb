# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Users::RegistrationsController, type: :routing do
  describe 'routing' do
    it 'routes to #me' do
      expect(get: 'api/v1/users/me').to route_to('api/v1/users/registrations#me')
    end

    it 'routes to #create' do
      expect(post: 'api/v1/users').to route_to('api/v1/users/registrations#create')
    end

    it 'routes to #edit via PATCH' do
      expect(patch: 'api/v1/users').to route_to('api/v1/users/registrations#edit')
    end

    it 'routes to #update_password via PATCH' do
      expect(patch: 'api/v1/users/update_password').to route_to('api/v1/users/registrations#update_password')
    end

    it 'routes to #update_avatar via PATCH' do
      expect(patch: 'api/v1/users/update_avatar').to route_to('api/v1/users/registrations#update_avatar')
    end
  end
end
