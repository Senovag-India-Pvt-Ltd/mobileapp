






// import React, { useState, useEffect } from 'react';
// import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonToast, IonIcon, IonInput, IonLabel } from '@ionic/react';
// import axios from 'axios';
// import { useParams, useHistory } from 'react-router-dom';
// import './DocPage.css';
// import DocumentUpload from './DocumentUpload'; 
// import { API_URL_DBT, API_URL_Inspection, API_URL_Master } from '../../../services/auth.service';
// import { arrowBack } from 'ionicons/icons';

// const DocPage: React.FC = () => {
//   const { inspectionType, inspectionTaskId, requestTypeId } = useParams<{ inspectionType: string; inspectionTaskId: string; requestTypeId: string }>();
//   const history = useHistory();
//   const [documents, setDocuments] = useState<any[]>([]);
//   const [currentLocation, setCurrentLocation] = useState<{ latitude: string; longitude: string }>({ latitude: '', longitude: '' });
//   const [required, setRequired] = useState<boolean>(false);
//   const [comment, setComment] = useState<string>('');
//   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
//   const [submitError, setSubmitError] = useState<boolean>(false);

//   useEffect(() => {
//     fetchData();
//     fetchCurrentLocation(); 
//   }, []);




  
//   const fetchData = () => {
//     const api = axios.create({
//       baseURL: API_URL_Master, // Assuming this is your base URL for the new API
//     });

//     api.get('master-data/v1/documentMaster/get-all', {
//       headers: {
//         'Content-Type': 'application/json',
//         accept: '*/*',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//     })
//       .then((res) => {
//         // Adjust the state to use the correct structure
//         setDocuments(res.data.content?.documentMaster || []);
//       })
//       .catch((error) => {
//         console.error('Error fetching documents:', error);
//       });
//   };

//   // const fetchLocationData = () => {
//   //   const api = axios.create({
//   //     baseURL: API_URL_Inspection,
//   //   });

//   //   api.get(`inspection/v1/inspectionTypeGps/get-by-inspection-type/${inspectionType}`, {
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       accept: '*/*',
//   //       Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//   //     },
//   //   })
//   //     .then((res) => {
//   //       setRequired(res.data.content?.isRequired || false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching location data:', error);
//   //     });
//   // };

//   const fetchCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString(),
//           });
//         },
//         (error) => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   const updateInspectionTaskStatus = () => {
//     const api = axios.create({
//       baseURL: API_URL_Inspection,
//     });

//     const requestBody = {
//       inspectionTaskId: inspectionTaskId,
//       inspectionType: inspectionType,
//       comment: comment,
//       latitude: currentLocation.latitude,
//       longitude: currentLocation.longitude,
//     };

//     api.post('inspection/v1/inspectionTask/update-status', requestBody, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//     })
//       .then((res) => {
//         console.log('API Response:', res.data);
//       })
//       .catch((error) => {
//         console.error('Error updating inspection task status:', error);
//         setSubmitError(true);
//         setTimeout(() => setSubmitError(false), 3000);
//       });
//   };

//   const handleSubmit = () => {
//     updateInspectionTaskStatus();
//     setSubmitSuccess(true);
//     setTimeout(() => setSubmitSuccess(false), 3000);
//   };

//   const boxColors = ['linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',  // Coral to Peach
    
//     'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Light Blue to Dark Blue
//     'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Purple to Blue
//     'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
    
//   ];

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle><b>Documents</b></IonTitle>
//           <IonButtons slot="end">
//             <IonButton onClick={() => history.goBack()}>
//               <IonIcon icon={arrowBack} />
//               Go Back
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonGrid>
//           <IonRow>
//             {documents.length > 0 ? (
//               documents.map((item, index) => (
//                 <IonCol size="5.9" key={index}>
//                   <IonCard className="notification-bar" style={{ background: boxColors[index % boxColors.length] }}>
//                     <IonCardHeader>
//                       <IonCardTitle>Documents: {item.documentMasterName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent>
//                       <DocumentUpload onUpload={(file) => console.log(file)} docId={item.documentMasterId} />
//                     </IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             ) : (
//               <IonCol size="12">
//                 <p>No documents available.</p>
//               </IonCol>
//             )}
//           </IonRow>
//         </IonGrid>

//         {/* Toasts */}
//         <IonToast
//           isOpen={submitSuccess}
//           onDidDismiss={() => setSubmitSuccess(false)}
//           message="Successfully submitted"
//           duration={3000}
//         />

//         <IonToast
//           isOpen={submitError}
//           onDidDismiss={() => setSubmitError(false)}
//           message="Error submitting. Please try again."
//           duration={3000}
//           color="danger"
//         />

