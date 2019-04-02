import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { NextFunction } from 'express-serve-static-core';
const WEBPACK_CONFIG_NAME = 'webpack.config.js';
@Injectable()
export class WebpackMiddleware implements NestMiddleware {
// tslint:disable-next-line: ban-types
  use(req: Request, res: Response, next: NextFunction) {
    process.stdout.write(`[wui][webpack-middleware] updating response\n`);

    const configPath = resolve(process.cwd(), WEBPACK_CONFIG_NAME);
    const resjson = res.json;

    res.json = function(body): Response {
        body.webpack = null;
        if (existsSync(configPath)) {
          body.webpack = readFileSync(configPath).toString();
        }
        resjson.call(this, body);
        return;
    };
    next();
  }
}
