# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      get '/me', to: 'registrations#me'
      post '/', to: 'registrations#create', as: :user_registration
      patch '/', to: 'registrations#edit', as: :edit_user
      delete '/', to: 'registrations#destroy', as: :destroy_user
      patch '/update_password', to: 'registrations#update_password'
      patch '/update_avatar', to: 'registrations#update_avatar'
    end

    resources :locations, only: %i[index show create update]
  end
end

scope :api do
  scope :v1 do
    use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
    end
  end
end