//         {/* Comment and Location */}
//         <IonGrid>
//           <IonRow>
//             <IonCol size="12">
//               <IonLabel><b>Comment:</b></IonLabel>
//               <IonInput
//                 value={comment}
//                 placeholder="Enter comment here"
//                 onIonChange={(e) => setComment(e.detail.value!)}
//               />
//             </IonCol>

//             {/* Styled Location Section */}
//             <IonCol size="12" className="location-container">
//               <div className="location-box">
//                 <IonLabel className="location-label"><b>Current Location</b></IonLabel>
//                 <IonRow>
//                   <IonCol size="6">
//                     <IonInput value={currentLocation.latitude} placeholder="Latitude" disabled />
//                   </IonCol>
//                   <IonCol size="6">
//                     <IonInput value={currentLocation.longitude} placeholder="Longitude" disabled />
//                   </IonCol>
//                 </IonRow>
//               </div>
//             </IonCol>
//           </IonRow>
//         </IonGrid>

//         <IonButton expand="full" color="primary" onClick={handleSubmit}>Submit</IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default DocPage;







// import React, { useState, useEffect } from 'react';
// import {
//   IonContent,
//   IonPage,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonButton,
//   IonButtons,
//   IonHeader,
//   IonMenuButton,
//   IonTitle,
//   IonToolbar,
//   IonToast,
//   IonIcon,
//   IonInput,
//   IonLabel,
//   IonSelect,
//   IonSelectOption,
// } from '@ionic/react';
// import axios from 'axios';
// import { useParams, useHistory } from 'react-router-dom';
// import './DocPage.css';
// import DocumentUpload from './DocumentUpload';
// import { API_URL_DBT, API_URL_Inspection, API_URL_Master } from '../../../services/auth.service';
// import { arrowBack } from 'ionicons/icons';

// const DocPage: React.FC = () => {
//   const { inspectionType, inspectionTaskId, requestTypeId } = useParams<{
//     inspectionType: string;
//     inspectionTaskId: string;
//     requestTypeId: string;
//   }>();
//   const history = useHistory();
//   const [documents, setDocuments] = useState<any[]>([]);
//   const [currentLocation, setCurrentLocation] = useState<{ latitude: string; longitude: string }>({
//     latitude: '',
//     longitude: '',
//   });
//   const [required, setRequired] = useState<boolean>(false);
//   const [comment, setComment] = useState<string>('');
//   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
//   const [submitError, setSubmitError] = useState<boolean>(false);

//   // Rejection reason related states
//   const [rejectionReason, setRejectionReason] = useState<string>(''); // Rejection reason state
//   const [rejectionOptions, setRejectionOptions] = useState<any[]>([]); // List of rejection reasons from API
//   const [fetchError, setFetchError] = useState<boolean>(false); // Fetch error state

//   useEffect(() => {
//     fetchData();
//     fetchCurrentLocation();
//     fetchRejectionReasons(); // Fetch rejection reasons
//   }, []);

//   const fetchRejectionReasons = async () => {
//     try {
//       const response = await axios.get(`${API_URL_Master}master-data/v1/rejectReasonWorkFlowMaster/get-all`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//         },
//       });

//       if (response.data && response.data.content) {
//         setRejectionOptions(response.data.content.rejectReasonWorkFlowMaster);
//       } else {
//         console.error('Unexpected API response format:', response);
//         setFetchError(true);
//       }
//     } catch (error) {
//       console.error('Error fetching rejection reasons:', error);
//       setFetchError(true);
//     }
//   };

//   const fetchData = () => {
//     const api = axios.create({
//       baseURL: API_URL_Master,
//     });

//     api.get('master-data/v1/documentMaster/get-all', {
//       headers: {
//         'Content-Type': 'application/json',
//         accept: '*/*',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//     })
//       .then((res) => {
//         setDocuments(res.data.content?.documentMaster || []);
//       })
//       .catch((error) => {
//         console.error('Error fetching documents:', error);
//       });
//   };

//   const fetchCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString(),
//           });
//         },
//         (error) => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   const updateInspectionTaskStatus = () => {
//     const api = axios.create({
//       baseURL: API_URL_Inspection,
//     });

//     const requestBody = {
//       inspectionTaskId: inspectionTaskId,
//       inspectionType: inspectionType,
//       comment: comment,
//       latitude: currentLocation.latitude,
//       longitude: currentLocation.longitude,
//     };

