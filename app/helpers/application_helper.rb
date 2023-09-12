# frozen_string_literal: true

module ApplicationHelper
  include Pagy::Frontend

  def check_if_admin
    return if current_user&.admin?

    respond_to do |format|
      format.json do
        render json: { errors: [t('activerecord.errors.models.user.attributes.role.not_admin')] },
               status: :unauthorized
      end
      format.html { redirect_to root_path, notice: t('activerecord.errors.models.user.attributes.role.not_admin') }
    end
  end
end
