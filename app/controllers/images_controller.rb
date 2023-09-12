# frozen_string_literal: true

class ImagesController < ApplicationController
  def show
    # Retrieve the requested image path from the URL parameters
    image_path = params[:path]
    root_path = Rails.root

    # Construct the full path to the image file
    full_path = File.join(root_path, 'uploads', image_path)

    # Check if the image file exists
    if File.exist?(full_path)
      # If the file exists, send it as a response
      send_file full_path, disposition: 'inline'
    else
      # If the file doesn't exist, return a 404 Not Found error
      render file: Rails.root.join('public/404.html').to_s, status: :not_found
    end
  end
end
