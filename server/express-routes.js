import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { setupDevelopmentRoutes } from './development-server';

const isProductionMode = process.env.NODE_ENV === 'production'; 

export function initializeExpress(app) {
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());

    if (isProductionMode) {
        const staticFilesRoot = path.resolve(__dirname + '../dist/client');
        app.use('/client', express.static(staticFilesRoot));
    }
    else {
        setupDevelopmentRoutes(app);
    }

    //  Gets the page from the root of the project
    app.get('/', function (req, res) {
        const filePath = path.resolve(__dirname + '/../client/index.html')
        res.sendFile(filePath);
    });

    // Global error handler
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(500);
    });
}