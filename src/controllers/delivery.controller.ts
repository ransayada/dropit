import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import mongoose from 'mongoose';
import Delivery from '../models/delivery.model';

const createDelivery = (req: Request, res: Response, next: NextFunction) => {
    const { status, timeslots } = req.body;

    const delivery = new Delivery({
        _id: new mongoose.Types.ObjectId(),
        status,
        timeslots
    });

    return delivery
        .save()
        .then((delivery) => res.status(201).json({ delivery }))
        .catch((error) => res.status(500).json({ error }));
};
const readDelivery = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryId = req.params.deliveryId;

    return Delivery.findById(deliveryId)
        .then((delivery) => (delivery ? res.status(200).json({ delivery }) : res.status(404).json({ message: 'Delivery not found' })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Delivery.find()
        .then((deliveries) => res.status(200).json({ deliveries }))
        .catch((err) => res.status(500).json({ err }));
};

const readDaily = async (req: Request, res: Response, next: NextFunction) => {
    const today = new Date();
    const dayOfMonth = today.getUTCDate();
    return Delivery.find()
        .then((deliveries) => {
            deliveries.filter((delivery) => delivery.selectedTimeslot.date === ''+dayOfMonth);
            res.status(200).json({ deliveries });
        })
        .catch((err) => res.status(500).json({ err }));
};
const readWeekly = async (req: Request, res: Response, next: NextFunction) => {
    return Delivery.find()
        .then((deliveries) => {
            deliveries.filter((delivery) =>{
                const now = moment();
                const date = moment(delivery.selectedTimeslot.date);
                if(date.isoWeek() === now.isoWeek()){
                    return delivery;
                }
                res.status(200).json({ deliveries });
            });
        })
        .catch((err) => res.status(500).json({ err }));
};
const updateDelivery = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryId = req.params.deliveryId;

    return Delivery.findById(deliveryId)
        .then((delivery) => {
            if (delivery) {
                delivery.set(req.body);
                return delivery
                    .save()
                    .then((delivery) => res.status(201).json({ delivery }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Delivery not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const completeDelivery = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryId = req.params.deliveryId;

    return Delivery.findById(deliveryId)
        .then((delivery) => {
            if (delivery) {
                delivery.status = 'completed';
                delivery.set(req.body);
                return delivery
                    .save()
                    .then((delivery) => res.status(201).json({ delivery }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Delivery not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteDelivery = async (req: Request, res: Response, next: NextFunction) => {
    const deliveryId = req.params.deliveryId;

    return Delivery.findByIdAndDelete(deliveryId)
        .then((delivery) => (delivery ? res.status(201).json({ message: 'Delivery deleted' }) : res.status(404).json({ message: 'Delivery not found' })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createDelivery, readDelivery, readAll, updateDelivery, deleteDelivery, completeDelivery, readDaily, readWeekly };
