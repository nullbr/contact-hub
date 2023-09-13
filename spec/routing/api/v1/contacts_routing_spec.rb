# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/contacts').to route_to('api/v1/contacts#index')
    end

    it 'routes to #show' do
      expect(get: '/api/v1/contacts/1').to route_to('api/v1/contacts#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/v1/contacts').to route_to('api/v1/contacts#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/v1/contacts/1').to route_to('api/v1/contacts#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/contacts/1').to route_to('api/v1/contacts#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/contacts/1').to route_to('api/v1/contacts#destroy', id: '1')
    end

    it 'routes to #destroy_multiple' do
      expect(put: '/api/v1/contacts/destroy_multiple').to route_to('api/v1/contacts#destroy_multiple')
    end
  end
end
