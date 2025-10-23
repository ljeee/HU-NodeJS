module.exports = {
  apps: [
    {
      name: 'tin-app',
      script: './dist/app.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
    },
  ],
};