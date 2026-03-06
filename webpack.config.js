module.exports = {
    entry: {
        'imageGallery': {
            import: './src/index.js',
            filename: 'bundle.js'
        },
        'galleryWidget': {
            import: './src/gallery-grid.js',
            filename: 'gallery.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: "defaults",
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        library: '[name]',
        libraryTarget: 'umd'
    }
};
