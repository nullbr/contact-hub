# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the users API
# rubocop:disable Metrics/BlockLength
describe 'Usuário API' do
  before do
    token = create(:doorkeeper_access_token)
    @access_token = "Bearer #{token.token}"
    @client_id = token.application.uid
    @client_secret = token.application.secret
    @user = create(:user)
  end

  # Set common parameters for all paths
  shared_context 'common parameters' do
    parameter name: :accept, in: :header, type: :string, required: true,
              description: 'Accept header'
  end

  # Set common responses for all paths
  shared_context 'common responses' do
    response '401', 'unauthorized' do
      let(:Authorization) { 'invalid' }
      let(:accept) { 'application/json' }
      let(:Client) { @client_id }
      let(:user) {}
      let(:image) { 'test' }

      run_test!
    end

    response '401', 'unauthorized' do
      let(:Authorization) { @access_token }
      let(:accept) { 'application/json' }
      let(:Client) { 'invalid' }
      let(:user) {}
      let(:image) { 'test' }

      run_test!
    end
  end

  # POST /users
  # Create a user
  path '/users' do
    include_context 'common parameters'
    post 'Create a user' do
      tags 'Usuário'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          registration: {
            email: { type: :string },
            first_name: { type: :string },
            last_name: { type: :string },
            password: { type: :string },
            password_confirmation: { type: :string },
            default_location_id: { type: :integer }
          },
          client_id: { type: :string },
          client_secret: { type: :string }
        },
        required: %w[email first_name last_name password password_confirmation default_location_id client_id client_secret]
      }

      response '201', 'user created' do
        let(:accept) { 'application/json' }
        let(:user) { { registration: attributes_for(:user), client_id: @client_id, client_secret: @client_secret } }
        run_test!
      end

      response '401', 'unauthorized' do
        let(:accept) { 'application/json' }
        let(:user) { { registration: {}, client_id: 'invalid', client_secret: 'invalid' } }

        run_test!
      end
    end
  end

  # GET /users/me
  # Get current user with access token
  path '/users/me' do
    include_context 'common parameters'
    get 'Get current user' do
      tags 'Usuário'
      consumes 'application/json'
      parameter name: :Client, in: :header, type: :string, required: true,
                description: 'Client id'
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'

      response '200', 'user found' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }

        run_test!
      end

      include_context 'common responses'
    end
  end

  # PATCH /users
  # Edit a user
  path '/users' do
    include_context 'common parameters'
    patch 'Edit a user' do
      tags 'Usuário'
      consumes 'application/json'
      security [Bearer: []]
      parameter name: :Client, in: :header, type: :string, required: true,
                description: 'Client id'
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          registration: {
            first_name: { type: :string },
            last_name: { type: :string },
            email: { type: :string }
          }
        },
        required: []
      }

      response '200', 'user edited' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:user) { { registration: { first_name: 'test', last_name: 'test', email: 'test@email.com' } } }

        run_test!
      end

      include_context 'common responses'
    end
  end

  # PATCH /users/update_password
  # Edit a user password
  path '/users/update_password' do
    include_context 'common parameters'
    patch 'Edit user password' do
      tags 'Usuário'
      consumes 'application/json'
      security [Bearer: []]
      parameter name: :Client, in: :header, type: :string, required: true,
                description: 'Client id'
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          registration: {
            current_password: { type: :string },
            password: { type: :string },
            password_confirmation: { type: :string }
          }
        },
        required: %w[current_password password password_confirmation]
      }

      response '200', 'user password edited' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:user) { { registration: { current_password: 'passwordtest', password: 'passwordtest2', password_confirmation: 'passwordtest2' } } }

        run_test!
      end

      include_context 'common responses'
    end
  end

  # PATCH /users/update_avatar
  # Edit a user avatar
  path '/users/update_avatar' do
    include_context 'common parameters'
    patch 'Edit user avatar' do
      tags 'Usuário'
      consumes 'application/json'
      security [Bearer: []]
      parameter name: :Client, in: :header, type: :string, required: true,
                description: 'Client id'
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :image, in: :formData, type: :file,
                required: true, description: 'New photo image for the user'
      consumes 'multipart/form-data'

      response '200', 'user avatar edited' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }
        let(:image) { Rack::Test::UploadedFile.new('spec/images/frog.jpeg', 'image/jpeg') }

        run_test!
      end

      include_context 'common responses'
    end
  end

  # DELETE /users
  # Delete current user
  path '/users' do
    include_context 'common parameters'
    delete 'Delete current user' do
      tags 'Usuário'
      consumes 'application/json'
      security [Bearer: []]
      parameter name: :Client, in: :header, type: :string, required: true,
                description: 'Client id'
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'

      response '200', 'user deleted' do
        let(:Authorization) { @access_token }
        let(:Client) { @client_id }
        let(:accept) { 'application/json' }

        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
