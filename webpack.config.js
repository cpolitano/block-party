var path = require("path");

var plugins = require("./webpack/plugins")({
    reactPath: "react",
    reactDOMPath: "react-dom"
});

var config = {
    context: path.join(__dirname, "src"),
    node: {
        process: false
    },
    resolve: {
        root: path.join(__dirname, "src"),
        extensions: ["", ".js", ".ejs"],
        alias: {
            react$: path.join(__dirname, "node_modules", "react"),
            "react-dom$": path.join(__dirname, "node_modules", "react-dom")
        },
    },
    entry: {
        BlockParty: "./client/app.js"
    },
    output: {
        path: path.join(__dirname, "public", "assets"),
        filename: "[name].js",
        library: ["BlockParty", "[name]"],
        publicPath: "/assets/"
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loader: "babel",
            include: path.join(__dirname, "src"),
            query: {
                presets: ["react", "es2015"]
            }
        },
        {
            test: /\.css$/,
            loader: "style!css"
        },
        { 
            test: /\.ejs$/, 
            loader: "ejs-compiled-loader"
        }
        ]
    },
    plugins: plugins
};

module.exports = config;