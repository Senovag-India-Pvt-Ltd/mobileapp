import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonImg, IonButtons, IonMenuButton, IonButton, IonIcon, useIonRouter } from '@ionic/react';
import './Home.css';
import { arrowBackOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const router=useIonRouter();
    const handleBack = () => {
    // Close the app
    router.back();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButton
            slot="end"
            onClick={handleBack}
             fill="clear"
           >
            <IonIcon icon={arrowBackOutline} className="back-icon"/>
          </IonButton>
          <IonTitle className="header-title">
            <b>Home</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="background">
        <div className="trapezoid"></div>
        <IonRow className="ion-padding">
          <IonCol>
            <div className="container">
              <div className="image-container">
                <IonImg
                  className="logo-round"
                  src="/assets/images/kg_logo.png"
                  alt="Department of Sericulture"
                />
              </div>
            </div>
            <div className="text-container" style={{ color: '#fff' }}>
              <h2><b>Department of Sericulture</b></h2>
              <h2 style={{ marginTop: '-10px' }}><b>Government of Karnataka</b></h2>
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;