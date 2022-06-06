module.exports = {
  apps: [
    {
      name: 'NuxtAppName', //你的项目名
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
