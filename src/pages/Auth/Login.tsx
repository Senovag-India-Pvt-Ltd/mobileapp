import { BackButtonEvent, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonImg, IonList, IonPage, IonRouterContext, IonTitle, IonToolbar, isPlatform, useIonRouter, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { eye, lockClosed, personCircle, phonePortrait, phonePortraitOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import './Login.css';


import { Device } from '@capacitor/device';
import { JSX } from 'react/jsx-runtime';
import authService from '../../services/auth.service';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Wave } from '../../components/Wave';

// import {  } from '@ionic-native'



function validateEmail(email: string) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}
const Login: React.FC = () => {

  const logDeviceInfo = async () => {
    const info = await Device.getInfo();
    const deviceIdObj = await Device.getId();
    
    setDeviceId(deviceIdObj.identifier);

    console.log(info);
    console.log(deviceIdObj.identifier);
  };
    
  // logDeviceInfo();
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const initialMinutes = 10; // Initial minutes
  const initialSeconds = 0; // Initial seconds

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [showVerificationSection, setShowVerificationSection] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [otpNumber1, setOtpNumber1] = useState<string>("");
  const [otpNumber2, setOtpNumber2] = useState<string>("");
  const [otpNumber3, setOtpNumber3] = useState<string>("");
  const [otpNumber4, setOtpNumber4] = useState<string>("");
  const [otpNumber5, setOtpNumber5] = useState<string>("");
  const [otpNumber6, setOtpNumber6] = useState<string>("");

  const inputRef1 = useRef<HTMLIonInputElement>(null);
  const inputRef2 = useRef<HTMLIonInputElement>(null);
  const inputRef3 = useRef<HTMLIonInputElement>(null);
  const inputRef4 = useRef<HTMLIonInputElement>(null);
  const inputRef5 = useRef<HTMLIonInputElement>(null);
  const inputRef6 = useRef<HTMLIonInputElement>(null);

  const handleInputChange1 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber1(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };

  const handleInputChange2 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber2(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };


  const handleInputChange3 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber3(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };

  const handleInputChange4 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber4(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };

  const handleInputChange5 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber5(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };


  const handleInputChange6 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setOtpNumber6(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };

 // const history = useHistory();
const location = useLocation();

if (Capacitor.isNative) {
    App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack || location.pathname === '/login') {
            App.exitApp();
        } else {
            history.goBack();
        }
    });
}

  useEffect(() => {                   

    let interval: string | number | NodeJS.Timeout | undefined;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      setIsActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  useEffect(() => {
    logDeviceInfo();
  }, []);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  const padTime = (time: number) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };
  
  const format = (time: number) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);
  
    // Get the seconds left after converting minutes
    const seconds = time % 60;
  
    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  }; 

  const resendOtp = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setTimeout(() => {
      setIsActive(true);
    }, 1);
    generateOtp();
  }

  const handleLogin = async() => {
   // generateToken();
    generateOtp();
    // if (!email) {
    //     setMessage("Please enter a valid email");
    //     setIserror(true);
    //     return;
    // }
    // if (validateEmail(email) === false) {
    //     setMessage("Your email is invalid");
    //     setIserror(true);
    //     return;
    // }

    if (!password || password.length < 6) {
        setMessage("Please enter your password");
        setIserror(true);
        return;
    }

    const loginData = {
        "email": email,
        "password": password
    }

    /*
    const api = axios.create({
        baseURL: `https://reqres.in/api`
    })
    api.post("/login", loginData)
        .then(res => {             
            history.push("/bid/" + email);
         })
         .catch(error=>{
            setMessage("Auth failure! Please create an account");
            setIserror(true)
         })
         */

        // history.push("/bid/" + email);
  };

  const generateOtp = () => {
    const loginData = {
        "username": email,
        "password": password
    }

    const api = axios.create({
        baseURL: `https://api.senovagseri.com/master-data/v1`,
        // headers: {
        //   "Content-Type": "application/json",
        //   accept: "*/*",
        //   Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        //   'Access-Control-Allow-Origin': '*',
        // },
    })
    api.post("/userMaster/generate-otp-by-user-name-and-password", loginData)
        .then(res => { 
          setPhoneNumber(res.data.content.phoneNumber.substring(res.data.content.phoneNumber.length - 4));
          handleStart();
          setShowVerificationSection(true)
          setShowLoginSection(false)    
          setTimeout(() => {
            const inputElement = inputRef1.current?.querySelector('input');
            inputElement?.focus();
          }, 100);       
           // history.push("/bid/" + email);
         })
         .catch(error=>{
            setMessage("OTP not sent " +error);
            setIserror(true)
         })
         

        // history.push("/bid/" + email);
  };

  const verifyOtp = async () => {
    let otpText = `${otpNumber1}${otpNumber2}${otpNumber3}${otpNumber4}${otpNumber5}${otpNumber6}`;
    const loginData = {
        "username": email,
        // "enteredOtpByUser": otpText
        "enteredOtpByUser": otp
    }

    const api = axios.create({
        baseURL: `https://api.senovagseri.com/master-data/v1`
    })
      try{
      const res = await api.post("/userMaster/verify-otp-by-user-name", loginData);
          if(res.data.content.otpVerified){
            await authService.login(email, password);
            if(localStorage.getItem("jwtToken") == 'null' || localStorage.getItem("jwtToken") == null || localStorage.getItem("jwtToken") == ' '){
              setMessage("Not able to login, please check credentials");
              setIserror(true);
              setShowLoginSection(true);
              setShowVerificationSection(false);
              history.push("/login");
            }else if(localStorage.getItem("deviceId") != deviceId && localStorage.getItem("userType") == '2'){
              setMessage("Please use the registered device");
              setIserror(true);
              setShowLoginSection(true);
              setShowVerificationSection(false);  
              history.push("/login");          
            }else{
              setShowLoginSection(true);
              setShowVerificationSection(false);  
              history.push("/bid/" + email);
            }
          }else{
            setMessage("OTP not verified");
            setIserror(true);
          }
         }
      catch (error) {
        setMessage("Error while authenticating user credential");
        setIserror(true);
      }
         
         

        // history.push("/bid/" + email);
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="ion-text-center background">
        {/* <Wave/> */}
        <div className="trapezoid"></div>

        <IonGrid>
            <IonRow>
            <IonCol>
                <IonAlert
                    isOpen={iserror}
                    onDidDismiss={() => setIserror(false)}
                    cssClass="my-custom-class"
                    header={"Error!"}
                    message={message}
                    buttons={["Dismiss"]}
                />
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <div className='container'>
                    <div className="image-container">
                        <IonImg
                        style={{alignItems: 'center'}}
                        className='logo-round'
                        src="/assets/images/kg_logo.png"
                        alt="Department of Sericulture"
                        ></IonImg>
                    </div>
                </div>
                <div style={{ color: '#fff' }}>
                    <h2>Department of Sericulture</h2>
                    <h2 style={{marginTop: '-10px'}}>Government of Karnataka</h2>
                </div>

                {/* <IonIcon
                    style={{ fontSize: "70px", color: "#0040ff" }}
                    icon={personCircle}
                /> */}
            
            </IonCol>
            </IonRow>
            <IonRow style={{marginTop: '50px'}}>
                <IonCol></IonCol>
            </IonRow>
            
        </IonGrid>

        {showLoginSection && (
          <div style={{marginTop: '50px'}}>

            <IonList>
                <IonItem>
                    <IonIcon color='primary' slot="start" icon={phonePortrait} aria-hidden="true"></IonIcon>
                    <IonInput labelPlacement="stacked" label="Device Id" readonly type="text"
                        value={deviceId}
                        onIonInput={(e) => setDeviceId(e.detail.value!)}>
                    </IonInput>
                </IonItem>
            </IonList>
            <IonList>
                <IonItem>
                    <IonIcon color='primary' slot="start" icon={personCircle} aria-hidden="true"></IonIcon>
                    <IonInput labelPlacement="stacked" label="Username" placeholder="" type="email"
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}>
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonIcon color='primary' slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
                    <IonInput labelPlacement="stacked" label="Password" type="password"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}>
                    </IonInput>
                </IonItem>
                <IonRow className="ion-padding">
                    <IonCol color='primary' className="ion-padding">
                        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
                    </IonCol>
                </IonRow>
            </IonList>
          
            {/* <IonCard style={{marginTop: '40px'}}>
                <IonCardHeader color={'primary'}>
                    Welcome to Cocoon Market
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonIcon slot="start" icon={phonePortrait} aria-hidden="true"></IonIcon>
                            <IonInput labelPlacement="stacked" label="Device Id" placeholder="" type="text"
                                value={deviceId}
                                onIonInput={(e) => setDeviceId(e.detail.value!)}>
                            </IonInput>
                        </IonItem>
                    </IonList>
                    <IonList>
                        <IonItem>
                            <IonIcon slot="start" icon={personCircle} aria-hidden="true"></IonIcon>
                            <IonInput labelPlacement="stacked" label="Username" placeholder="" type="email"
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value!)}>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
                            <IonInput labelPlacement="stacked" label="Password" type="password"
                                value={password}
                                onIonInput={(e) => setPassword(e.detail.value!)}>
                            </IonInput>
                        </IonItem>
                        <IonRow className="ion-padding">
                            <IonCol className="ion-padding">
                                <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonList>
                </IonCardContent>
            </IonCard> */}
          </div>
        )}

        {showVerificationSection && (
        <IonCard>
            <IonCardHeader color={'secondary'}>
                Verification
            </IonCardHeader>
            <IonCardContent>
            <IonGrid>
            <IonRow>
              <IonCol>
                <IonLabel>Enter the one time password received on your phone ******{phoneNumber}</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
            <IonInput labelPlacement="stacked" label="OTP" placeholder="" fill='outline'
                            onIonInput={(e) => setOtp(e.detail.value!)}>
                        </IonInput>
                        </IonCol>
                {/* <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber1}
                    onIonInput={(e) => handleInputChange1(inputRef2, e.detail.value!)}
                    ref={inputRef1}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber2}
                    onIonInput={(e) => handleInputChange2(inputRef3, e.detail.value!)}
                    ref={inputRef2}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber3}
                    onIonInput={(e) => handleInputChange3(inputRef4, e.detail.value!)}
                    ref={inputRef3}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>
                <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber4}
                    onIonInput={(e) => handleInputChange4(inputRef5, e.detail.value!)}
                    ref={inputRef4}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber5}
                    onIonInput={(e) => handleInputChange5(inputRef6, e.detail.value!)}
                    ref={inputRef5}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={otpNumber6}
                    onIonInput={(e) => handleInputChange6(inputRef6, e.detail.value!)}
                    ref={inputRef6}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol> */}
              </IonRow>
            <IonRow>
              <IonCol size='6' className="ion-text-left">
                <IonLabel>Wait for {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} mins</IonLabel>
                
              </IonCol>
              <IonCol size='6' className="ion-text-right">
              <IonButton expand="block" onClick={resendOtp} disabled={isActive}>Resend OTP</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
            <IonButton expand="block" onClick={verifyOtp}>Verify OTP</IonButton>
            </IonCol>
            </IonRow>
          </IonGrid>
            
            </IonCardContent>
        </IonCard>
        )}


        {/* <IonRow>
            <IonCol>
                <IonItem>
                    <h2>Cocoon Market Management System</h2>
                    <h2>e-Haraju</h2>
                </IonItem>
            </IonCol>
        </IonRow> */}

      </IonContent>
    </IonPage>
  );
};

export default Login;