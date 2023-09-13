# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  before(:all) do
    @user1 = create(:user)
  end

  describe 'Associations' do
    it { should have_many(:contacts) }
  end

  describe 'Validations' do
    it 'is valid with valid attributes' do
      expect(@user1).to be_valid
    end

    it 'has a unique email' do
      user2 = build(:user, email: @user1.email)
      expect(user2).to_not be_valid
    end

    it 'is not valid without a password' do
      user2 = build(:user, password: nil)
      expect(user2).to_not be_valid
    end

    it 'is not valid without a first_name' do
      user2 = build(:user, first_name: nil)
      expect(user2).to_not be_valid
    end

    it 'is not valid without an email' do
      user2 = build(:user, email: nil)
      expect(user2).to_not be_valid
    end
  end
end
