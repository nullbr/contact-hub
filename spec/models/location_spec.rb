# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Location, type: :model do
  it { should have_many(:contacts).dependent(:destroy) }
  it { should validate_presence_of(:city) }
  it { should validate_presence_of(:state) }
  it { should validate_presence_of(:zip_code) }
  it { should validate_numericality_of(:latitude) }
  it { should validate_numericality_of(:longitude) }

  describe 'validations' do
    it 'validates that latitude is between -90 and 90' do
      location = Location.new(latitude: 100, longitude: 50)
      location.valid?
      expect(location.errors[:latitude]).to include('Latidude deve ser entre -90 e 90')
    end

    it 'validates that longitude is between -180 and 180' do
      location = Location.new(latitude: 40, longitude: 200)
      location.valid?
      expect(location.errors[:longitude]).to include('Longitude deve ser entre -180 e 180')
    end
  end

  describe '.search' do
    it 'returns locations with a matching city or state' do
      location1 = create(:location, city: 'Los Angeles', state: 'California')
      location2 = create(:location, city: 'New York', state: 'New York')

      result = Location.search(search: 'Los')
      expect(result).to include(location1)
      expect(result).not_to include(location2)
    end

    it 'returns all locations when no search term is provided' do
      location1 = create(:location, city: 'Los Angeles', state: 'California')
      location2 = create(:location, city: 'New York', state: 'New York')

      result = Location.search({})
      expect(result).to include(location1, location2)
    end
  end
end
