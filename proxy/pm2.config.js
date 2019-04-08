module.exports = {
  apps: [
    {
      name: 'checkmoney-proxy',
      script: 'index.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
      merge_logs: true,
      env_production: { NODE_ENV: 'production' },
    },
  ],
}
