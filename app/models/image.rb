# frozen_string_literal: true

class Image < ApplicationRecord
  mount_uploader :file, ImageUploader

  enum imageable_class: { User: 0 }

  validates :file, :imageable_class, :imageable_id, presence: true

  before_destroy :nullify_imageable
  after_destroy :remove_file_directory

  def url
    return unless file

    "#{Rails.application.config.server_host}#{file.url}"
  end

  private

  def remove_file_directory
    FileUtils.remove_dir(Rails.root.join("public/#{file.store_dir}").to_s, force: true)
  end

  def nullify_imageable
    imageable_class.constantize.find(imageable_id).update(image_id: nil)
  end
end
