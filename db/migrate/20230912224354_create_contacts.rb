# frozen_string_literal: true

class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :name, null: false
      t.string :cpf
      t.string :phone_number

      t.references :location, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
