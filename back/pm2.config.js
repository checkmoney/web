module.exports = {
  apps: [
    {
      node_args: '--require ./tsconfig-paths-bootstrap.js',
      name: 'isapp-core',
      script: '../dist/back/back/src/main.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
      merge_logs: true,
      env_production: { NODE_ENV: 'production' },
    },
  ],
}
