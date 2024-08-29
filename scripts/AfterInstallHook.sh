#!/bin/bash
cd /var/www/resume/
sudo chmod +x get-secret.sh
sudo chmod +x replace-secrets.sh
sudo chmod +x install.sh
sudo ./get-secret.sh
sudo ./replace-secrets.sh
# sudo ./install.sh
# # npm install
# # npm run build
# nohup npm run start 2>/dev/null 1>/dev/null&
