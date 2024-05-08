
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






//Code For Multiple Selection Files


// import React, { useState, useRef } from 'react';
// import { IonButton, IonSelect, IonSelectOption, IonImg } from '@ionic/react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL_Inspection } from '../../../services/auth.service';
// import { Capacitor, Plugins } from '@capacitor/core';
// import { CameraResultType, CameraSource } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';

// interface DocumentUploadProps {
//   onUpload: (file: File[]) => void;
//   docId: number;
// }

// const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, docId }) => {
//   const { documentMasterId, inspectionType } = useParams<{ documentMasterId: string; inspectionType: string }>();
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [showUpload, setShowUpload] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageRefs = useRef<(HTMLImageElement | null)[]>([]); // Refs for the captured images

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const filesArray = Array.from(event.target.files);
//       setSelectedFiles([...selectedFiles, ...filesArray]); // Append new files to the existing list
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (selectedFiles.length === 0) {
//         console.error('No files selected.');
//         return;
//       }
  
//       const formData = new FormData();
//       selectedFiles.forEach((file) => {
//         formData.append('files', file); // Append each selected file to the 'files' key in the FormData object
//       });
  
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
  
//       onUpload(selectedFiles);
//       setSelectedFiles([]); // Clear selected files after upload
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ''; // Clear the input field
//       }
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };
  
//   const handleView = (imageIndex: number) => {
//     const selectedImage = imageRefs.current[imageIndex];
//     if (selectedImage) {
//       window.open(selectedImage.src); // Open the selected image in a new tab
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
//         const imageWithLocation = await addLocationToImage(capturedPhoto.webPath);
//         setSelectedFiles([...selectedFiles, imageWithLocation]);
//       }
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const addLocationToImage = async (imagePath: string) => {
//     try {
//       const coordinates = await Geolocation.getCurrentPosition();
//       const { latitude, longitude } = coordinates.coords;

//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       const img = new Image();

//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx?.drawImage(img, 0, 0);

//         if (ctx) {
//           ctx.fillStyle = 'white';
//           ctx.font = 'bold 55px Arial';
//           ctx.fillText(`Latitude: ${latitude}`, 10, 50);
//           ctx.fillText(`Longitude: ${longitude}`, 10, 140);
//         }

//         const imageWithLocation = canvas.toDataURL('image/jpeg', 0.9);
//         setSelectedFiles([...selectedFiles, imageWithLocation]);
//       };

//       img.src = imagePath;

//       return imagePath;
//     } catch (error) {
//       console.error('Error adding location to image:', error);
//       return imagePath;
//     }
//   };

//   const handleClearAll = () => {
//     setSelectedFiles([]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Clear the input field
//     }
//   };

//   return (
//     <div>
//       <IonSelect
//         value={showUpload ? 'yes' : 'no'}
//         onIonChange={(e) => setShowUpload(e.detail.value === 'yes')}
//       >
//         <IonSelectOption value="yes">Yes</IonSelectOption>
//         <IonSelectOption value="no">No</IonSelectOption>
//       </IonSelect>
//       {showUpload && (
//         <>
//           <input type="file" onChange={handleFileChange} multiple ref={fileInputRef} />
//           <IonButton onClick={handleCameraCapture}>Capture Image</IonButton>
//           {selectedFiles.length > 0 && (
//             <>
//               <IonButton onClick={handleUpload}>Upload</IonButton>
//               <IonButton onClick={handleClearAll}>Clear All</IonButton>
//             </>
//           )}
//           {selectedFiles.map((file, index) => (
//             <IonButton key={index} onClick={() => handleView(index)}>View {index + 1}</IonButton>
//           ))}
//         </>
//       )}
//       {selectedFiles.map((file, index) => (
//         <IonImg key={index} src={file instanceof File ? URL.createObjectURL(file) : file} ref={(element) => { if (element) imageRefs.current[index] = element }} />
//       ))}
//     </div>
//   );
// };

// export default DocumentUpload;






import React, { useState, useRef } from 'react';
import { IonButton, IonSelect, IonSelectOption, IonImg } from '@ionic/react';
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
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null); // Ref for the captured image

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(URL.createObjectURL(event.target.files[0])); // Set selected file to be displayed
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }

      let uploadFile: File | null = null;

      // Check if the selected file is a captured image
      if (selectedFile.startsWith('data:image')) {
        const blob = await fetch(selectedFile).then((r) => r.blob());
        uploadFile = new File([blob], 'capturedImage.jpg', { type: 'image/jpeg' });
      } else {
        uploadFile = new File([selectedFile], 'selectedFile.jpg', { type: 'image/jpeg' });
      }

      if (!uploadFile) {
        console.error('Error creating upload file.');
        return;
      }

      const formData = new FormData();
      formData.append('multipartFile', uploadFile);

      const api = axios.create({
        baseURL: API_URL_Inspection,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      const parameters = `inspectionTaskId=${inspectionType}&documentMasterId=${docId}`;
      const response = await api.post(`/inspection/v1/inspectionTaskDocument/upload?${parameters}`, formData);

      console.log('File upload response:', response.data);

      onUpload(uploadFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input field
      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
        setSelectedFile(capturedPhoto.webPath); // Set captured image path
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the input field
        }
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input field
    }
  };

  const handleSelectChange = (value: string) => {
    setShowUpload(value === 'yes');
    setSelectedFile(null); // Clear selected file on change
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input field
    }
  };

  return (
    <div>
      <IonSelect
        value={showUpload ? 'yes' : 'no'}
        onIonChange={(e) => handleSelectChange(e.detail.value)}
      >
        <IonSelectOption value="yes">Yes</IonSelectOption>
        <IonSelectOption value="no">No</IonSelectOption>
      </IonSelect>
      {showUpload && (
        <>
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
          <IonButton onClick={handleCameraCapture}>Capture Image</IonButton>
          {selectedFile && <IonButton onClick={handleUpload}>Upload</IonButton>}
          {selectedFile && <IonButton onClick={handleClear}>Clear</IonButton>}
        </>
      )}
      {selectedFile && <IonImg src={selectedFile} ref={imageRef} />}
    </div>
  );
};

export default DocumentUpload;
