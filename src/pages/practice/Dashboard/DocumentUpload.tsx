
// import React, { useState, useRef } from 'react';
// import { IonButton, IonSelect, IonSelectOption } from '@ionic/react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL_Inspection } from '../../../services/auth.service';

// interface DocumentUploadProps {
//   onUpload: (file: File) => void;
//   docId: number
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload,docId }) => {
//   const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string, inspectionType: string }>();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [showUpload, setShowUpload] = useState<boolean>(false);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (file) {
// //       setSelectedFile(file);
// //     }
// //   };

// const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//         setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (!selectedFile) {
//         console.error('No file selected.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('multipartFile', selectedFile);

//       const api = axios.create({
//         baseURL: API_URL_Inspection,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//         },
//       });

//       const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;
//       const response = await api.post(
//         `/inspection/v1/inspectionTaskDocument/upload?${parameters}`,
//         formData
//       );

//       console.log('File upload response:', response.data);
      
//       onUpload(selectedFile);
//       setSelectedFile(null);
//     //   if (fileInputRef.current) {
//     //     fileInputRef.current.value = ''; // Clear the input field
//     //   }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       // Handle error response if needed
//     }
//   };




//   const handleView = () => {
//     if (selectedFile) {
//       window.open(selectedFile);
//     }
//   };

// //   const handleClear = () => {
// //     setSelectedFile(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = ''; // Clear the input field
// //     }
// //   };

//   const handleSelectChange = (value: string) => {
//     setShowUpload(value === 'yes');
//     setSelectedFile(null); // Clear selected file on change
//     // if (fileInputRef.current) {
//     //   fileInputRef.current.value = ''; // Clear the input field
//     // }
//   };

//   return (
//     <div>
//       <IonSelect
//         value={showUpload ? 'yes' : 'no'}
//         onIonChange={(e) => handleSelectChange(e.detail.value)}
//       >
//         <IonSelectOption value="yes">Yes</IonSelectOption>
//         <IonSelectOption value="no">No</IonSelectOption>
//       </IonSelect>
//       {showUpload && (
//         <>
//           <input type="file" onChange={handleFileChange} />
//           {selectedFile && <IonButton onClick={handleUpload}>Upload</IonButton>}
//           {selectedFile && <IonButton onClick={handleView}>View</IonButton>}
//           {/* {selectedFile && <IonButton onClick={handleClear}>Clear</IonButton>} */}
//         </>
//       )}
//     </div>
//   );
// };

// export default DocumentUpload;









// import { camera } from 'ionicons/icons';
// import React, { useState, useRef } from 'react';
// import { IonButton, IonSelect, IonSelectOption, IonImg, IonIcon ,IonToast } from '@ionic/react';
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
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [showUpload, setShowUpload] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null); // Ref for the captured image

//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); // State for upload success status
//   const [uploadError, setUploadError] = useState<boolean>(false); // State for upload error status
  


