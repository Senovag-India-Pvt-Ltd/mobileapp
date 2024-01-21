import React, { useEffect, useState } from 'react';
import { IonText } from '@ionic/react';
import axios from "axios";
import authService from '../services/auth.service';


const TimeTicker: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [serverTime, setServerTime] = useState(new Date());
  const [count, setCount] = useState(0);

  useEffect(() => {
    //const apiUrl = 'http://localhost:8001/master-data/v1/util/current-time-millisec'; 
    const apiUrl = 'https://api.senovagseri.com/master-data/v1/util/current-time-millisec'; 
    
    const jwtToken = authService.getToken();
    
    const headers = {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    };

    axios.get(apiUrl, { headers })
    .then(response => {
        setServerTime(response.data)
        console.log(response.data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });


    // Update the time every second
    const intervalId = setInterval(() => {
      //ad one second to current millisecond
      if(count == 0) {
        let originalDate = new Date(serverTime);
        const newDate = new Date(originalDate.getTime() + 1000);
        setCurrentTime(newDate);
      } else {
        const newDate = new Date(currentTime.getTime() + 1000);
        setCurrentTime(newDate);
      }
      
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [count]);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <IonText>
      <p style={{paddingLeft: '10px', fontWeight: 'bold', color: 'red'}}>{formattedTime}</p>
    </IonText>
  );
};

export default TimeTicker;