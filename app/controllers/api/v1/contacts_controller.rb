# frozen_string_literal: true

module Api
  module V1
    class ContactsController < ApiController
      before_action :verify_client
      before_action :set_contact, only: %i[show update destroy]
      before_action :set_location, only: %i[create update]

      # GET /contacts
      # GET /contacts.json
      def index
        all_contacts = current_user.contacts.search(params)
        @pagy, @contacts = pagy(all_contacts, items: params[:per_page] || 15,
                                              page: params[:page] || 1)
      end

      # GET /contacts/1
      # GET /contacts/1.json
      def show; end

      # POST /contacts
      # POST /contacts.json
      def create
        @contact = Contact.new(contact_params)

        if @contact.save
          render :show, status: :created
        else
          render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /contacts/1
      # PATCH/PUT /contacts/1.json
      def update
        if @contact.update(contact_params)
          render :show, status: :ok
        else
          render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /contacts/1
      def destroy
        @contact.destroy
      end

      # PUT /contacts/destroy_multiple
      def destroy_multiple
        # verify that ids is an array of integers
        contacts = Contact.where(id: params[:ids])

        if contacts.destroy_all
          render json: {}, status: :ok
        else
          render json: { errors: ['Ocorreu um erro ao excluir os contatos selecionados'] }, status: :unprocessable_entity
        end
      end

      private

      def contact_params
        params.require(:contact).permit(:name, :phone_number, :cpf).merge(user_id: current_user.id, location_id: @location.id)
      end

      def location_params
        params.require(:location).permit(:address, :city, :state, :country, :longitude, :latitude, :zip_code)
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_contact
        @contact = Contact.includes(:location, :user).find_by(id: params[:id] || params[:contact_id])

        return if @contact.present?

        render json: { errors: ['Contato não encontrado'] }, status: :not_found
      end

      def set_location
        @location = Location.find_or_create_by(location_params)

        return unless @location.errors.any?

        render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
