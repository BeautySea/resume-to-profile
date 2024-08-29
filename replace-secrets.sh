#!/bin/bash

source get-secret.sh

# Use the variable in the sed command

sed -i "s/OPENAI_ORGANIZATION_ID/${OPENAI_ORGANIZATION_ID}/g" /var/www/resume/src/utils/openai.ts

sed -i "s/OPENAI_API_KEY/${OPENAI_API_KEY}/g" /var/www/resume/src/utils/openai.ts
