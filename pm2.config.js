module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/bin/www.js",
      instances: 1,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