//     api.post('inspection/v1/inspectionTask/update-status', requestBody, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//     })
//       .then((res) => {
//         console.log('API Response:', res.data);
//       })
//       .catch((error) => {
//         console.error('Error updating inspection task status:', error);
//         setSubmitError(true);
//         setTimeout(() => setSubmitError(false), 3000);
//       });
//   };

//   const handleSubmit = () => {
//     updateInspectionTaskStatus();
//     setSubmitSuccess(true);
//     setTimeout(() => setSubmitSuccess(false), 3000);
//   };

//   const handleRejectionChange = (value: string) => {
//     setRejectionReason(value); // Set the selected rejection reason
//   };

//   const boxColors = [
//     'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', // Coral to Peach
//     'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Light Blue to Dark Blue
//     'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', // Green to Light Green
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Purple to Blue
//     'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', // Orange to Red
//     'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', // Red to Dark Purple
//   ];

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>
//             <b>Documents</b>
//           </IonTitle>
//           <IonButtons slot="end">
//             <IonButton onClick={() => history.goBack()}>
//               <IonIcon icon={arrowBack} />
//               Go Back
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent>
//         <IonGrid>
//           <IonRow>
//             {/* Rejection Reason Selection */}

//             <IonCol size="12">
//             <IonLabel>
//     <b>Reject Reason:</b>
//   </IonLabel>
//               {fetchError ? (
//                 <p style={{ color: 'red' }}>Failed to fetch rejection reasons. Please try again later.</p>
//               ) : (
//                 <IonSelect
//                   value={rejectionReason}
//                   placeholder="Select reason for rejection"
//                   onIonChange={(e) => handleRejectionChange(e.detail.value!)}
//                 >
//                   {rejectionOptions.map((option) => (
//                     <IonSelectOption key={option.rejectReasonWorkFlowMasterId} value={option.rejectReasonWorkFlowMasterId}>
//                       {option.reason}
//                     </IonSelectOption>
//                   ))}
//                 </IonSelect>
//               )}
//             </IonCol>

//             {/* Documents Section */}
//             {documents.length > 0 ? (
//               documents.map((item, index) => (
//                 <IonCol size="5.9" key={index}>
//                   <IonCard className="notification-bar" style={{ background: boxColors[index % boxColors.length] }}>
//                     <IonCardHeader>
//                       <IonCardTitle>Documents: {item.documentMasterName}</IonCardTitle>
//                     </IonCardHeader>
//                     <IonCardContent>
//                       <DocumentUpload onUpload={(file) => console.log(file)} docId={item.documentMasterId} />
//                     </IonCardContent>
//                   </IonCard>
//                 </IonCol>
//               ))
//             ) : (
//               <IonCol size="12">
//                 <p>No documents available.</p>
//               </IonCol>
//             )}
//           </IonRow>
//         </IonGrid>

//         {/* Toasts */}
//         <IonToast
//           isOpen={submitSuccess}
//           onDidDismiss={() => setSubmitSuccess(false)}
//           message="Successfully submitted"
//           duration={3000}
//         />

//         <IonToast
//           isOpen={submitError}
//           onDidDismiss={() => setSubmitError(false)}
//           message="Error submitting. Please try again."
//           duration={3000}
//           color="danger"
//         />

//         {/* Comment and Location */}
//         <IonGrid>
//           <IonRow>
//             <IonCol size="12">
//               <IonLabel>
//                 <b>Comment:</b>
//               </IonLabel>
//               <IonInput
//                 value={comment}
//                 placeholder="Enter comment here"
//                 onIonChange={(e) => setComment(e.detail.value!)}
//               />
//             </IonCol>

//             {/* Styled Location Section */}
//             <IonCol size="12" className="location-container">
//               <div className="location-box">
//                 <IonLabel className="location-label">
//                   <b>Current Location</b>
//                 </IonLabel>
//                 <IonRow>
//                   <IonCol size="6">
//                     <IonInput value={currentLocation.latitude} placeholder="Latitude" disabled />
//                   </IonCol>
//                   <IonCol size="6">
//                     <IonInput value={currentLocation.longitude} placeholder="Longitude" disabled />
//                   </IonCol>
//                 </IonRow>
//               </div>
//             </IonCol>

//             {/* Submit Button */}
//             <IonCol size="12">
//               <IonButton expand="block" onClick={handleSubmit}>
//                 Submit
//               </IonButton>
//             </IonCol>
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default DocPage;






import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonToast,
  IonIcon,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
} from '@ionic/react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './DocPage.css';
import DocumentUpload from './DocumentUpload';
import { API_URL_DBT, API_URL_DBT_, API_URL_Inspection, API_URL_Master } from '../../../services/auth.service';
import { arrowBack } from 'ionicons/icons';

