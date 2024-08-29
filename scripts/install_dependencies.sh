#!/bin/bash

sudo su

# Navigate to the application directory
cd /var/www/resume/

# Use nvm to set node version
. ~/.nvm/nvm.sh
nvm use 18

# Install PM2 globally
npm install pm2@latest -g

# Install application dependencies
npm install

npm install -g typescript

npm run build
