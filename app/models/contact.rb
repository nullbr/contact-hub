# frozen_string_literal: true

class Contact < ApplicationRecord
  belongs_to :location

  validates :name, presence: true
  validates :phone_number, format: { with: /\A[0-9]{0,11}\z/, message: 'apenas números' }
end
