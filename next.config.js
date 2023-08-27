/*
 * :file description: 
 * :name: /chatgpt/next.config.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-27 11:31:07
 * :last editor: 张德志
 * :date last edited: 2023-08-27 11:31:09
 */
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    compress: true,
  
    webpack(config) {
      config.experiments = {
        asyncWebAssembly: true,
        layers: true
      };
      config.module.rules = config.module.rules.concat([
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack']
        }
      ]);
  
      return config;
    }
  };
  
  module.exports = nextConfig;
  