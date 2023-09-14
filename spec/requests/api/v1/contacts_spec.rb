# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the contacts API
# rubocop:disable Metrics/BlockLength
describe 'Contact API' do
  before do
    token = create(:doorkeeper_access_token)
    @access_token = "Bearer #{token.token}"
    @client_id = token.application.uid
    @contact = create(:contact)
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
      let(:contact) {}
      let(:id) { 'invalid' }
      run_test!
    end
  end

  # GET /contacts
  # Get all contacts
  path '/contacts' do
    include_context 'common parameters'
    get 'Get all contacts' do
      tags 'Contact'
      security [Bearer: []]

      response '200', 'contacts found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        run_test!
      end
    end
  end

  # GET /contacts/:id
  # Get a contact by id
  path '/contacts/{id}' do
    include_context 'common parameters'
    parameter name: :id, in: :path, type: :string, required: true,
              description: 'ID of the contact'
    get 'Get a contact' do
      tags 'Contact'
      security [Bearer: []]

      response '200', 'contact found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { @contact.id }
        run_test!
      end

      response '404', 'contact not found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { 'invalid' }
        run_test!
      end

      include_context 'common responses'
    end
  end

  # POST /contacts
  # Create a contact
  path '/contacts' do
    include_context 'common parameters'
    post 'Create a contact' do
      tags 'Contact'
      consumes 'application/json', 'application/xml'
      security [Bearer: []]
      parameter name: :contact, in: :body, schema: {
        type: :object,
        properties: {
          contact: {
            name: { type: :string },
            cpf: { type: :string },
            phone_number: { type: :string },
            location_id: { type: :string },
            user_id: { type: :string }
          },
          location: {
            address: { type: :string },
            city: { type: :string },
            state: { type: :string },
            country: { type: :string },
            zip_code: { type: :string },
            latitude: { type: :string },
            longitude: { type: :string }
          }
        },
        required: %w[contact location]
      }

      response '201', 'contact created' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:contact) { { contact: attributes_for(:contact), location: attributes_for(:location) } }
        run_test!
      end

      include_context 'common responses'
    end
  end

  # PATCH /contacts/:id
  # Update a contact by id
  path '/contacts/{id}' do
    include_context 'common parameters'
    patch 'Update a contact' do
      tags 'Contact'
      consumes 'application/json', 'application/xml'
      security [Bearer: []]
      parameter name: :id, in: :path, type: :string, required: true,
                description: 'ID of the contact'
      parameter name: :contact, in: :body, schema: {
        type: :object,
        properties: {
          contact: {
            name: { type: :string },
            cpf: { type: :string },
            phone_number: { type: :string },
            location_id: { type: :string },
            user_id: { type: :string }
          },
          location: {
            address: { type: :string },
            city: { type: :string },
            state: { type: :string },
            country: { type: :string },
            zip_code: { type: :string },
            latitude: { type: :string },
            longitude: { type: :string }
          }
        },
        required: %w[contact location]
      }

      response '200', 'contact created' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { @contact.id }
        let(:contact) { { contact: attributes_for(:contact), location: attributes_for(:location) } }
        run_test!
      end

      include_context 'common responses'
    end
  end

  # DELETE /contacts/:id
  # Delete a contact by id
  path '/contacts/{id}' do
    include_context 'common parameters'
    parameter name: :id, in: :path, type: :string, required: true,
              description: 'ID of the contact'
    delete 'Delete a contact' do
      tags 'Contact'
      security [Bearer: []]

      response '204', 'contact deleted' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { @contact.id }
        run_test!
      end

      response '404', 'contact not found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:id) { 'invalid' }
        run_test!
      end

      include_context 'common responses'
    end

    # PUT /contacts/destroy_multiple
    # Destroy multiple contacts
    path '/contacts/destroy_multiple' do
      include_context 'common parameters'
      put 'Destroy multiple contacts' do
        tags 'Contact'
        security [Bearer: []]

        parameter name: :ids, in: :body, schema: {
                                           type: :object,
                                           properties: {
                                             ids: { type: :array, items: { type: :string } }
                                           }
                                         },
                  required: true, description: 'IDs of the contacts to be destroyed'

        response '200', 'contacts destroyed' do
          let(:Authorization) { @access_token }
          let(:Client) { @client_id }
          let(:accept) { 'application/json' }
          let(:ids) { [@contact.id] }
          run_test!
        end

        include_context 'common responses'
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
