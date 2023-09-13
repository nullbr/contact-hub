# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Contact, type: :model do
  describe 'associations' do
    it { should belong_to(:location) }

    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }

    it do
      should allow_value('1234567890').for(:phone_number)
      should allow_value('0987654321').for(:phone_number)
      should allow_value(nil).for(:phone_number)
      should_not allow_value('abc').for(:phone_number)
      should_not allow_value('12 345 678').for(:phone_number)
      should_not allow_value('123-456-7890').for(:phone_number)
      should_not allow_value('123456789011').for(:phone_number)
    end
  end

  describe 'factory' do
    it { expect(build(:contact)).to be_valid }
  end
end
