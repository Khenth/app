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
    }],

    deploy : {     
    production : {
       "user" : "Khenth",
      //  "host" : ["192.168.0.13", "192.168.0.14", "192.168.0.15"],
       "ref"  : "origin/main",
       "repo" : "https://github.com/Khenth/app.git",
       "path" : "/home/sistemas/Documentos/dockersvolumes/nodejs/app",
       "post-deploy" : "npm install"
    }
  }
};
