const CracoLessPlugin = require('craco-less')

module.exports = {
  babel:{
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#c60021' },
            javascriptEnabled: true,
          }
        }
      }
    },
    
  ]
}
