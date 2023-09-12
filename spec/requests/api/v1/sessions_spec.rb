# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the users API
# rubocop:disable Metrics/BlockLength
describe 'Sessão API' do
  before do
    token = create(:doorkeeper_access_token)
    @refresh_token = token.refresh_token
    @client_id = token.application.uid
    @client_secret = token.application.secret
    @user = create(:user)
  end

  # Set common parameters for all paths
  shared_context 'common parameters' do
    parameter name: :accept, in: :header, type: :string, required: true,
              description: 'Accept header'
  end

  # POST /oauth/token
  # Login a user
  path '/oauth/token' do
    include_context 'common parameters'
    post 'Login user with email and password' do
      tags 'Sessão'
      consumes 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string },
          grant_type: { type: :string },
          client_id: { type: :string },
          client_secret: { type: :string }
        },
        required: %w[email password client_id client_secret]
      }

      response '200', 'logged in' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { email: @user.email, password: 'passwordtest', grant_type: 'password',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '401', 'unauthorized' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { email: 'wrong@email', password: 'passwordtest', grant_type: 'password',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '401', 'unauthorized' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { email: @user.email, password: 'wrongpass', grant_type: 'password',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '401', 'unauthorized' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { email: @user.email, password: 'wrongpass', grant_type: 'password',
            client_id: 'invalid', client_secret: 'invalid' }
        end

        run_test!
      end

      # log in with refresh token
      response '200', 'logged in' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { refresh_token: @refresh_token, grant_type: 'refresh_token',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '401', 'unauthorized' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { refresh_token: 'invalid', grant_type: 'refresh_token',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end
    end
  end

  # POST /oauth/revoke
  # Logout a user
  path '/oauth/revoke' do
    post 'Logout user' do
      tags 'Sessão'
      consumes 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          token: { type: :string },
          grant_type: { type: :string },
          client_id: { type: :string },
          client_secret: { type: :string }
        },
        required: %w[token client_id client_secret]
      }

      response '200', 'logged in' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { token: @refresh_token,
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '403', 'forbiden' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { token: 'invalid',
            client_id: @client_id, client_secret: @client_secret }
        end

        run_test!
      end

      response '403', 'forbiden' do
        let(:accept) { 'application/json' }
        let(:credentials) do
          { token: 'invalid',
            client_id: 'invalid', client_secret: 'invalid' }
        end

        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
