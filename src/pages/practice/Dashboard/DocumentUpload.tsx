

// import { camera } from 'ionicons/icons';
// import React, { useState, useRef } from 'react';
// import { IonButton, IonSelect, IonSelectOption, IonImg, IonIcon, IonToast } from '@ionic/react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL_Inspection } from '../../../services/auth.service';
// import { Capacitor, Plugins } from '@capacitor/core';
// import { CameraResultType, CameraSource } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';

// interface DocumentUploadProps {
//   onUpload: (file: File) => void;
//   docId: number;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, docId }) => {
//   const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string; inspectionType: string }>();
//   const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
//   const [showUpload, setShowUpload] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
//   const [uploadError, setUploadError] = useState<boolean>(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
//       setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFiles.length === 0) {
//         console.error('No files selected.');
//         return;
//       }

//       const api = axios.create({
//         baseURL: API_URL_Inspection,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//         },
//       });

//       const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;

//       for (const file of selectedFiles) {
//         let uploadFile: File | null = null;

//         if (file.startsWith('data:image')) {
//           const blob = await fetch(file).then((r) => r.blob());
//           uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
//         } else {
//           const response = await fetch(file);
//           const blob = await response.blob();
//           uploadFile = new File([blob], 'selectedFile.jpg', { type: 'image/jpeg' });
//         }

//         if (!uploadFile) {
//           console.error('Error creating upload file.');
//           continue;
//         }

//         const formData = new FormData();
//         formData.append('multipartFile', uploadFile);

//         await api.post(`/inspection/v1/inspectionTaskDocument/upload?${parameters}`, formData);

//         onUpload(uploadFile);
//       }

//       setUploadSuccess(true);
//       setTimeout(() => setUploadSuccess(false), 3000);

//       setSelectedFiles([]);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       setUploadError(true);
//       setTimeout(() => setUploadError(false), 3000);
//     }
//   };

//   const handleCameraCapture = async () => {
//     try {
//       const capturedPhoto = await Plugins.Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//       });

