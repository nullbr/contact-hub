# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Image, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:file) }
    it { should validate_presence_of(:imageable_class) }
    it { should validate_presence_of(:imageable_id) }
  end

  describe 'callbacks' do
    let(:image) { FactoryBot.create(:image) }

    it 'nullifies imageable association before destroy' do
      imageable = image.imageable_class.constantize.find(image.imageable_id)
      image.destroy
      expect(imageable.image_id).to eq(nil)
    end

    it 'removes the file directory after destroy' do
      file_path = image.file.path

      image.destroy
      expect(File.exist?(file_path)).to eq(false)
    end
  end

  describe 'methods' do
    let(:image) { FactoryBot.create(:image) }

    it 'returns the correct URL' do
      expected_url = "#{Rails.application.config.server_host}#{image.file.url}"
      expect(image.url).to eq(expected_url)
    end
  end
end
