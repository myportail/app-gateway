import * as express from 'express';
import * as Path from 'path';
import {Router} from "express";
import bodyParser = require("body-parser");
import {Proxy} from './proxy';

declare var process : {
    env: {
        PORT: number
    }
};

interface Headers {
    [key: string]: any;
}

const app: express.Application = express();
const router: Router = express.Router();
const port: number = process.env.PORT || 8000;
// const path: string = Path.resolve('./../web/dist/portail');

console.log(`dirname : ${__dirname}`);
// console.log(`path : ${path}`);

// router.get('*', function(req, res){
//     res.sendFile('index.html', { root: path + '/' });
// });

app.use(bodyParser.urlencoded({extended:true}));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.get('/test', (req, res) => {
   res.send('application gateway working');
});

app.use(new Proxy('/api/auth/',
    'http://authservice:8001/api/').requestHandler );
app.use(new Proxy('/',
    'http://portail:8002/').requestHandler );


// app.use('/', router);

app.listen(port);
