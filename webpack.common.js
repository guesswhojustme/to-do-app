 import path from 'node:path';
 import { fileURLToPath } from 'node:url';
 import HtmlWebpackPlugin from 'html-webpack-plugin';
// const require = createRequire(import.meta.url);
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 export default {
   entry: {
     app: './src/index.js',
   },
   resolve: {
    alias: {
      // "date-fns-locale": path.dirname(require.resolve("date-fns/package.json")),
    },
  },
   plugins: [
     new HtmlWebpackPlugin({
       template: "./src/template.html",
       title: 'Production',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
   module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|svg|jpg|woff2|woff)$/i,
            type: "asset/resource",
        },
        {
            test: /\.html$/i,
            use: ["html-loader"],
      }
    ],
  },
 };