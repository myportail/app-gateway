import * as express from 'express';
import {Router} from "express";
import bodyParser = require("body-parser");
import {Proxy} from './proxy';
import * as fs from "fs";
import {AppConfig} from "./config/app-config";

declare var process : {
    env: {
        PORT: number
        ENVIRONMENT_NAME: string
    }
};

// interface Headers {
//     [key: string]: any;
// }

const configName = process.env.ENVIRONMENT_NAME;
const configPlatform = (configName) ? `.${configName}` : '';
const configFilename = `config${configPlatform}`;

const appConfig = new AppConfig();
appConfig.initFromJSON(JSON.parse(fs.readFileSync(`configs/${configFilename}.json`, 'utf8')));

const app: express.Application = express();
const port: number = process.env.PORT || 8000;

console.log(`dirname : ${__dirname}`);

app.use(bodyParser.urlencoded({extended:true}));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.get('/config', (req: any, res: { send: (arg0: string) => void; }) => {
   res.send(JSON.stringify(appConfig.toJSON()));
});

app.use(new Proxy('/api/auth/',
    'http://authservice:8001/api/').requestHandler );
app.use(new Proxy('/',
    'http://portail:8002/').requestHandler );


app.listen(port);
