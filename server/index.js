import path from 'path';
import http from 'http';
import express from 'express';
import { initializeFaye } from './faye-pub-sub';
import { initializeExpress } from './express-routes';

export function start() {
    const app = express();
    const server = http.createServer(app);

    initializeFaye(server);
    initializeExpress(app);

    const port = process.env.PORT || 8000;

    server.listen(port, function () {
        console.log('Listening on ' + port);
    });
}