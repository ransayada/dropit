import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Address, { IAddress } from '../models/address.model';
import { getAddresses, getHolidays } from '../services/api.service';


const createAddress = (req: Request, res: Response, next: NextFunction) => {
    const { street, line1, line2, country, postcode } = req.body;

    const address = new Address({
        _id: new mongoose.Types.ObjectId(),
        street,
        line1,
        line2,
        country,
        postcode
    });

    return address
        .save()
        .then((address) => res.status(201).json({ address }))
        .catch((error) => res.status(500).json({ error }));
};
const createOneAddress =async (req: Request, res: Response, next: NextFunction) => {
   const addressesData: any = await getAddresses();
   const address = new Address({
        _id: new mongoose.Types.ObjectId(),
       street: addressesData.query.parsed.street,
       line1: addressesData.query.parsed.housenumber,
       line2: addressesData.query.parsed.district,
       country: addressesData.query.parsed.country,
       postcode: addressesData.query.parsed.postcode
   });
    return address
        .save()
        .then((address) => res.status(201).json({ address }))
        .catch((error) => res.status(500).json({ error }));
};

const resolveAddress = (req: Request, res: Response, next: NextFunction) => {
    const { searchTerm } = req.body;
    const myAddressesArray = JSON.stringify(searchTerm).split(',');
    const street = myAddressesArray[0].substring(1);
    const line1 = myAddressesArray[1];
    const line2 = myAddressesArray[2];
    const country = myAddressesArray[3];
    const postcode = myAddressesArray[4].substring(0,myAddressesArray[4].length-1);
    const address = new Address({
        _id: new mongoose.Types.ObjectId(),
        street,
        line1,
        line2,
        country,
        postcode
    });

    return address
        .save()
        .then((address) => res.status(201).json({ address }))
        .catch((error) => res.status(500).json({ error }));
};
const readAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findById(addressId)
        .then((address) => (address ? res.status(200).json({ address }) : res.status(404).json({ message: 'Address not found' })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Address.find()
        .then((addresses) => res.status(200).json({ addresses }))
        .catch((err) => res.status(500).json({ err }));
};
const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findById(addressId)
        .then((address) => {
            if (address) {
                address.set(req.body);
                return address
                    .save()
                    .then((address) => res.status(201).json({ address }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressId = req.params.addressId;

    return Address.findByIdAndDelete(addressId)
        .then((address) => (address ? res.status(201).json({ message: 'Address deleted' }) : res.status(404).json({ message: 'Address not found' })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createAddress, readAddress, readAll, updateAddress, deleteAddress, resolveAddress, createOneAddress };
