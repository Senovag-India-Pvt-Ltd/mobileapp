


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
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const newPhotoUrls: string[] = [...photoUrls]; // Copy existing photoUrls
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = async () => {
          const imageDataUrl = reader.result as string;
          newPhotoUrls.push(imageDataUrl);
          if (newPhotoUrls.length === files.length + photoUrls.length) {
            setPhotoUrls(newPhotoUrls);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setPhotoUrls([]);
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
    if (photoUrls.length === 0) {
      setToastMessage('Please select at least one image first.');
      return;
    }

    const formData = new FormData();
    photoUrls.forEach((url, index) => {
      formData.append(`image_${index}`, url); // Change `image` to your desired key
    });

    try {
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToastMessage('Images uploaded successfully.');
        setPhotoUrls([]);
      } else {
        setToastMessage('Error uploading images. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setToastMessage('Error uploading images. Please try again.');
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
        setPhotoUrls([...photoUrls, capturedPhoto.webPath]);
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
        <div className="file-upload-container">
          <input type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} multiple />
          <IonButton onClick={handleCameraCapture} size="small">
            Capture Image
          </IonButton>
          <IonButton onClick={handleClear} size="small" color="danger" style={{ marginLeft: 'auto' }}>
            Clear
          </IonButton>
        </div>
        {photoUrls.length > 0 && (
          <div style={{ marginTop: '5px',textAlign:'center'}}>
            {photoUrls.map((url, index) => (
              <IonImg key={index} src={url} style={{ width: '400px', height: '400px' }} />
            ))}
          </div>
        )}
        <IonButton onClick={handleUpload} expand="block">
          Upload Images
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






