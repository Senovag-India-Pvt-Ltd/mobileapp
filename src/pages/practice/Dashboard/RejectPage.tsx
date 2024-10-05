import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea, IonButton, IonToast, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import './RejectPage.css';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import axios from 'axios';
import { API_URL_Master } from '../../../services/auth.service'; // Updated to use API_URL_Master

const RejectPage: React.FC = () => {
  const [rejectionReason, setRejectionReason] = useState<string>(''); // Rejection reason state
  const [comment, setComment] = useState<string>(''); // Comment state
  const [rejectionOptions, setRejectionOptions] = useState<any[]>([]); // List of rejection reasons from API
  const [fetchError, setFetchError] = useState<boolean>(false); // Fetch error state
  const [showToast, setShowToast] = useState<boolean>(false); // Toast for showing success or error
  const history = useHistory();

  useEffect(() => {
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

    fetchRejectionReasons();
  }, []);

  const handleRejectionChange = (value: string) => {
    setRejectionReason(value); // Set the selected rejection reason
  };

  const handleCommentChange = (e: any) => {
    setComment(e.detail.value); // Set the comment from textarea
  };

  const handleSubmit = async () => {
    if (!rejectionReason || !comment) {
      setShowToast(true); // Show toast if rejection reason or comment is missing
      return;
    }

    const payload = {
      rejectionReasonId: rejectionReason,
      comment,
      statusUpdate: 'rejected', // Example status update
    };

    try {
      const response = await axios.post(`${API_URL_Master}workflow/reject`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Successfully submitted:', response.data);
        // Navigate back or show success message
        setShowToast(true); // Show success toast
        history.goBack();
      } else {
        console.error('Error submitting data:', response);
        setShowToast(true); // Show error toast
      }
    } catch (error) {
      console.error('API error:', error);
      setShowToast(true); // Show error toast
    }
  };

  const handleGoBack = () => {
    history.goBack(); // Navigate back
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><b>Reject Page</b></IonTitle>
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
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Reject Reason</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {fetchError ? (
                    <p style={{ color: 'red' }}>Failed to fetch rejection reasons. Please try again later.</p>
                  ) : (
                    <IonSelect
                      value={rejectionReason}
                      placeholder="Select reason for rejection"
                      onIonChange={e => handleRejectionChange(e.detail.value!)}
                    >
                      {rejectionOptions.map((option) => (
                        <IonSelectOption key={option.rejectReasonWorkFlowMasterId} value={option.rejectReasonWorkFlowMasterId}>
                          {option.reason}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  )}

                  {/* Comment box */}
                  <IonTextarea
                    value={comment}
                    placeholder="Enter your comment here"
                    onIonChange={handleCommentChange}
                  />

                  {/* Submit button */}
                  <IonButton expand="full" onClick={handleSubmit}>
                    Submit
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Toast for success or error */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={!rejectionReason || !comment ? "Please select a rejection reason and enter a comment" : "Submission successful"}
          duration={2000}
          color={!rejectionReason || !comment ? "danger" : "success"}
        />
      </IonContent>
    </IonPage>
  );
};

export default RejectPage;
