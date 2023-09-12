# frozen_string_literal: true

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  # process resize_to_limit: [800, 800]

  # version :thumb do
  #   process resize_to_limit: [280, 280]
  # end

  # def default_url
  #   '/images/fallback/default.png'
  # end

  def extension_allowlist
    %w[jpg jpeg png]
  end

  def store_dir
    "uploads/images/#{model.imageable_class.to_s.underscore}/#{model.imageable_id}"
  end
end
