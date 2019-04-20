import {Request, Response, NextFunction, RequestHandler} from "express";
const request = require('request');

interface Headers {
    [key: string]: any;
}

export class Proxy {

    constructor(private readonly _route : string,
                private readonly _redirectRoute: string = '') {
        if (this._redirectRoute != '' && !this._redirectRoute.endsWith('/')) {
            this._redirectRoute = `${this._redirectRoute}/`;
        }
   }

    protected onPostRequet(url : string,
                        req : Request,
                        res : Response,
                        next : NextFunction) {
        request.post({
            headers: this.apiHeaderFromRequest(req),
            url: `${this._redirectRoute}${url}`,
            body: JSON.stringify(req.body)
        }, (error: any, response: any, body: any) => {
            res.status(response.statusCode);
            res.send(response.body);
        });
    }

    protected onPutRequest(url : string,
                        req : Request,
                        res : Response,
                        next : NextFunction) {

        request.put({
            headers: this.apiHeaderFromRequest(req),
            url: `${this._redirectRoute}${url}`,
            body: JSON.stringify(req.body)
        }, (error: any, response: any, body: any) => {
            if (response) {
                res.status(response.statusCode);
                res.send(response.body);
            } else {
                res.status(404);
                res.send();
            }
        });
    }

    protected onGetRequest(url : string,
                        req : Request,
                        res : Response,
                        next : NextFunction) {
        request.get({
            headers: this.apiHeaderFromRequest(req),
            url: `${this._redirectRoute}${url}`,
            body: JSON.stringify(req.body)
        }, (error: any, response: any, body: any) => {
            if (response) {
                res.status(response.statusCode);
                res.send(response.body);
            }
            else {
                res.status(404);
                res.send();
            }
        });
    }

    protected onDeleteRequest(url : string,
                           req : Request,
                           res : Response,
                           next : NextFunction) {

        request.delete({
            headers: this.apiHeaderFromRequest(req),
            url: `${this._redirectRoute}${url}`,
            body: JSON.stringify(req.body)
        }, (error: any, response: any, body: any) => {
            res.status(response.statusCode);
            res.send(response.body);
        });
    }

    protected apiHeaderFromRequest(req : Request) : Headers {
        const headers : Headers = {
            'Content-Type': req.headers['content-type'],
            'accept': req.headers['accept'],
            'Authorization': req.headers['authorization']
        };

        return headers;
    }

    protected handleRequest(req : Request,
                         res : Response,
                         next : NextFunction) {
        const url : string = req.url.substring(this._route.length);

        switch (req.method) {
            case 'POST': {
                this.onPostRequet(url, req, res, next);
            }
            break;
            case 'GET': {
                this.onGetRequest(url, req, res, next);
            }
            break;
            case 'PUT': {
                this.onPutRequest(url, req, res, next);
            }
            break;
            case 'DELETE': {
                this.onDeleteRequest(url, req, res, next);
            }
            break;
            default:
                next();
        }
    }

    protected match(url : string) : boolean {
        return url.startsWith(this._route);
    }

    public get requestHandler() : RequestHandler {
        return (req, res, next) => {
            if (this.match(req.url)) {
                this.handleRequest(req, res, next);
            } else {
                next();
            }
        }
    }
}
