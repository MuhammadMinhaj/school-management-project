const path = require('path')
const config = {
    entry:'./public/scripts/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:'/dist'
    },
   module:{
       rules:[
           {
               test:/\.js$/,
               use:{
                   loader:"babel-loader"
               }
           }
       ]
   }
}
module.exports = config
