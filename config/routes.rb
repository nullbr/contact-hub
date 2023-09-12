# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  root 'applications#index'
  get '/uploads/*path' => 'images#show'

  use_doorkeeper
  devise_for :users

  draw :api

  resources :applications, only: %i[index]
end
