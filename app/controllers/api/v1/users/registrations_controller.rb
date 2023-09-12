# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApiController
        skip_before_action :doorkeeper_authorize!, only: %i[create]
        before_action :verify_client, except: %i[create]

        include DoorkeeperRegisterable

        # GET /me.json
        def me
          @user = current_user

          if @user.nil?
            render json: { errors: ['Não autorizado'] }, status: :unauthorized
          else
            render :edit
          end
        end

        # POST /users -> CREATE
        def create
          client_app = Doorkeeper::Application.find_by(uid: params[:client_id])

          unless client_app
            return render json: { errors: [I18n.t('doorkeeper.errors.messages.invalid_client')] },
                          status: :unauthorized
          end

          @user = User.new(user_params)

          if @user.save
            generate_access_token(@user, client_app)
            render :show, status: :created
          else
            render json: { errors: @user.errors.messages }, status: :unprocessable_entity
          end
        end

        # PATCH /users -> EDIT
        def edit
          @user = current_user

          return if @user.update_without_password(user_params)

          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end

        # PATCH /users/update_password -> UPDATE
        def update_password
          user = current_user

          allowed_params = %i[current_password password password_confirmation]

          if user.update_with_password(user_params.permit(allowed_params))
            render json: {}, status: :ok
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        end

        # PATCH /users/update_avatar -> UPDATE
        def update_avatar
          @user = current_user

          @user.image&.destroy!

          image = Image.new(file: params[:image], imageable_class: 'User', imageable_id: @user.id)

          @user.image = image

          if image.save && @user.save
            render :edit, status: :ok
          elsif image.errors.any?
            render json: { errors: image.errors.full_messages }, status: :unprocessable_entity
          else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def user_params
          params.require(:registration).permit(
            :email, :first_name, :last_name, :password, :password_confirmation, :current_password, :default_location_id
          )
        end
      end
    end
  end
end
