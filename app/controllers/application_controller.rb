# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pagy::Backend

  private

  def require_signin
    return if user_signed_in?

    session[:intended_url] = request.url
    redirect_to new_user_session_path, alert: 'Você precisa estar logado para acessar essa página.'
  end

  def require_admin
    return if current_user.admin?

    reset_session
    redirect_to new_user_session_path, alert: 'Você não tem permissão para acessar essa página.'
  end
end
