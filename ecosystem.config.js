/*
 * :file description: 
 * :name: /chatgpt/ecosystem.config.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-10 09:41:18
 * :last editor: 张德志
 * :date last edited: 2023-08-10 09:42:45
 */
'use strict'

module.exports = {
  apps: [{
    name: 'chatcpt',
    script: 'next start',
    env_production: {
      NODE_ENV: 'production',
      EGG_SERVER_ENV: 'prod',
    },
  }],
}