

import React, { useState, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonToast,
  IonMenuButton,
  IonButtons,
} from '@ionic/react';
import { Capacitor, Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import './upload.css';
import { App } from '@capacitor/app';
import { useHistory } from 'react-router';

const { Camera } = Plugins;

const UploadImagePage: React.FC = () => {
  const history = useHistory();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const imageDataUrl = reader.result as string;
        setPhotoUrl(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

 

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setPhotoUrl(undefined);
    }
  };

  if (Capacitor.isNative) {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack || location.pathname === '/upload') {
        App.exitApp();
      } else {
        history.goBack();
      }
    });
  }

  const handleUpload = async () => {
    if (!photoUrl) {
      setToastMessage('Please select an image first.');
      return;
    }

    
    const formData = new FormData();
    formData.append('image', photoUrl);

    try {
      //'_API_ENDPOINT'
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToastMessage('Image uploaded successfully.');
      } else {
        setToastMessage('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setToastMessage('Error uploading image. Please try again.');
    }
  };

  const handleCameraCapture = async () => {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (capturedPhoto && capturedPhoto.webPath) {
        setPhotoUrl(capturedPhoto.webPath); 
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <IonPage> 
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
        <IonMenuButton/>
        </IonButtons>
          <IonTitle>Upload Image</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}> */}
        <div className="file-upload-container">
          <input type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} />
          <IonButton onClick={handleCameraCapture} size="small">
            Capture Image
          </IonButton>
          <IonButton onClick={handleClear} size="small" color="danger" style={{ marginLeft: 'auto' }}>
            Clear
          </IonButton>
        
        </div>
        {photoUrl && (
          <div className='image-container'>
            <IonImg src={photoUrl} style={{ width: '400px', height: '400px' }} />
          </div>
        )}
        <IonButton onClick={handleUpload} expand="block">
          Upload Image
        </IonButton>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default UploadImagePage;





