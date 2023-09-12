# frozen_string_literal: true

class FileUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  def extension_whitelist
    %w[pdf csv]
  end

  def store_dir
    "uploads/files/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
