import axios from 'axios';
import jwtDecode from 'jwt-decode';

//const API_URL = 'http://localhost:8001/master-data';
const API_URL = 'https://api.senovagseri.com/master-data';
//const API_URL = 'http://13.200.62.144:8001/master-data/v1';

const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem('marketId', response.data.marketId);
    localStorage.setItem('roleId', response.data.roleId);
    localStorage.setItem('phoneNumber', response.data.phoneNumber);
    localStorage.setItem('userMasterId', response.data.userMasterId);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('firstName', response.data.firstName);
    localStorage.setItem('lastName', response.data.lastName);
    localStorage.setItem('email', response.data.emailId);
    localStorage.setItem('marketName', response.data.marketName);
    if(response.data.godownId != null && response.data.godownId != ""){
      localStorage.setItem('godownId', response.data.godownId);
    }else{
      localStorage.setItem('godownId', "0");
    }
    if(response.data.userType != null && response.data.userType != ""){
      localStorage.setItem('userType', response.data.userType);
    }else{
      localStorage.setItem('userType', "0");
    }
    if(response.data.userTypeId != null && response.data.userTypeId != ""){
      localStorage.setItem('userTypeId', response.data.userTypeId);
    }else{
      localStorage.setItem('userTypeId', "0");
    }
    if(response.data.deviceId != null && response.data.deviceId != ""){
      localStorage.setItem('deviceId', response.data.deviceId);
    }else{
      localStorage.setItem('deviceId', "0");
    }
    localStorage.setItem('radius', response.data.radius);
    localStorage.setItem('marketLat', response.data.marketLat);
    localStorage.setItem('marketLongitude', response.data.marketLongitude);
    console.log(response.data.token)
  },

  logout: () => {
    localStorage.removeItem('jwtToken');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('jwtToken');
    return token ? true : false;
  },

  getToken: () => {
    const token = localStorage.getItem('jwtToken');
    return token ? token : null;
  },
};

export default authService;
