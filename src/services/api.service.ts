import axios, { AxiosResponse } from 'axios';
import  { IAddress } from '../models/address.model';



export const getAddresses = async (): Promise<IAddress[]> => {
    try{
        const res: AxiosResponse = await axios.get(
            'https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=c03a2facc4af4287afc9b27260c22027'
        );
        return res.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const getHolidays =  async (): Promise<IAddress[]> => {
    try {
        const res: AxiosResponse = await axios.get('https://holidayapi.com/v1/holidays?pretty&country=IL&year=2021&key=dd0bcaad-2412-4f04-acf3-63578cb43f6f');
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const initialization = async () => {
    try {
        const res: AxiosResponse = await axios.get('http://localhost:3030/addresses/create-one/');
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}