//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(URL.createObjectURL(event.target.files[0])); // Set selected file to be displayed
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (!selectedFile) {
//         console.error('No file selected.');
//         return;
//       }

//       let uploadFile: File | null = null;

//       // Check if the selected file is a captured image
//       if (selectedFile.startsWith('data:image')) {
//         const blob = await fetch(selectedFile).then((r) => r.blob());
//         uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
//       } else {
//         uploadFile = new File([selectedFile], 'selectedFile.jpg', { type: 'image/jpeg' });
//       }

//       if (!uploadFile) {
//         console.error('Error creating upload file.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('multipartFile', uploadFile);

//       const api = axios.create({
//         baseURL: API_URL_Inspection,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//         },
//       });

//       const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;
//       const response = await api.post(`/inspection/v1/inspectionTaskDocument/upload?${parameters}`, formData);

//       console.log('File upload response:', response.data);

//       setUploadSuccess(true); // Set upload success status
//       setTimeout(() => setUploadSuccess(false), 3000); 

//       onUpload(uploadFile);
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ''; // Clear the input field
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadError(true); // Set upload error status
//     setTimeout(() => setUploadError(false), 3000);
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
//         setSelectedFile(capturedPhoto.webPath); // Set captured image path
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ''; // Clear the input field
//         }
//       }
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const handleClear = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Clear the input field
//     }
//   };

  

//   const handleSelectChange = (value: string) => {
//     setShowUpload(value === 'yes');
//     setSelectedFile(null); // Clear selected file on change
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Clear the input field
//     }
//   };

//   return (
//     <div>
//       <IonSelect
//         value={showUpload ? 'yes' : 'no'}
//         onIonChange={(e) => handleSelectChange(e.detail.value)}
//       >
//         <IonSelectOption value="yes">Yes</IonSelectOption>
//         <IonSelectOption value="no">No</IonSelectOption>
//       </IonSelect>
//       {showUpload && (
//         <>
//         <label htmlFor="fileInput">(Max:2mb)</label>
//           <input type="file" onChange={handleFileChange} ref={fileInputRef} />
//           <IonButton onClick={handleCameraCapture} className='cld' ><IonIcon icon={camera}  slot="icon-only" /></IonButton>

          
//           {selectedFile && <IonButton onClick={handleUpload}>Upload</IonButton>}
//           {selectedFile && <IonButton onClick={handleClear}>Clear</IonButton>}
//         </>
//       )}

// <IonToast
//         isOpen={uploadSuccess}
//         onDidDismiss={() => setUploadSuccess(false)}
//         message="Successfully uploaded"
//         duration={3000}
//       />
//       <IonToast
//         isOpen={uploadError}
//         onDidDismiss={() => setUploadError(false)}
//         message="Error uploading file. Please try again."
//         duration={3000}
//         color="danger"
//       />
//       {/* {selectedFile && <IonImg src={selectedFile} ref={imageRef} />} */}
//       {selectedFile && !selectedFile.startsWith('data:image') && <IonImg src={selectedFile} ref={imageRef} />}

//     </div>
//   );
// };

// export default DocumentUpload;









import { camera } from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { IonButton, IonSelect, IonSelectOption, IonImg, IonIcon, IonToast } from '@ionic/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL_Inspection } from '../../../services/auth.service';
import { Capacitor, Plugins } from '@capacitor/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  docId: number;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, docId }) => {
  const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string; inspectionType: string }>();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
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

        if (file.startsWith('data:image')) {
          const blob = await fetch(file).then((r) => r.blob());
          uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
        } else {
          const response = await fetch(file);
          const blob = await response.blob();
          uploadFile = new File([blob], 'selectedFile.jpg', { type: 'image/jpeg' });
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
        setSelectedFiles((prevFiles) => [...prevFiles, capturedPhoto.webPath]);
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

  const handleSelectChange = (value: string) => {
    setShowUpload(value === 'yes');
    setSelectedFiles([]); // Clear selected files on change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <IonSelect value={showUpload ? 'yes' : 'no'} onIonChange={(e) => handleSelectChange(e.detail.value)}>
        <IonSelectOption value="yes">Yes</IonSelectOption>
        <IonSelectOption value="no">No</IonSelectOption>
      </IonSelect>
      {showUpload && (
        <>
          <label htmlFor="fileInput">(Max:2mb)</label>
          <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
          <IonButton onClick={handleCameraCapture} className='cld'>
            <IonIcon icon={camera} slot="icon-only" />
          </IonButton>
          {selectedFiles.length > 0 && <IonButton onClick={handleUpload}>Upload</IonButton>}
          {selectedFiles.length > 0 && <IonButton onClick={handleClear}>Clear</IonButton>}
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
      {selectedFiles.map((file, index) => (
        <IonImg key={index} src={file} ref={imageRef} />
      ))}
    </div>
  );
};

export default DocumentUpload;

