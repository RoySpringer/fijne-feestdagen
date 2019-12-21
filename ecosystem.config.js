const paths = require("./config/paths");

module.exports = {
  apps : [{
    name: 'WEB_FIJNE',
    script: 'server.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }],

  deploy : {
    production : {
      user : 'roy',
      host : '142.93.128.57',
      ref  : 'origin/master',
      repo : 'git@github.com:RoySpringer/fijne-feestdagen.git',
      path : '/home/roy/pm2/fijne-feestdagen',
      'post-deploy' : 'n lts && yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
