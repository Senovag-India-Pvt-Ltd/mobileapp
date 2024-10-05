// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
// import { arrowBack } from 'ionicons/icons';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import './Dashboard.css'; // Import your CSS file here
// import { API_URL_DBT_, API_URL_Inspection } from '../../../services/auth.service';

// const HomePage: React.FC = () => {
//   const [data, setData] = useState<any[]>([]);
//   const history = useHistory();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     const fetchDetails = {
//     //   "stepName": localStorage.getItem("stepName"),
//     //   "count": localStorage.getItem("count")
//     "userMasterId": localStorage.getItem("userMasterId")
//     };

//     const api = axios.create({
//       baseURL: API_URL_DBT_,
//     });

//      api.post(`dbt/v1/service/getUserDashboardCount?id=${localStorage.getItem("userMasterId")}`, fetchDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//       },
//     })
//       .then(res => {
//         console.log("API Response:", res.data);
        
//         if (res.data.errorCode === 0) {
//           const content = res.data.content;
//           if(content.length >0){
//             for(let i = 0 ; i<content.length;i++){
//                 setData(data=>([{...data,stepName:content[i].stepName}]))
//             }
//           }
//         } else {
//           console.error("API Error:", res.data.errorMessages);
//           // Handle error
//         }
//       })
//       .catch(error => {
//         console.error("API Fetch Error:", error);
//         // Handle error
//       });
//   };

//   const handleBoxClick = (id: number) => {
//     history.push(`/list/${id}`);
//   };
//   const handleGoBack = () => {
//     history.goBack();
//   };

//   // Array of colors for the boxes
//   const boxColors = ['linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
//     'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
//     'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // Purple to Blue
//      // Light Blue to Dark Blue
//     'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
//     'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
//     'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)', // Red to Pink
//   ];
  

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle><b>User Dashboard</b></IonTitle>
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
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <IonCol size="6" key={index}>
//                   <IonCard 
//                     onClick={() => handleBoxClick(item.inspectionType)} 
//                     className="card" 
//                     style={{ backgroundColor: boxColors[index % boxColors.length] }}
//                   >
//                     <IonCardHeader>
//                       <IonCardTitle>{item.stepName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent>{item.count}</IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             ) : (
//               <IonCol size="12">
//                 <center><h2><b>No data available</b></h2></center>
//               </IonCol>
//             )}
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HomePage;



// import React, { useState } from 'react';
// import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
// import { arrowBack } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import './Dashboard.css'; // Import your CSS file here

// const HomePage: React.FC = () => {
//   // Dummy data for demonstration
//   const [data, setData] = useState([
//     { inspectionName: 'Scrutiny', userMasterId: 0, inspectionType: 1 },
//     { inspectionName: 'Silk Samagra', userMasterId: 0, inspectionType: 2 },
//     { inspectionName: 'Design and BOQ Upload', userMasterId: 0, inspectionType: 3 },
//     { inspectionName: 'Pre Inspection', userMasterId: 0, inspectionType: 4 },
//     { inspectionName: 'Verify Pre Sanction Order', userMasterId: 0, inspectionType: 5 },
//     { inspectionName: 'Work Order', userMasterId: 0, inspectionType: 6 },
//     { inspectionName: 'Post Inspection', userMasterId: 0, inspectionType: 7 },
//   ]);

//   const history = useHistory();

//   const handleBoxClick = (id: number) => {
//     history.push(`/list/${id}`);
//   };

//   const handleGoBack = () => {
//     history.goBack();
//   };

//   // Array of gradient colors for the boxes
//   const boxColors = [
//     'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Light Blue to Dark Blue
//     'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', // Coral to Peach
//     'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // Purple to Blue
//     'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
//     'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
//     'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)', // Red to Pink
//   ];

//   return (
//     <IonPage className="dashboard-background"> {/* Correct class name usage */}
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle><b>User Dashboard</b></IonTitle>
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
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <IonCol size="6" key={index}>
//                   <IonCard 
//                     onClick={() => handleBoxClick(item.inspectionType)} 
//                     className="card" 
//                     style={{ background: boxColors[index % boxColors.length] }} // Apply gradient backgrounds
//                   >
//                     <IonCardHeader>
//                       <IonCardTitle>{item.inspectionName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent>{item.userMasterId}</IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             ) : (
//               <IonCol size="12">
//                 <center><h2><b>No data available</b></h2></center>
//               </IonCol>
//             )}
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HomePage;









import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file here
import { API_URL_DBT_ } from '../../../services/auth.service';

const HomePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const fetchDetails = {
      "userMasterId": localStorage.getItem("userMasterId")
    };

    const api = axios.create({
      baseURL: API_URL_DBT_,
    });

    api.post(`dbt/v1/service/getUserDashboardCount?id=${localStorage.getItem("userMasterId")}`, fetchDetails, {
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
          if (content.length > 0) {
            setData(content); // Set the API data directly
          }
        } else {
          console.error("API Error:", res.data.errorMessages);
        }
      })
      .catch(error => {
        console.error("API Fetch Error:", error);
      });
  };

  const handleBoxClick = (id: number) => {
    history.push(`/list/${id}`);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  // Array of gradient colors for the boxes
  // const boxColors = ['linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',  // Coral to Peach
    
  //   'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Light Blue to Dark Blue
  //   'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
  //   'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Purple to Blue
  //   'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
  //   'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
    
  // ];
  const boxColors = [
 'linear-gradient(135deg, #00c6ff 0%, #00c6ff 100%)', // Light Blue to Dark Blue
 ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><b>User Dashboard</b></IonTitle>
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <IonCol size="12" key={index}>
                <IonCard 
                          onClick={() => handleBoxClick(item.approvalStageId)} 
                          className="card" 
                          style={{ background: boxColors[index % boxColors.length] }} // Apply gradient backgrounds
                        >
                          <IonCardHeader className="card-header">
                            <IonCardTitle className="step-name">{item.stepName}</IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent className="card-content">
  <h2 className="count">
    {item.count}
  </h2>
</IonCardContent>

                        </IonCard>


                </IonCol>
              ))
            ) : (
              <IonCol size="12">
                <center><h2><b>No data available</b></h2></center>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;




// // Combined code of HomePage and Dashboard

// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
// import { arrowBack } from 'ionicons/icons';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import './CombinedDashboard.css'; // Import your CSS file here
// import { API_URL_DBT_, API_URL_Inspection } from '../../../services/auth.service';

// const CombinedDashboard: React.FC = () => {
//   const [dbtData, setDbtData] = useState<any[]>([]);
//   const [inspectionData, setInspectionData] = useState<any[]>([]);
//   const history = useHistory();

//   useEffect(() => {
//     fetchDbtData();
//     fetchInspectionData();
//   }, []);

//   // Fetch DBT Data
//   const fetchDbtData = () => {
//     const fetchDetails = {
//       "userMasterId": localStorage.getItem("userMasterId"),
//     };

//     const api = axios.create({
//       baseURL: API_URL_DBT_,
//     });

//     api.post(`dbt/v1/service/getUserDashboardCount?id=${localStorage.getItem("userMasterId")}`, fetchDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//       },
//     })
//       .then(res => {
//         if (res.data.errorCode === 0 && res.data.content.length > 0) {
//           setDbtData(res.data.content);
//         }
//       })
//       .catch(error => {
//         console.error("DBT API Fetch Error:", error);
//       });
//   };

//   // Fetch Inspection Data
//   const fetchInspectionData = () => {
//     const fetchDetails = {
//       "userMasterId": localStorage.getItem("userMasterId"),
//     };

//     const api = axios.create({
//       baseURL: API_URL_Inspection,
//     });

//     api.post("inspection/v1/inspectionTask/get-dashboard-count-by-user", fetchDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//       },
//     })
//       .then(res => {
//         if (res.data.errorCode === 0 && res.data.content?.inspectionTask.length > 0) {
//           setInspectionData(res.data.content.inspectionTask);
//         }
//       })
//       .catch(error => {
//         console.error("Inspection API Fetch Error:", error);
//       });
//   };

//   const handleBoxClick = (id: number, isInspection: boolean = false) => {
//     const route = isInspection ? `/list2/${id}` : `/list/${id}`;
//     history.push(route);
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
//           <IonTitle><b>Combined Dashboard</b></IonTitle>
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
//             {dbtData.length > 0 && (
//               dbtData.map((item, index) => (
//                 <IonCol size="6" key={index}>
//                   <IonCard 
//                     onClick={() => handleBoxClick(item.approvalStageId)} 
//                     className="card" 
//                     style={{ background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' }} 
//                   >
//                     <IonCardHeader className="card-header">
//                       <IonCardTitle className="step-name">{item.stepName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent className="card-content">
//                       <h2 className="count">{item.count}</h2>
//                     </IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             )}

//             {inspectionData.length > 0 && (
//               inspectionData.map((item, index) => (
//                 <IonCol size="6" key={index}>
//                   <IonCard onClick={() => handleBoxClick(item.inspectionType, true)} className="card">
//                     <IonCardHeader>
//                       <IonCardTitle>{item.inspectionName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent>Total Items: {item.userMasterId}</IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             )}

//             {dbtData.length === 0 && inspectionData.length === 0 && (
//               <IonCol size="12">
//                 <center><h2><b>No data available</b></h2></center>
//               </IonCol>
//             )}
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default CombinedDashboard;
