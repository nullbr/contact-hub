# frozen_string_literal: true

module Api
  module V1
    class LocationsController < ApiController
      before_action :verify_client
      before_action :set_location, only: %i[show update]

      # GET /locations
      # GET /locations.json
      def index
        @pagy, @locations = pagy(Location.search(params),
                                 items: params[:per_page] || 10)
      end

      # GET /locations/1
      # GET /locations/1.json
      def show; end

      # POST /locations
      # POST /locations.json
      def create
        if find_or_create_location
          render :show, status: :created
        else
          render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /locations/1
      # PATCH/PUT /locations/1.json
      def update
        if @location.update(location_params)
          render :show
        else
          render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_location
        @location = Location.find_by(id: params[:id] || params[:location_id])

        return if @location.present?

        render json: { errors: ['Região não encontrada'] }, status: :not_found
      end

      # Only allow a list of trusted parameters through.
      def location_params
        location_params = params.require(:location).permit(:address, :city, :state, :country, :zip_code, :latitude, :longitude)

        location_params[:city] = location_params[:city].downcase if location_params[:city].present?
        location_params[:state] = location_params[:state]&.downcase if location_params[:state].present?

        location_params
      end

      def find_or_create_location
        # check if location already exists or create a new one
        @location = Location.find_by(state: location_params[:state], city: location_params[:city]) ||
                    Location.new(location_params)

        # update coordinates
        @location.latitude = location_params[:latitude]
        @location.longitude = location_params[:longitude]

        # return true if location is valid
        @location.save
      end
    end
  end
end
