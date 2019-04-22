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

function ReadConfig(configFilename: string): AppConfig | null{
    try {
        const appConfig = new AppConfig();
        const fileContent = fs.readFileSync(`configs/${configFilename}.json`, 'utf8');
        if (fileContent) {
            appConfig.initFromJSON(JSON.parse(fileContent));
        }

        return appConfig;
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

const configName = process.env.ENVIRONMENT_NAME;
const configPlatform = (configName) ? `.${configName}` : '';
const configFilename = `config${configPlatform}`;
const appConfig = ReadConfig(configFilename);

const app: express.Application = express();
const port: number = process.env.PORT || 8000;

console.log(`dirname : ${__dirname}`);

app.use(bodyParser.urlencoded({extended:true}));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.get('/config', (req: any, res: { send: (arg0: string) => void; }) => {
    if (appConfig) {
        res.send(JSON.stringify(appConfig.toJSON()));
    }
    else {
        res.send(`no config found at ${configFilename}`);
    }
});

app.use(new Proxy('/api/auth/',
    'http://authservice:8001/api/').requestHandler );
app.use(new Proxy('/',
    'http://portail:8002/').requestHandler );


app.listen(port);
