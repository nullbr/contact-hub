#!/usr/bin/env bash

# Define the filename
envfile='.env.development'

# generate a .env from the sample file
cp .env.sample $envfile

# Add the env variables to file

# if [[ "$OSTYPE" == "darwin"* ]]; then
#       sed -i '' "s|sample_db_userl|${DATABASE_USER}|g" $envfile
# else
#       sed -i "s|sample_db_user|${DATABASE_USER}|g" $envfile
# fi
