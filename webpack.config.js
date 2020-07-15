const path = require('path')
const config = {
    entry:{
        admin:'./public/scripts/admin/index.js',
        web:'./public/scripts/index.js',
        style:'./public/styles/style.css',
        adminStyle:'./public/styles/admin/style.css',
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
           },
           {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            }
       ]
   }
}
module.exports = config
