const path = require('path')
const config = {
    entry:{
        admin:'./public/scripts/admin/index.js',
        web:'./public/scripts/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
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
