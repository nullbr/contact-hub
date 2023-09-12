# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

gem 'rails', '~> 7.0.6'

gem 'bootsnap', require: false
gem 'carrierwave', '>= 3.0.0.rc', '< 4.0'
gem 'csv'
gem 'devise', '~> 4.8'
gem 'doorkeeper', '~> 5.5'
gem 'doorkeeper-i18n'
gem 'dotenv-rails', '~> 2.7.6'
gem 'geocoder', '~> 1.8'
gem 'importmap-rails'
gem 'jbuilder'
gem 'neighbor', '~> 0.3.0'
gem 'pagy', '~> 6.0'
gem 'pdf-reader', '~> 2.11'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'rack-cors', '~> 1.1'
gem 'redis', '~> 4.0'
gem 'rswag-api'
gem 'rswag-ui'
gem 'ruby-openai', '~> 5.1'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'swagger-blocks', '~> 3.0'
gem 'tailwindcss-rails', '~> 2.0'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'brakeman'
  gem 'bundler-audit'
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'faker', require: false
  gem 'rspec-rails'
  gem 'rswag-specs'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rspec'
  gem 'ruby_audit'
  gem 'simplecov', '~> 0.13.0', require: false
end

group :development do
  gem 'bcrypt_pbkdf', '1.1.0'
  gem 'easy_translate', '~> 0.5.1'
  gem 'ed25519', '1.3.0'
  gem 'fileutils', '1.7.1'
  gem 'htmlbeautifier', '~> 1.4'
  gem 'i18n-tasks', '~> 0.9.30'
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'factory_bot_rails'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
  gem 'webdrivers'
end

group :assets do
  gem 'uglifier', '~> 4.2'
end
