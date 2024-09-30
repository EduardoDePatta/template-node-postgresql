module.exports = {
  apps: [
    {
      name: 'template-node-postgresql',
      script: './dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
