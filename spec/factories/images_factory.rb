# frozen_string_literal: true

FactoryBot.define do
  # create a factory for image
  factory :image do
    file { Rack::Test::UploadedFile.new(Rails.root.join('spec/images/frog.jpeg'), 'image/jpg') }
    imageable_class { 'User' }
    imageable_id { (User.first || FactoryBot.create(:user)).id }
  end
end
