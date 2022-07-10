import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './address.model';
export interface ITimeslot {
    startTime: string;
    endTime: string;
    date: string;
    addresses: IAddress[];
}

export interface ITimeslotModel extends ITimeslot, Document {}

const TimeslotSchema: Schema = new Schema(
    {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        date: { type: String, required: true },
        addresses: { type: [Schema.Types.ObjectId], required: true, ref: 'Address' }
        // addresses: { type: [String], required: true, ref: 'Address' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITimeslotModel>('Timeslot', TimeslotSchema);
