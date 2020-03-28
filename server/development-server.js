import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';
import webpackHotMiddleware from 'webpack-hot-middleware';

/*
 * Register the webpack middleware to serve up fresh static content as you make changes.
 */
export function setupDevelopmentRoutes(app) {
    const compiler = webpack(config);
    
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
    }));

    app.use(webpackHotMiddleware(compiler));
}
