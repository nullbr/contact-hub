# frozen_string_literal: true

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'Contact Hub Web', redirect_uri: '',
                                  scopes: '')
end
