# frozen_string_literal: true

class AddColumnsToUser < ActiveRecord::Migration[7.0]
  def change
    # add first_name and last_name columns to users table
    change_table :users, bulk: true do |t|
      t.integer :role, default: 0
      t.string :first_name, null: false, default: ''
      t.string :last_name
    end
  end
end
