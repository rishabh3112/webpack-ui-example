import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
const WEBPACK_CONFIG_NAME = 'webpack.config.js';
export function webpackConfigMiddleware(req, res, next) {
    process.stdout.write(`[wui][webpack-middleware] updating response\n`);
    const configPath = resolve(process.cwd(), WEBPACK_CONFIG_NAME);
    const res_json = res.json;
    res.json = function(body){
        body.webpack = null;
        if (existsSync(configPath)) {
            body.webpack = readFileSync(configPath).toString();
        }
        try {
            res_json.call(this, body);   
        } catch (error) {
            
        }
        return;
    }
    next();
}