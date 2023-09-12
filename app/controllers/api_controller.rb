# frozen_string_literal: true

class ApiController < ApplicationController
  # equivalent of authenticate_user! on devise, but this one will check the oauth token
  # before_action :authenticate_user!
  before_action :doorkeeper_authorize!

  # Skip checking CSRF token authenticity for API requests.
  skip_before_action :verify_authenticity_token

  # Set response type
  respond_to :json

  # helper method to access the current user from the token
  def current_user
    return unless doorkeeper_token

    @current_user ||= User.find_by(id: doorkeeper_token[:resource_owner_id])
  end

  # helper method to get users default location
  def current_location
    return unless current_user

    @current_location ||= current_user.default_location
  end

  # Ensures client id is passed in the header and
  # matches the one from the access token
  def verify_client
    uid = request.headers['Client']
    @client ||= Doorkeeper::Application.find_by(uid:)

    return @client if @client && doorkeeper_token.application == @client

    render json: { errors: ['Você não está autorizado a acessar o conteúdo desta página'] }, status: :unauthorized
  end
end
