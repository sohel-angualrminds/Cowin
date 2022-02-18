import axios from "axios";
import api from "./api"

export async function getData(url) {
    const res = await api.get(url);
    return res.data;
}

export async function getVaccinationCenter(d_code,date) {
    
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${d_code}&date=${date}`;
    try {
        const res = await axios.get(url);
        // console.log(res.data.sessions);
        return res.data.sessions
    }
    catch (e) {
        console.error(e)
    }
    
}

export async function getVaccinationCenterByPinCode(pinCode,date) {
    
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${date}`;
    try {
        const res = await axios.get(url);
        return res.data.sessions
    }
    catch (e) {
        console.error(e)
    }
    
}