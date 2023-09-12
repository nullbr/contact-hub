# frozen_string_literal: true

class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :file

      t.integer :imageable_class, null: false
      t.integer :imageable_id, null: false

      t.index :imageable_class
      t.index :imageable_id

      t.timestamps
    end
  end
end
