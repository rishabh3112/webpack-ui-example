const WEBPACK_CONFIG_NAME = 'webpack.config.js';
export function webpackConfigMiddleware(req, res, next) {
    // TODO: implement middleware for config sharing
    process.stdout.write(`[webpack-middleware] ${JSON.stringify(req.body, null, 2)}`);
    next();
}