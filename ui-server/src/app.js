import express from 'express';
import { webpackConfigMiddleware } from './utils/webpackConfigMiddleware';
import bodyParser from 'body-parser';
import { scaffoldDefaults } from './utils/scaffoldDefaults';
import {join, resolve} from 'path';
import { writeFileSync } from 'fs';

const USER_DIRECTORY = process.env.PWD;
const app = express();


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(webpackConfigMiddleware);
app.use(express.static(join(__dirname,'../../ui-gui/dist')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.post('/api/save', (req, res) => {
    writeFileSync( resolve(USER_DIRECTORY, "webpack.config.js"), req.body.webpack);
    res.json({
        status: '200',
    });
})
app.post('/api/init', (req, res) => {
    if (req.body.type === 'defaults') {
        scaffoldDefaults(USER_DIRECTORY);
        res.json({value: true});
    }
    res.json({value: "WIP"});
});
export default app;