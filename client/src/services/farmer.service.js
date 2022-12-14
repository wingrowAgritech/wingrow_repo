import axios from 'axios';
import authHeader from './auth.headers';

const API_URL = 'http://localhost:4000/';

 const postInward = (commodity , purchase_quantity , purchase_rate , market , time) => {
    return axios.post(API_URL + "inward", {
        commodity,
        purchase_quantity,
        purchase_rate,
        market,
        time
      } , { headers: authHeader() });
  }

  const postOutward = (commodity , sales_quantity , sales_rate , market , time) => {
    return axios.post(API_URL + "outward", {
        commodity,
        sales_quantity,
        sales_rate,
        market,
        time
      },{ headers: authHeader() });
  }

  const getInward = () => {
    return axios.get(API_URL + 'inward', { headers: authHeader() });
  }

  const getOutward = () => {
    return axios.get(API_URL + 'outward', { headers: authHeader() });
  }

  const getInwardData = () => {
    return axios.get(API_URL + 'inwardData', { headers: authHeader() });
  }

  const getOutwardData = () => {
    return axios.get(API_URL + 'outwardData', { headers: authHeader() });
  }

  const getMyStalls = () => {
    return axios.get(API_URL + 'stalls', { headers: authHeader() });
  }


const FarmerService = {
    postInward,
    postOutward,
    getInward,
    getOutward,
    getMyStalls,
    getInwardData,
    getOutwardData 
  };
  
  export default FarmerService;
