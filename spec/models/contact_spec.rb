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

  describe 'scopes' do
    it 'should return contacts with name or cpf' do
      contact = create(:contact, name: 'John Doe', cpf: '12345678901')
      create(:contact, name: 'Jane Doe', cpf: '98765432109')

      expect(Contact.with_name('John Doe')).to eq([contact])
      expect(Contact.with_name('12345678901')).to eq([contact])
    end
  end

  describe 'custom methods' do
    before do
      10.times do |i|
        create(:contact, name: "Contact #{i}")
      end
    end

    it 'should return contacts ordered by name' do
      contact = Contact.order(:name).first

      expect(Contact.search.first).to eq(contact)
    end

    it 'should return contacts ordered by cpf' do
      contact = Contact.order(:cpf).first
      expect(Contact.search({ sort: 'cpf' }).first).to eq(contact)
    end
  end
end
