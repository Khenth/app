module.exports = {
    apps : [{
      name: "sunday-api",
      script: "./app.js",
      watch: true,
      max_memory_restart: 2000,
      exec_mode: "cluster",
      instances: 1,
      cron_restart: "59 23 * * *",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }