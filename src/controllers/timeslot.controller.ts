import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Timeslot from '../models/timeslot.model';
import courierApi from '../courierAPI.json';
import { IHoliday } from '../models/address.model';
import { getHolidays } from '../services/api.service';


const createTimeslot = (req: Request, res: Response, next: NextFunction) => {
    const { startTime,endTime,date,addresses } = req.body;

    const timeslot = new Timeslot({
        _id: new mongoose.Types.ObjectId(),
        startTime,
        endTime,
        date,
        addresses,
    });

    return timeslot
        .save()
        .then((timeslot) => res.status(201).json({ timeslot }))
        .catch((error) => res.status(500).json({ error }));
};
//Holidays Loader
const getHols = async (): Promise<IHoliday[]> => {
    const holidayData: IHoliday[] = await getHolidays();
    return holidayData;
};
const addCouriers = (req: Request, res: Response, next: NextFunction) => {
    const holidays = getHols();
    for(let i=0;i<courierApi.times.length;i++){
        const timeslot = new Timeslot({
            _id: new mongoose.Types.ObjectId(),
            startTime: courierApi.times[i].startTime,
            endTime: courierApi.times[i].endTime,
            date: courierApi.times[i].date,
            addresses: courierApi.times[i].addresses
        });
        if(timeslot.date in holidays){
        return timeslot
            .save()
            .then((timeslot) => res.status(201).json({ timeslot }))
            .catch((error) => res.status(500).json({ error }));
    }
else{
    continue;
}}
};


const readTimeslot = async (req: Request, res: Response, next: NextFunction) => {
    const timeslotId = req.params.timeslotId;

    return Timeslot.findById(timeslotId)
        .then((timeslot) => (timeslot ? res.status(200).json({ timeslot }) : res.status(404).json({ message: 'Timeslot not found' })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Timeslot.find()
        .then((timeslots) => res.status(200).json({ timeslots }))
        .catch((err) => res.status(500).json({ err }));
};
const updateTimeslot = async (req: Request, res: Response, next: NextFunction) => {
    const timeslotId = req.params.timeslotId;

    return Timeslot.findById(timeslotId)
        .then((timeslot) => {
            if (timeslot) {
                timeslot.set(req.body);
                return timeslot
                    .save()
                    .then((timeslot) => res.status(201).json({ timeslot }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Timeslot not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteTimeslot = async (req: Request, res: Response, next: NextFunction) => {
    const timeslotId = req.params.timeslotId;

    return Timeslot.findByIdAndDelete(timeslotId)
        .then((timeslot) => (timeslot ? res.status(201).json({ message: 'Timeslot deleted' }) : res.status(404).json({ message: 'Timeslot not found' })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createTimeslot, readTimeslot, readAll, updateTimeslot, deleteTimeslot, addCouriers };
