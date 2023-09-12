# frozen_string_literal: true

require 'faker'

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'Contact Hub Web', redirect_uri: '',
                                  scopes: '')
end

# add user if there is no user
if User.count.zero?
  User.create!(
    email: 'bmarianoleite4@gmail.com',
    password: '11111111',
    first_name: 'Bruno',
    last_name: 'Leite',
    role: :admin
  )

  User.create!(
    email: 'bmarianoleite3@gmail.com',
    password: '11111111',
    first_name: 'Bruno2',
    last_name: 'Leite',
    role: :user
  )
end
