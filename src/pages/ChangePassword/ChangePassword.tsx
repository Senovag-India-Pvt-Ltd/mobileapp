import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../BidAccept/BidAccept.css';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import TimeTicker from '../../components/TimeTicker';
import { setErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';

const ChangePassword: React.FC = () => {

  const [iserror, setIserror] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [timeTickerKey, setTimeTickerKey] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const inputRefLot = useRef<HTMLIonInputElement>(null);


  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      const inputElement = inputRefLot.current?.querySelector('input');
      inputElement?.focus();
    }, 20); // Adjust the delay as needed
    const resumeListener = App.addListener('appStateChange', (state) => {
      if (state.isActive) {
        // App has resumed (come back to the foreground), resume your counter logic here
        console.log('App has resumed');
        setIsActive(true);
        // Increment the key to restart the TimeTicker component
        setTimeTickerKey((prevKey) => prevKey + 1);
        
      } else {
        // App has gone into the background, pause your counter logic here if needed
        console.log('App has gone into the background');
        setIsActive(false);
      }
    });

    // Cleanup function to remove the event listener
    return () => {
      resumeListener.remove();
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts


  const changePassword = () => {
    let token = localStorage.getItem("jwtToken");

    if(newPassword != confirmNewPassword){
      setMessage("New password and confirm new password doesn't match")
      setIserror(true)
    }else{

    const fetchHighestBidPayload = {
      "userMasterId": localStorage.getItem("userMasterId"),
      "currentPassword": currentPassword,
      "newPassword": newPassword
    }

    const api = axios.create({
      baseURL: `https://api.senovagseri.com/master-data/v1/userMaster`
    })

    api.post("/change-password", fetchHighestBidPayload, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        let contents = res.data.content;
        if (contents.error) {
          setMessage(contents.error_description);
          setIserror(true)
        } else {
          setMessage("Password changed successfully");
          setIsSuccess(true)
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setTimeout(() => {
            const inputElement = inputRefLot.current?.querySelector('input');
            inputElement?.focus();
          }, 20); 
          // if(localStorage.getItem("userType") == '2'){
          //   history.push("/bid/" + localStorage.getItem("username"));
          // }else{
          //   history.push("/accept-bid");
          // }
        }

      })
      .catch(error => {
        setMessage("Unable to change password");
        setIserror(true)
      })
    }

  }

  return (
    <IonPage>
       <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* Pass isActive prop to TimeTicker component */}
          <TimeTicker key={timeTickerKey} isActive={isActive} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput className="ion-text-left" value={currentPassword}  ref={inputRefLot} onIonInput={(e: any) => {
                setCurrentPassword(e.detail.value!);

              }}
                label="Current password" labelPlacement="stacked" fill="outline"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput type="password" className="ion-text-left" value={newPassword} onIonInput={(e: any) => {
                setNewPassword(e.detail.value!);
              }}
                label="New password" labelPlacement="stacked" fill="outline"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput type="password" className="ion-text-left" value={confirmNewPassword} onIonInput={(e: any) => {
                setConfirmNewPassword(e.detail.value!);
              }}
                label="Confirm new password" labelPlacement="stacked" fill="outline"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton id="click-for-details-btn" expand="full" size="large" onClick={changePassword}>Change password</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={iserror}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Error!"}
          message={message}
          buttons={["Dismiss"]}
        />
        <IonAlert
          isOpen={isSuccess}
          onDidDismiss={() => setIserror(false)}
          cssClass="my-custom-class"
          header={"Success!"}
          message={message}
          buttons={["Dismiss"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