const DocPage: React.FC = () => {
  // const { inspectionType, inspectionTaskId, requestTypeId } = useParams<{
  //   inspectionType: string;
  //   inspectionTaskId: string;
  //   requestTypeId: string;
  // }>();
  const {applicationDocumentId} = useParams<{applicationDocumentId:string}>()
  const history = useHistory();
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: string; longitude: string }>({
    latitude: '',
    longitude: '',
  });
  const [comment, setComment] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  // Rejection reasons
  const [rejectionReason, setRejectionReason] = useState<string>(''); // Rejection reason state
  const [rejectionOptions, setRejectionOptions] = useState<any[]>([]); // List of rejection reasons from API
  const [fetchError, setFetchError] = useState<boolean>(false); // Fetch error state

    // Usernames
    const [usernames, setUsernames] = useState<any[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string>(''); // Selected username
     // Nextsteps
     const [nextsteps, setNextsteps] = useState<any[]>([]);
     const [selectedNextstep, setSelectedNextstep] = useState<string>(''); // Selected username
     const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDocuments();
    fetchCurrentLocation();
    fetchRejectionReasons();
    fetchUsernames();
    fetchNextsteps();
  }, []);

  const fetchDocuments = () => {
    axios
      .get(`${API_URL_Master}master-data/v1/documentMaster/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((res) => {
        setDocuments(res.data.content?.documentMaster || []);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchRejectionReasons = async () => {
    try {
      const response = await axios.get(`${API_URL_Master}master-data/v1/rejectReasonWorkFlowMaster/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (response.data && response.data.content) {
        setRejectionOptions(response.data.content.rejectReasonWorkFlowMaster);
      } else {
        console.error('Unexpected API response format:', response);
        setFetchError(true);
      }
    } catch (error) {
      console.error('Error fetching rejection reasons:', error);
      setFetchError(true);
    }
  };


  // Fetch usernames from the API
  const fetchUsernames = async () => {
    try {
      const response = await axios.get(`${API_URL_Master}master-data/v1/userMaster/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (response.data && response.data.content) {
        setUsernames(response.data.content.userMaster || []);
      } else {
        console.error('Unexpected API response format:', response);
      }
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  // Fetch nextstep from the API
  const fetchNextsteps = async () => {
    try {
      const response = await axios.get(`${API_URL_Master}master-data/v1/scApprovalStage/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (response.data && response.data.content) {
        setNextsteps(response.data.content.scApprovalStage || []);
      } else {
        console.error('Unexpected API response format:', response);
      }
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  

  const handleRejectionChange = (value: string) => {
    setRejectionReason(value); // Set the selected rejection reason
  };

  const handleUsernameChange = (value: string) => {
    setSelectedUsername(value); // Set the selected username
  };
  const handleNextstepChange = (value: string) => {
    setSelectedNextstep(value); // Set the selected nextstep
  };



  const updateInspectionTaskStatus = () => {
    // Construct the payload dynamically based on selected values
    const requestBody: any = {
      applicationFormId: applicationDocumentId, // Replace with actual ID or state if dynamic
      lat: currentLocation.latitude,
      lon: currentLocation.longitude,
      description: comment || "Field Verification", // Default if no comment
    };
  
    if (rejectionReason) {
      requestBody.rejectedReasonId = parseInt(rejectionReason); // Add if rejection reason is selected
    }
  
    if (selectedUsername) {
      requestBody.userId = parseInt(selectedUsername); // Add if username is selected
    }
  
    if (selectedNextstep) {
      requestBody.stepId = parseInt(selectedNextstep); // Add if next step is selected
    }
  
    // Send the API request
    axios
      .post(`${API_URL_DBT_}dbt/v1/service/inspectionUpdate`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((res) => {
        console.log('API Response:', res.data);
        setSubmitSuccess(true);
        setTimeout(() => {setSubmitSuccess(false);history.push('/dash');window.location.reload();}, 3000);
      })
      .catch((error) => {
        console.error('Error updating inspection task status:', error);
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 3000);
      });
  };
  
  
  
  const handleSubmit = () => {
    updateInspectionTaskStatus();
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleDocumentSelect = (value: string) => {
    const selected = documents.find((doc) => doc.documentMasterId === value);
    setSelectedDocument(selected || null);
  };


  const filteredUsernames = usernames.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <b>Documents</b>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
              Go Back
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <b>Select Rejection Reason:</b>
              </IonLabel>
              {fetchError ? (
                <p style={{ color: 'red' }}>Failed to fetch rejection reasons. Please try again later.</p>
              ) : (
                <IonSelect
                  value={rejectionReason}
                  placeholder="Select reason for rejection"
                  onIonChange={(e) => handleRejectionChange(e.detail.value!)}
                >
                  <IonSelectOption value="">None</IonSelectOption> {/* Option to deselect */}
                  {rejectionOptions.map((option) => (
                    <IonSelectOption key={option.rejectReasonWorkFlowMasterId} value={option.rejectReasonWorkFlowMasterId}>
                      {option.reason}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
            </IonCol>

            {/* Document Selection Dropdown */}
            <IonCol size="12">
              <IonLabel>
                <b>Select Document:</b>
              </IonLabel>
              <IonSelect
                value={selectedDocument?.documentMasterId || ''}
                placeholder="Select a document"
                onIonChange={(e) => handleDocumentSelect(e.detail.value!)}
              >
                <IonSelectOption value="">None</IonSelectOption> {/* Option to deselect */}
                {documents.map((doc) => (
                  <IonSelectOption key={doc.documentMasterId} value={doc.documentMasterId}>
                    {doc.documentMasterName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>

            {/* Show Card for Selected Document */}
            {selectedDocument && (
              <IonCol size="8">
                <IonCard className="notification-bar" >
                  <IonCardHeader>
                    <IonCardTitle>Documents: {selectedDocument.documentMasterName}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <DocumentUpload onUpload={(file) => console.log(file)} docId={selectedDocument.documentMasterId} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>

        {/* Comment and Location */}
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <b>Comment:</b>
              </IonLabel>
              <IonInput
                value={comment}
                placeholder="Enter comment here"
                onIonChange={(e) => setComment(e.detail.value!)}
              />
            </IonCol>

              {/* Username Dropdown */}
              {/* <IonCol size="12">
              <IonLabel>
                <b>Select Username:</b>
              </IonLabel>
              <IonSelect
                value={selectedUsername}
                placeholder="Select a username"
                onIonChange={(e) => handleUsernameChange(e.detail.value!)}
              >
                <IonSelectOption value="">None</IonSelectOption>
                {usernames.map((user) => (
                  <IonSelectOption key={user.userMasterId} value={user.userMasterId}>
                                       {user.username}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol> */}

<IonCol size="12">
  <IonLabel>
    <b>Select Username:</b>
  </IonLabel>
  
  {/* Searchbar for filtering usernames */}
  <IonSearchbar
    value={searchTerm}
    onIonInput={e => setSearchTerm(e.detail.value!)}
    placeholder="Search for a username"
    className="custom-searchbar"
  />

  <IonSelect
    value={selectedUsername}
    placeholder="Select a username"
    onIonChange={e => handleUsernameChange(e.detail.value!)}
  >
    <IonSelectOption value="">None</IonSelectOption>
    {filteredUsernames.map(user => (
      <IonSelectOption key={user.userMasterId} value={user.userMasterId}>
        {user.username}
      </IonSelectOption>
    ))}
  </IonSelect>
</IonCol>



            {/* Username Dropdown */}
            <IonCol size="12">
              <IonLabel>
                <b>Select NextStep:</b>
              </IonLabel>
              <IonSelect
                value={selectedNextstep}
                placeholder="Select a NextStep"
                onIonChange={(e) => handleNextstepChange(e.detail.value!)}
              >
                <IonSelectOption value="">None</IonSelectOption>
                {nextsteps.map((user) => (
                  <IonSelectOption key={user.scApprovalStageId} value={user.scApprovalStageId}>
                                       {user.stageName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
           

            {/* Styled Location Section */}
            <IonCol size="12" className="location-container">
              <div className="location-box">
                <IonLabel className="location-label">
                  <b>Current Location</b>
                </IonLabel>
                <IonRow>
                  <IonCol size="6">
                    <IonInput value={currentLocation.latitude} placeholder="Latitude" disabled />
                  </IonCol>
                  <IonCol size="6">
                    <IonInput value={currentLocation.longitude} placeholder="Longitude" disabled />
                  </IonCol>
                </IonRow>
              </div>
            </IonCol>

            {/* Submit Button */}
            <IonCol size="12">
              <IonButton expand="block" onClick={handleSubmit}>
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Toasts */}
      <IonToast
        isOpen={submitSuccess}
        onDidDismiss={() => setSubmitSuccess(false)}
        message="Successfully submitted"
        duration={3000}
      />

      <IonToast
        isOpen={submitError}
        onDidDismiss={() => setSubmitError(false)}
        message="Error submitting data"
        duration={3000}
      />
    </IonPage>
  );
};

export default DocPage;





