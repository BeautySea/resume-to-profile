import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

interface Credentials {
  readonly OPENAI_ORGANIZATION_ID: string;
  readonly OPENAI_API_KEY: string;
}

export let credentials = {} as unknown as Credentials;

export class AwsSecretManagerServices {
  private SecretId = process.env.AWS_SECRET_MANAGER_ID;
  private client = new SecretsManagerClient({
    region: process.env.AWS_REGION ?? "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  async getSecret() {
    const command = new GetSecretValueCommand({ SecretId: this.SecretId });
    const { SecretString, SecretBinary } = await this.client.send(command);
    credentials = JSON.parse(SecretString ?? SecretBinary?.toString() ?? "");
  }
}

// export const awsSecretManager = new AwsSecretManagerServices();
