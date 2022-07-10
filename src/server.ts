import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

import timeslotRoutes from './routes/timeslot.routes';
import deliveryRoutes from './routes/delivery.routes';
import addressRoutes from './routes/address.routes';

import axios from 'axios';

const router = express();

// Connect to MongoDB
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected successfully to mongoDB.');
        startServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect to mongoDB.');
        Logging.error(err);
    });

//Start the Server only if Connect to MongoDB
const startServer = () => {
    router.use((req, res, next) => {
        //Logging the request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}].`);
        res.on('finish', () => {
            //Logging the response
            Logging.info(`Outgoing <- Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}].`);
        });
        next();
    });

    //Address Loader
    axios.post('http://localhost:3030/addresses/create-one/');

    //TimeSlots Loader
    axios.post('http://localhost:3030/timeslots/add-couriers/');

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Rules of the API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
        }
        next();
    });

    //Routes
    router.use('/timeslots', timeslotRoutes);
    router.use('/deliveries', deliveryRoutes);
    router.use('/addresses', addressRoutes);

    //HealthCheck - TEST
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //Error Handler
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server started on port ${config.server.port}.`));
};
