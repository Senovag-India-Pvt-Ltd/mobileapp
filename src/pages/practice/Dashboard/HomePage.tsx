
import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './HomePage.css'; // Import your CSS file here
import { API_URL_Inspection } from '../../../services/auth.service';

const HomePage: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  const [totalTask, setTotalTask] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const fetchDetails = {
      "userMasterId": localStorage.getItem("userMasterId"),
    }

    const api = axios.create({
      baseURL: API_URL_Inspection
    });

    api.post("inspection/v1/inspectionTask/get-dashboard-count-by-user", fetchDetails, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log("API Response:", res.data);
        if (res.data.errorCode === 0) {
          const content = res.data.content;
          setData(content.inspectionTask);
        
        } else {
          console.error("API Error:", res.data.errorMessages);
          // Handle error
        }
      })
      .catch(error => {
        console.error("API Fetch Error:", error);
        // Handle error
      });
  };

  const handleBoxClick = (id: number) => {
    history.push(`/list/${id}`);
  };



  return (
    <IonPage>
      <IonContent>
        
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle><b>Dashboard</b></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="card-container">
            {data.map((item, index) => (
              <IonCol size="13" key={index}>
                <IonCard onClick={() => handleBoxClick(item.inspectionType)} className="card">
                  <IonCardHeader>
                    <IonCardTitle>Name: {item.inspectionName}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Total Items: {item.userMasterId}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
