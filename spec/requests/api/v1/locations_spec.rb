# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the locations API
# rubocop:disable Metrics/BlockLength
describe 'Município API' do
  before do
    token = create(:doorkeeper_access_token)
    @access_token = "Bearer #{token.token}"
    @client_id = token.application.uid
    @location = create(:location)
  end

  # Set common parameters for all paths
  shared_context 'common parameters' do
    parameter name: :Authorization, in: :header, type: :string, required: true,
              description: 'Authorization token'
    parameter name: :accept, in: :header, type: :string, required: true,
              description: 'Accept header'
    parameter name: :Client, in: :header, type: :string, required: true,
              description: 'Client id'
  end

  # Set common responses for all paths
  shared_context 'common responses' do
    response '401', 'unauthorized' do
      let(:Authorization) { 'invalid' }
      let(:Client) { @client_id }
      let(:accept) { 'application/json' }
      let(:location) {}
      let(:id) { 'invalid' }
      run_test!
    end
  end

  # GET /locations
  # Get all locations
  path '/locations' do
    include_context 'common parameters'
    get 'Get all locations' do
      tags 'Município'
      security [Bearer: []]

      response '200', 'locations found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        run_test!
      end

      include_context 'common responses'
    end
  end

  # GET /locations/:id
  # Get a location by id
  path '/locations/{id}' do
    include_context 'common parameters'
    parameter name: :id, in: :path, type: :string, required: true,
              description: 'ID of the location'
    get 'Get a location' do
      tags 'Município'
      security [Bearer: []]

      response '200', 'location found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { @location.id }

        run_test!
      end

      response '404', 'location not found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { 'invalid' }

        run_test!
      end

      include_context 'common responses'
    end
  end

  # POST /locations
  # Create a location
  path '/locations' do
    include_context 'common parameters'
    post 'Create a location' do
      tags 'Município'
      consumes 'application/json', 'application/xml'
      security [Bearer: []]
      parameter name: :location, in: :body, schema: {
        type: :object,
        properties: {
          location: {
            city: { type: :string },
            state: { type: :string },
            country: { type: :string },
            zip_code: { type: :string },
            latitude: { type: :string },
            longitude: { type: :string }
          }
        },
        required: %w[city state country zip_code latitude longitude]
      }

      response '201', 'location created' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:location) { { location: attributes_for(:location) } }

        run_test!
      end

      include_context 'common responses'
    end

    # PATCH /locations/:id
    # Update Location
    path '/locations/{id}' do
      include_context 'common parameters'

      patch 'Update a location' do
        tags 'Município'
        consumes 'application/json', 'application/xml'
        security [Bearer: []]
        parameter name: :id, in: :path, type: :string, required: true,
                  description: 'ID of the location'
        parameter name: :location, in: :body, schema: {
          type: :object,
          properties: {
            location: {
              seats: { type: :integer },
              electoral_coefficient: { type: :integer }
            }
          },
          required: []
        }

        response '200', 'location updated' do
          let(:Authorization) { @access_token }
          let(:Client) { @client_id }
          let(:accept) { 'application/json' }
          let(:id) { @location.id }
          let(:location) { { location: { seats: 10, electoral_coefficient: 20 } } }

          run_test!
        end

        include_context 'common responses'
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
