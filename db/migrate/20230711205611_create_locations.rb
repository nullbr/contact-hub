# frozen_string_literal: true

class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.integer :zip_code, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false

      t.timestamps
    end
  end
end
