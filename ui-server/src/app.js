import express from 'express';
import { webpackConfigMiddleware } from './utils/webpackConfigMiddleware';
import bodyParser from 'body-parser';
import { scaffoldDefaults } from './utils/scaffoldDefaults';

const USER_DIRECTORY = process.env.PWD;
const app = express();


// Middlewares
app.use(webpackConfigMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/init', (req, res) => {
    if (req.body.type === 'defaults') {
        scaffoldDefaults(USER_DIRECTORY);
    }
    res.send("apple");
});
export default app;