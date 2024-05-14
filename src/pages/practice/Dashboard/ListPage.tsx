


import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_URL_Inspection } from '../../../services/auth.service';

const ListPage: React.FC = () => {

  const { inspectionType } = useParams<{ inspectionType: string }>();
  const history = useHistory();
  const [lists, setLists] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = () => {
   

    const fetchDetails = {
      "inspectionType":  inspectionType,
      "userMasterId": localStorage.getItem("userMasterId"),
      
    }

    
    const api = axios.create({
      // baseURL: API_URL
      baseURL: API_URL_Inspection
    })
    api.post("inspection/v1/inspectionTask/get-task-list-by-user-and-type", fetchDetails, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.errorCode == -1) {
          setMessage(res.data.errorMessages[0].message);
          setIserror(true)
        } else {
          setLists(res.data.content.inspectionTask);}
   
      })
      .catch(error => {
        
      })

  };

  const handleBoxClick = (id: number,inspTaskId: number) => {
    history.push(`/docu/${id}/${inspTaskId}`);
  };
  
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle><b>List Page</b></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="card-container">
            {lists.map((item, index) => (
              <IonCol size="6" key={index}>
                <IonCard onClick={() => handleBoxClick(item.inspectionType,item.inspectionTaskId)} className="card">
                  <IonCardHeader>
                    <IonCardTitle>Request Type ID: {item.requestTypeId}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Request Type: {item.requestType}</IonCardContent>
                  <IonCardContent>Name: {item.inspectionName}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ListPage;
