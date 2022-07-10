import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
    street: string;
    line1: string;
    line2: string;
    country: string;
    postcode: string;
}
export interface IHoliday {
    street: string;
    line1: string;
    line2: string;
    country: string;
    postcode: string;
}

export interface IAddressModel extends IAddress, Document {}

const AddressSchema: Schema = new Schema(
    {
        street: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String, required: true },
        country: { type: String, required: true },
        postcode: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
