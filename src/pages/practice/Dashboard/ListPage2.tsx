

// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonMenuButton, IonRow, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { arrowBack } from 'ionicons/icons';
// import { API_URL_Inspection } from '../../../services/auth.service';

// const ListPage: React.FC = () => {

//   const { inspectionType } = useParams<{ inspectionType: string }>();
//   const history = useHistory();
//   const [lists, setLists] = useState<any[]>([]);
//   const { id } = useParams<{ id: string }>();
//   const [iserror, setIserror] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     const fetchDetails = {
//       "inspectionType":  inspectionType,
//       "userMasterId": localStorage.getItem("userMasterId"),
//     }

//     const api = axios.create({
//       baseURL: API_URL_Inspection
//     });

//     api.post("inspection/v1/inspectionTask/get-task-list-by-user-and-type", fetchDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//       },
//     })
//       .then(res => {
//         console.log(res.data);
//         if (res.data.errorCode === -1) {
//           setMessage(res.data.errorMessages[0].message);
//           setIserror(true)
//         } else {
//           setLists(res.data.content.inspectionTask);
//         }
//       })
//       .catch(error => {
//         console.error("API Fetch Error:", error);
//         // Handle error
//       });
//   };

//   const handleBoxClick = (id: number, inspTaskId: number) => {
//     history.push(`/docu/${id}/${inspTaskId}`);
//   };

//   const handleGoBack = () => {
//     history.goBack();
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle><b>List Page</b></IonTitle>
//           <IonButtons slot="end">
//             <IonButton onClick={handleGoBack}>
//               <IonIcon icon={arrowBack} />
//               Go Back
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonGrid>
//           <IonRow className="card-container">
//             {lists.map((item, index) => (
//               <IonCol size="13" key={index}>
//                 <IonCard onClick={() => handleBoxClick(item.inspectionType, item.inspectionTaskId)} className="card">
//                   <IonCardHeader>
//                     <IonCardTitle>Request Type ID: {item.requestTypeId}</IonCardTitle>
//                   </IonCardHeader>
//                   <IonCardContent>Request Type: {item.requestType}</IonCardContent>
//                   <IonCardContent>Name: {item.inspectionName}</IonCardContent>
//                 </IonCard>
//               </IonCol>
//             ))}
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// }

// export default ListPage;





import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonMenuButton, IonRow, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
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
      baseURL: API_URL_Inspection
    });

    api.post("inspection/v1/inspectionTask/get-task-list-by-user-and-type", fetchDetails, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.errorCode === -1) {
          setMessage(res.data.errorMessages[0].message);
          setIserror(true);
        } else if (res.data.content.inspectionTask && res.data.content.inspectionTask.length > 0) {
          // If API returns data, set it
          setLists(res.data.content.inspectionTask);
        } else {
          // If no data, set dummy data
          setLists(dummyData);
        }
      })
      .catch(error => {
        console.error("API Fetch Error:", error);
        // On error, use dummy data
        setLists(dummyData);
      });
  };

  // Dummy data to display if no data is fetched from API
  const dummyData = [
    {
      inspectionType: 1,
      inspectionTaskId: 101,
      requestTypeId: 1,
      requestType: "Dummy Request Type 1",
      inspectionName: "Dummy Inspection 1",
    },
    {
      inspectionType: 2,
      inspectionTaskId: 102,
      requestTypeId: 2,
      requestType: "Dummy Request Type 2",
      inspectionName: "Dummy Inspection 2",
    }
  ];


  // const handleBoxClick = (id: number, inspTaskId: number) => {
  //   history.push(`/docu2/${id}/${inspTaskId}`);
  // };
  // const handleBoxClick = (id: number, inspTaskId: number) => {
  //   history.push(`/docu2/${id}/${inspTaskId}`);
  // };

  const handleBoxClick = () => {
    history.push(`/docu2`);
  };


  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><b>List Page</b></IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGoBack}>
              <IonIcon icon={arrowBack} />
              Go Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="card-container">
            {lists.map((item, index) => (
              <IonCol size="13" key={index}>
                <IonCard onClick={() => handleBoxClick(item.inspectionType, item.inspectionTaskId)} className="card">
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
