





import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon, IonLabel, IonButtons } from '@ionic/react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { API_URL_DBT_ } from '../../../services/auth.service';
import { arrowBack, cloudUpload, personCircle, calendar, bookmark, cube, time, document, layers, wallet, albums, cash, location, pin, barcode, call, pinOutline, arrowForwardSharp, arrowForward } from 'ionicons/icons';
import './ListPage.css';

const ListPage: React.FC = () => {
  const history = useHistory();
  const [lists, setLists] = useState<any[]>([]);
  const [viewIndex, setViewIndex] = useState<number | null>(null);
 
  const {approvalStageId} = useParams<{approvalStageId:string}>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const fetchDetails = {
      userMasterId: localStorage.getItem("userMasterId"),
      
    };

    const api = axios.create({
      baseURL: API_URL_DBT_,
    });

    api.post(`dbt/v1/service/getInProgressTaskListByUserIdAndStepId?userId=${localStorage.getItem("userMasterId")}&stepId=${approvalStageId}`, fetchDetails, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
    .then(res => {
      setLists(res.data.content);
    })
    .catch(error => {
      console.error("API Fetch Error:", error);
    });
  };

  const handleViewDetails = (index: number) => {
    setViewIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleUploadDocumentsClick = (applicationDocumentId: number) => {
    history.push(`/docu/${applicationDocumentId}`);
  };

  

  const handleGoBack = () => {
    history.goBack();
  };

  // const boxColors = ['linear-gradient(135deg, #00c6ff 0%, #00c6ff 100%)', // Light Blue to Dark Blue
  // ];

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
              <IonCol size="12" key={index}>
                <IonCard className="card" >
                  <IonCardHeader>
                    <IonCardTitle><IonIcon icon={personCircle} /> <b>Farmer Name:</b> {item.farmerFirstName}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonLabel><IonIcon icon={barcode} /> <span style={{ fontSize: '15px' }}><b>Fruits Id:</b></span>
                    {item.fruitsId}</IonLabel>
                    <IonButton expand="full" className="gradient-button" onClick={() => handleViewDetails(index)}>
                      {viewIndex === index ? "Hide" : "View"}
                    </IonButton>
                  </IonCardContent>

                  {viewIndex === index && (
                    <IonCardContent>
                      <IonLabel><IonIcon icon={document} /> <b>Application Document Id</b>: {item.applicationDocumentId}</IonLabel><br />
                      <IonLabel><IonIcon icon={call} /> <b>Mobile No:</b> {item.mobileNumber}</IonLabel><br />
                      <IonLabel><IonIcon icon={layers} /> <b>Category:</b> {item.categoryName}</IonLabel><br />
                      <IonLabel><IonIcon icon={wallet} /> <b>Head Account:</b> {item.headAccountName}</IonLabel><br />
                      <IonLabel><IonIcon icon={albums} /><b> Scheme:</b> {item.schemeName}</IonLabel><br />
                      <IonLabel><IonIcon icon={albums} /> <b>Sub Scheme:</b> {item.subSchemeName}</IonLabel><br />
                      <IonLabel><IonIcon icon={cash} /><b> Scheme Amount:</b> {item.schemeAmount}</IonLabel><br />
                      <IonLabel><IonIcon icon={location} /> <b>District:</b> {item.districtName}</IonLabel><br />
                      <IonLabel><IonIcon icon={pin} /> <b>Taluk:</b> {item.talukName}</IonLabel><br />
                      <IonLabel><IonIcon icon={pinOutline} /> <b>TSC:</b> {item.tscName}</IonLabel><br />
                      

                     

                      <IonButton
                        expand="full"
                        className="gradient-button"
                        onClick={() => handleUploadDocumentsClick(item.applicationDocumentId)}
                      >
                        <IonIcon icon={arrowForward} slot="start" />
                        Proceed
                      </IonButton>
                    </IonCardContent>
                  )}
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



// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonIcon, IonLabel, IonButtons, IonTextarea } from '@ionic/react';
// import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';
// import { API_URL_DBT_ } from '../../../services/auth.service';
// import { arrowBack, cloudUpload, personCircle, barcode, document, layers, wallet, albums, cash, location, pin, locationSharp } from 'ionicons/icons';
// import './ListPage.css';

// const ListPage: React.FC = () => {
//   const history = useHistory();
//   const location = useLocation(); // Used to get the selected reason from RejectPage
//   const [lists, setLists] = useState<any[]>([]);
//   const [viewIndex, setViewIndex] = useState<number | null>(null);
//   const [comment, setComment] = useState<string>(''); // State for storing the comment
//   const [rejectionReason, setRejectionReason] = useState<string>(''); // State for rejection reason

//   useEffect(() => {
//     fetchData();

//     // Capture rejection reason from RejectPage after redirect
//     const state: any = location.state;
//     if (state && state.rejectionReason) {
//       setRejectionReason(state.rejectionReason);
//     }
//   }, [location.state]); // Trigger this effect when location state changes

//   const fetchData = () => {
//     const fetchDetails = {
//       userMasterId: localStorage.getItem("userMasterId"),
//     };

//     const api = axios.create({
//       baseURL: API_URL_DBT_,
//     });

//     api.post(`dbt/v1/service/getInProgressTaskListByUserIdAndStepId?userId=${localStorage.getItem("userMasterId")}&stepId=2`, fetchDetails, {
//       headers: {
//         "Content-Type": "application/json",
//         accept: "*/*",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//       },
//     })
//     .then(res => {
//       setLists(res.data.content);
//     })
//     .catch(error => {
//       console.error("API Fetch Error:", error);
//     });
//   };

//   const handleViewDetails = (index: number) => {
//     setViewIndex(prevIndex => (prevIndex === index ? null : index));
//     setComment(''); // Clear the comment when changing views
//   };

//   const handleUploadDocumentsClick = (id: number, inspTaskId: number) => {
//     history.push(`/docu/${id}/${inspTaskId}`);
//   };

//   const handleRejectClick = (item: any) => {
//     // Pass rejectionReason when navigating to RejectPage
//     history.push('/reject', { rejectionReason });
//   };

//   const handleGoBack = () => {
//     history.goBack();
//   };

//   const handleCommentSubmit = () => {
//     const payload = {
//       comment,
//       rejectionReason,  // Send rejection reason with the comment
//     };
//     // Logic to submit the payload via API
//     console.log('Submitted Payload:', payload);
//     alert(`Comment and Rejection Reason Submitted: ${JSON.stringify(payload)}`);
//   };

//   const boxColors = [
//     'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',  // Coral to Peach
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
//     'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Light Blue to Dark Blue
//     'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
//     'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
//     'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // Purple to Blue
//   ];

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
//               <IonCol size="12" key={index}>
//                 <IonCard className="card" style={{ background: boxColors[index % boxColors.length] }}>
//                   <IonCardHeader>
//                     <IonCardTitle><IonIcon icon={personCircle} /> <b>Farmer Name:</b> {item.farmerFirstName}</IonCardTitle>
//                   </IonCardHeader>
//                   <IonCardContent>
//                     <IonLabel><IonIcon icon={barcode} /> <span style={{ fontSize: '15px' }}><b>Fruits Id:</b></span>
//                     {item.fruitsId}</IonLabel>
//                     <IonButton expand="full" className="gradient-button" onClick={() => handleViewDetails(index)}>
//                       {viewIndex === index ? "Hide" : "View"}
//                     </IonButton>
//                   </IonCardContent>

//                   {viewIndex === index && (
//                     <IonCardContent>
//                       <IonLabel><IonIcon icon={document} /> <b>Application Document Id</b>: {item.applicationDocumentId}</IonLabel><br />
//                       <IonLabel><IonIcon icon={layers} /> <b>Category:</b> {item.categoryName}</IonLabel><br />
//                       <IonLabel><IonIcon icon={wallet} /> <b>Head Account:</b> {item.headAccountName}</IonLabel><br />
//                       <IonLabel><IonIcon icon={albums} /><b> Scheme:</b> {item.schemeName}</IonLabel><br />
//                       <IonLabel><IonIcon icon={albums} /> <b>Sub Scheme:</b> {item.subSchemeName}</IonLabel><br />
//                       <IonLabel><IonIcon icon={cash} /><b> Scheme Amount:</b> {item.schemeAmount}</IonLabel><br />
//                       <IonLabel><IonIcon icon={locationSharp}/> <b>District:</b> {item.districtName}</IonLabel><br />
//                       <IonLabel><IonIcon icon={pin} /> <b>Taluk:</b> {item.talukName}</IonLabel><br />

//                       <IonButton
//                         expand="full"
//                         className="gradient-button"
//                         onClick={() => handleRejectClick(item)}
//                       >
//                         Reject
//                       </IonButton>

//                       <IonButton
//                         expand="full"
//                         className="gradient-button"
//                         onClick={() => handleUploadDocumentsClick(item.inspectionType, item.inspectionTaskId)}
//                       >
//                         <IonIcon icon={cloudUpload} slot="start" />
//                         Upload Documents
//                       </IonButton>

//                       {/* Comment Section */}
//                       <IonLabel><b>Comment:</b></IonLabel>
//                       <IonTextarea
//                         value={comment}
//                         onIonChange={(e) => setComment(e.detail.value!)}
//                         placeholder="Enter your comment here"
//                       ></IonTextarea>

//                       {/* Submit Button */}
//                       <IonButton
//                         expand="full"
//                         className="gradient-button"
//                         onClick={handleCommentSubmit}
//                       >
//                         Submit
//                       </IonButton>
//                     </IonCardContent>
//                   )}
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

