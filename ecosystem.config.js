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
      user : paths.dotenv.DEPLOY_USER,
      host : paths.dotenv.DEPLOY_HOST,
      ref  : 'origin/master',
      repo : paths.dotenv.DEPLOY_REPO,
      path : paths.dotenv.DEPLOY_PATH,
      'post-deploy' : 'n lts && yarn build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
