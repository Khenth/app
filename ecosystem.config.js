module.exports = {
    apps : [{
      name: "sunday-api",
      script: "app.js",
      watch: true,
      max_memory_restart: 2000,
      exec_mode: "cluster",
      autorestart: true,
      instances: 1,
      cron_restart: "59 23 * * *",
      post_update: ["npm install"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }],

  // deploy : {     
  //   production : {
  //      "user" : "Khenth",
  //      "host" : ["212.83.163.175"],
  //      "ref"  : "origin/main",
  //      "repo" : "git@github.com:Khenth/app.git",
  //      "path" : "/home/sistemas/Documentos/dockersvolumes/nodejs/app",
  //      "post-deploy" : "npm install"
  //   }
  // }
};
