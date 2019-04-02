import express from 'express';
import { webpackConfigMiddleware } from './utils/webpackConfigMiddleware';
import bodyParser from 'body-parser';
import { scaffoldDefaults } from './utils/scaffoldDefaults';

const USER_DIRECTORY = process.env.PWD;
const app = express();


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackConfigMiddleware);

app.post('/api/init', (req, res) => {
    if (req.body.type === 'defaults') {
        scaffoldDefaults(USER_DIRECTORY);
        res.json({value: true});
    }
    res.json({value: "WIP"});
});
export default app;