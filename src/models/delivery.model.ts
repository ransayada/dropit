import mongoose, { Document, Schema } from 'mongoose';
import { ITimeslot } from '../models/timeslot.model';

export interface IDelivery {
    status: string;
    selectedTimeslot: ITimeslot;
}

export interface IDeliveryModel extends IDelivery, Document {}

const DeliverySchema: Schema = new Schema(
    {
        status: { type: String, required: true },
        selectedTimeslot: { type: Schema.Types.ObjectId, required: true, ref: 'Timeslot' }
        // selectedTimeslot: { type: String, required: true, ref: 'Timeslot' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDeliveryModel>('Delivery', DeliverySchema);
