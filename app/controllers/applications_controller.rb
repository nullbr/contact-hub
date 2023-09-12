# frozen_string_literal: true

class ApplicationsController < ApplicationController
  before_action :require_signin
  before_action :require_admin

  def index
    @applications = Doorkeeper::Application.all
  end
end
