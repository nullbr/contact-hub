# frozen_string_literal: true

class Location < ApplicationRecord
  has_many :contacts, dependent: :destroy

  validates :address, :city, :state, :zip_code, presence: true
  validates :latitude, :longitude, numericality: true

  validate :coordinates_are_valid

  scope :with_name, ->(name) { where('city ILIKE ? OR state ILIKE ?', "%#{name}%", "%#{name}%") if name.present? }

  def self.search(params = {})
    sort_column = :city

    sort_direction = :asc

    with_name(params[:search])
      .order(sort_column => sort_direction)
  end

  private

  def coordinates_are_valid
    return if latitude.nil? || longitude.nil?

    errors.add(:latitude, 'Latidude deve ser entre -90 e 90') unless latitude.between?(-90, 90)
    errors.add(:longitude, 'Longitude deve ser entre -180 e 180') unless longitude.between?(-180, 180)
  end
end
