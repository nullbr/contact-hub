# frozen_string_literal: true

class Contact < ApplicationRecord
  belongs_to :location
  belongs_to :user

  validates :name, presence: true
  validates :phone_number, format: { with: /\A[0-9]{0,11}\z/, message: 'apenas números' }

  # Search by name or cpf
  scope :with_name, ->(query) { where('contacts.name ILIKE ? or contacts.cpf ILIKE ?', "%#{query}%", "%#{query}%") if query.present? }

  def self.search(params = {})
    associations = { 'state' => 'locations.state', 'city' => 'locations.city' }

    sort_column = params[:sort].presence_in(%w[id name phone_number city state]).presence || :name

    sort_column = associations[sort_column] || sort_column

    sort_direction = params[:direction].presence_in(%w[asc desc]).presence || :asc

    includes(:location, :user)
      .with_name(params[:search])
      .order(sort_column => sort_direction)
  end
end