//       if (capturedPhoto && capturedPhoto.webPath) {
//         setSelectedFiles((prevFiles) => [...prevFiles, capturedPhoto.webPath]);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       }
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const handleClear = () => {
//     setSelectedFiles([]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSelectChange = (value: string) => {
//     setShowUpload(value === 'yes');
//     setSelectedFiles([]); // Clear selected files on change
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div>
//       <IonSelect value={showUpload ? 'yes' : 'no'} onIonChange={(e) => handleSelectChange(e.detail.value)}>
//         <IonSelectOption value="yes">Yes</IonSelectOption>
//         <IonSelectOption value="no">No</IonSelectOption>
//       </IonSelect>
//       {showUpload && (
//         <>
//           <label htmlFor="fileInput">(Max:2mb)</label>
//           <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
//           <IonButton onClick={handleCameraCapture} className='cld'>
//             <IonIcon icon={camera} slot="icon-only" />
//           </IonButton>
//           {selectedFiles.length > 0 && <IonButton onClick={handleUpload}>Upload</IonButton>}
//           {selectedFiles.length > 0 && <IonButton onClick={handleClear}>Clear</IonButton>}
//         </>
//       )}

//       <IonToast
//         isOpen={uploadSuccess}
//         onDidDismiss={() => setUploadSuccess(false)}
//         message="Successfully uploaded"
//         duration={3000}
//       />
//       <IonToast
//         isOpen={uploadError}
//         onDidDismiss={() => setUploadError(false)}
//         message="Error uploading files. Please try again."
//         duration={3000}
//         color="danger"
//       />
//       {selectedFiles.map((file, index) => (
//         <IonImg key={index} src={file} ref={imageRef} />
//       ))}
//     </div>
//   );
// };

// export default DocumentUpload;








// import { camera } from 'ionicons/icons';
// import React, { useState, useRef } from 'react';
// import { IonButton, IonIcon, IonToast, IonModal, IonImg, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL_Inspection } from '../../../services/auth.service';
// import { Plugins } from '@capacitor/core';
// import { CameraResultType, CameraSource } from '@capacitor/camera';

// interface DocumentUploadProps {
//   onUpload: (file: File) => void;
//   docId: number;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, docId }) => {
//   const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string; inspectionType: string }>();
//   const [selectedFiles, setSelectedFiles] = useState<{ url: string; name: string }[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
//   const [uploadError, setUploadError] = useState<boolean>(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const filesArray = Array.from(event.target.files).map((file) => ({
//         url: URL.createObjectURL(file),
//         name: file.name,
//       }));
//       setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFiles.length === 0) {
//         console.error('No files selected.');
//         return;
//       }

//       const api = axios.create({
//         baseURL: API_URL_Inspection,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//         },
//       });

//       const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;

//       for (const file of selectedFiles) {
//         let uploadFile: File | null = null;

//         if (file.url.startsWith('data:image')) {
//           const blob = await fetch(file.url).then((r) => r.blob());
//           uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
//         } else {
//           const response = await fetch(file.url);
//           const blob = await response.blob();
//           uploadFile = new File([blob], file.name, { type: 'image/jpeg' });
//         }

//         if (!uploadFile) {
//           console.error('Error creating upload file.');
//           continue;
//         }

//         const formData = new FormData();
//         formData.append('multipartFile', uploadFile);

//         await api.post(`/inspection/v1/inspectionTaskDocument/upload?${parameters}`, formData);

//         onUpload(uploadFile);
//       }

//       setUploadSuccess(true);
//       setTimeout(() => setUploadSuccess(false), 3000);

//       setSelectedFiles([]);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       setUploadError(true);
//       setTimeout(() => setUploadError(false), 3000);
//     }
//   };

//   const handleCameraCapture = async () => {
//     try {
//       const capturedPhoto = await Plugins.Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.Uri,
//         source: CameraSource.Camera,
//       });

//       if (capturedPhoto && capturedPhoto.webPath) {
//         setSelectedFiles((prevFiles) => [...prevFiles, { url: capturedPhoto.webPath, name: 'capturedImage.jpg' }]);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       }
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const handleClear = () => {
//     setSelectedFiles([]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleViewFile = (url: string) => {
//     setModalImageUrl(url);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setModalImageUrl(null);
//   };

//   return (
//     <div>
//       <label htmlFor="fileInput">(Max:2mb)</label>
//       <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
//       <IonButton onClick={handleCameraCapture} className='cld'>
//         <IonIcon icon={camera} slot="icon-only" />
//       </IonButton>
//       {selectedFiles.length > 0 && (
//         <>
//           <IonButton onClick={handleUpload}>Upload</IonButton>
//           <IonButton onClick={handleClear}>Clear</IonButton>
//           {selectedFiles.map((file, index) => (
//             <IonButton key={index} onClick={() => handleViewFile(file.url)}>View {index + 1}</IonButton>
//           ))}
//         </>
//       )}

//       <IonToast
//         isOpen={uploadSuccess}
//         onDidDismiss={() => setUploadSuccess(false)}
//         message="Successfully uploaded"
//         duration={3000}
//       />
//       <IonToast
//         isOpen={uploadError}
//         onDidDismiss={() => setUploadError(false)}
//         message="Error uploading files. Please try again."
//         duration={3000}
//         color="danger"
//       />

//       <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle>View Image</IonTitle>
//             <IonButton slot="end" onClick={handleCloseModal}>Close</IonButton>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent>
//           {modalImageUrl && <IonImg src={modalImageUrl} />}
//         </IonContent>
//       </IonModal>
//     </div>
//   );
// };

// export default DocumentUpload;





//Back button added in this code

import { brushSharp, camera, eyeOutline, eyeSharp, fileTrayStackedOutline, imageOutline, trashSharp } from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { IonButton, IonIcon, IonToast, IonModal, IonImg, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL_Inspection } from '../../../services/auth.service';
import { Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  docId: number;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, docId }) => {
  const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string; inspectionType: string }>();
  const [selectedFiles, setSelectedFiles] = useState<{ url: string; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFile, setModalFile] = useState<{ url: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFiles.length === 0) {
        console.error('No files selected.');
        return;
      }

      const api = axios.create({
        baseURL: API_URL_Inspection,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;

      for (const file of selectedFiles) {
        let uploadFile: File | null = null;

        if (file.url.startsWith('data:image')) {
          const blob = await fetch(file.url).then((r) => r.blob());
          uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
        } else {
          const response = await fetch(file.url);
          const blob = await response.blob();
          uploadFile = new File([blob], file.name, { type: blob.type });
        }

        if (!uploadFile) {
          console.error('Error creating upload file.');
          continue;
        }

        const formData = new FormData();
        formData.append('multipartFile', uploadFile);
        await api.post(`/inspection/v1/inspectionTaskDocument/upload?${parameters}`, formData);
  
        onUpload(uploadFile);
      }

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError(true);
      setTimeout(() => setUploadError(false), 3000);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const capturedPhoto = await Plugins.Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (capturedPhoto && capturedPhoto.webPath) {
        setSelectedFiles((prevFiles) => [...prevFiles, { url: capturedPhoto.webPath, name: 'capturedImage.jpg' }]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const handleClear = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleViewFile = (file: { url: string; name: string }) => {
    if (file.name.endsWith('.pdf')) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    } else {
      setModalFile(file);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalFile(null);
  };

  return (
    <div>
      <label htmlFor="fileInput">(Max:2mb)</label>
      <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
      <IonButton onClick={handleCameraCapture} className='cld'>
        <IonIcon icon={camera} slot="icon-only" />
      </IonButton>
      {selectedFiles.length > 0 && (
        <>
          <IonButton onClick={handleUpload}>Upload</IonButton>
          <IonButton onClick={handleClear} className='bd'><IonIcon icon={trashSharp} slot="icon-only" /></IonButton>
          {selectedFiles.map((file, index) => (
            <IonButton key={index} onClick={() => handleViewFile(file)} className='bd'><IonIcon icon={eyeSharp} slot="icon-only" />{index + 1}</IonButton>
          ))}
        </>
      )}

      <IonToast
        isOpen={uploadSuccess}
        onDidDismiss={() => setUploadSuccess(false)}
        message="Successfully uploaded"
        duration={3000}
      />
      <IonToast
        isOpen={uploadError}
        onDidDismiss={() => setUploadError(false)}
        message="Error uploading files. Please try again."
        duration={3000}
        color="danger"
      />

      <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>View File</IonTitle>
            <IonButton slot="end" onClick={handleCloseModal}>Close</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {modalFile && !modalFile.name.endsWith('.pdf') && <IonImg src={modalFile.url} />}
        </IonContent>
      </IonModal>
    </div>
  );
};

export default DocumentUpload;





