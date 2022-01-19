module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        index: "./index.jsx",
        customers: "./customers.jsx",
        products: "./products.jsx",
        sales: "./sales.jsx",
        stores: "./stores.jsx"
    },
    output: {
        path: __dirname + "../../../wwwroot/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    }
}
