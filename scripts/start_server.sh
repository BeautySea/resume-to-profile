#!/bin/bash

sudo su

# Navigate to the application directory
cd /var/www/resume/

# Start the application using PM2
/root/.nvm/versions/node/v21.6.1/bin/pm2 start pm2.config.js --env production

# Make sure the app restarts after reboot
/root/.nvm/versions/node/v21.6.1/bin/pm2 save
/root/.nvm/versions/node/v21.6.1/bin/pm2 startup
