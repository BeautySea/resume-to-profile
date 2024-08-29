#!/bin/bash

# Define the secret name and the AWS region
secret_name="Frank_QuickApply_Creds"
region="us-east-1"

# Retrieve the secret value
OPENAI_ORGANIZATION_ID=$(aws secretsmanager get-secret-value --secret-id "$secret_name" --region "$region" --query 'SecretString' --output text| jq .OPENAI_ORGANIZATION_ID | tr -d '"')
OPENAI_API_KEY=$(aws secretsmanager get-secret-value --secret-id "$secret_name" --region "$region" --query 'SecretString' --output text| jq .OPENAI_API_KEY | tr -d '"')

# Check if the retrieval was successful
if [ $? -eq 0 ]; then
    echo "Secret retrieved successfully."

    # Export secrets variables
    
    export OPENAI_ORGANIZATION_ID="$OPENAI_ORGANIZATION_ID"
    export OPENAI_API_KEY="$OPENAI_API_KEY"
else
    echo "Failed to retrieve the secret."
    exit 1
fi
