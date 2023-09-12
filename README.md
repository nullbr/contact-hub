# ContactHub - Contact Management Application

ContactHub is a web application that allows users to efficiently manage their list of contacts. It provides features for user registration, login/logout, contact management, address lookup via Via Cep, and integration with Google Maps. With ContactHub, you can keep your contacts organized and easily access their information.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Dev scripts](#dev-scripts)
- [Swagger Documentation](#swagger-documentation)
- [Testing](#run-tests)
- [License](#license)

## Features

- User Registration: Users can create an account to access the platform.
- User Authentication: Secure login and logout functionality.
- Contact Management: Users can add, edit, and delete their contacts.
- Address Lookup: A helpful tool to search for addresses using UF (state), city, and partial address.
- Contact Filtering: Easily find contacts by name or CPF (Brazilian tax ID).
- Google Maps Integration: View contact locations on a map.
- Account Deletion: Users can delete their own accounts, removing all associated data.

## Technologies Used

- Ruby on Rails: The backend framework for building the application.
- React: The frontend framework for this application.
- Tailwindcss: Styling utility classes.
- PostgreSQL: A relational database for storing user and contact data.
- Via Cep API: Used for address lookup during contact creation.
- Google Maps API: Integrated to display contact locations on a map.
- HTML, CSS, JavaScript: Frontend technologies for user interface.
- Git and GitHub: Version control and collaboration.
- [List any additional technologies or libraries used.]

## Getting Started

### Prerequisites

Before you can run ContactHub on your local machine, you'll need the following:

- Ruby: [Installation Guide](https://www.ruby-lang.org/en/documentation/installation/)
- Ruby on Rails: [Installation Guide](https://guides.rubyonrails.org/getting_started.html#installing-rails)
- PostgreSQL: [Installation Guide](https://www.postgresql.org/download/)
- Git: [Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Instalation

### Prerequisite:

- ruby 3.1.2
- rails 7.0.2
- postgreSQL
- imagemagick

### Developement:

1. Clone this repo
1. Install PostgreSQL in case you don't have it
1. Run `./bootstrap.sh`
1. `rspec` and make sure all tests pass
1. `rails s`
1. You can now try your REST services!

### Docker:

1. Have `docker` and `docker-compose` installed (You can check this by doing `docker -v` and `docker-compose -v`)
1. Run `bootstrap.sh` with the name of your project and the `-d` or `--for-docker` flag like `./bootstrap.sh -d`
1. Generate a secret key for the app by running `bin/web rake secret`, copy it and add it in your environment variables.
1. (Optional) If you want to deny access to the database from outside of the `docker-compose` network, remove the `ports` key in the `docker-compose.yml` from the `db` service.
1. (Optional) Run the tests to make sure everything is working with: `bin/rspec .`.
1. You can now try your REST services!

## Dev scripts

This template provides a handful of scripts to make your dev experience better!

- bin/bundle to run any `bundle` commands.
  - `bin/bundle install`
- bin/rails to run any `rails` commands
  - `bin/rails console`
- bin/web to run any `bash` commands
  - `bin/web ls`
- bin/rspec to run specs
  - `bin/rspec .`
- Generate Swagger Documentation
  - `bin/docs`

You don't have to use these but they are designed to run the same when running with docker or not.
To illustrate, `bin/rails console` will run the console in the docker container when running with docker and locally when not.

## Swagger Documentation

- Generate Swagger Documentation
  - `rails rswag:specs:swaggerize`

## Run Tests:

```Bash
bundle exec rubocop --parallel
bin/rake
```

## License

This project is licensed under the [MIT License](LICENSE).
