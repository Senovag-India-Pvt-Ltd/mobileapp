import { InputChangeEventDetail, IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../Bid/Bid.css';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import TimeTicker from '../../components/TimeTicker';
import { Geolocation } from '@capacitor/geolocation';
import { options } from 'ionicons/icons';

const Bid: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [marketId, setMarketId] = useState<number>(9);
  const [godownId, setGodownId] = useState<number>(8);
  const [lotId, setLotId] = useState<number>();
  const [reelerId, setReelerId] = useState<number>(3);
  const [amount, setAmount] = useState<number>();
  const [status, setStatus] = useState<string>('StatusString');
  const [auctionDate, setAuctionDate] = useState<string>('2023-12-02');
  const [surrogateBid, setSurrogateBid] = useState<boolean>(false);
  const [auctionNumber, setAuctionNumber] = useState<string>('AUCTION1');

  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [lotNumberValue, setLotNumberValue] = useState<string>("");

  const [bidAmountValue1, setBidAmountValue1] = useState<string>("");
  const [bidAmountValue2, setBidAmountValue2] = useState<string>("");
  const [bidAmountValue3, setBidAmountValue3] = useState<string>("");

  const [confirmationBidText, setConfirmationBidText] = useState<string>("");
  const [showLotNumberAlert, setShowLotNumberAlert] = useState(false);
  const [showBidNumberAlert, setShowBidNumberAlert] = useState(false);
  const [showBidNumberAlertWith0, setShowBidNumberAlertWith0] = useState(false);
  const [showBidConfirmationAlert, setShowBidConfirmationAlert] = useState(false);

  const [highestBidAmount, setHighestBidAmount] = useState<number>();

  const [showHomeSection, setShowHomeSection] = useState(true);
  const [showReportSection, setShowReportSection] = useState(false);
  const [ionSegmentText, setIonSegmentText] = useState<string>("home");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [bidData, setBidData] = useState<any[]>([]);

  const history = useHistory();
  const location = useLocation();

  const inputRef1 = useRef<HTMLIonInputElement>(null);
  const inputRef2 = useRef<HTMLIonInputElement>(null);
  const inputRef3 = useRef<HTMLIonInputElement>(null);

  const inputRefLot = useRef<HTMLIonInputElement>(null);
  const [timeTickerKey, setTimeTickerKey] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [highestBidForLot, setHighestBidForLot] = useState<string>("");

  const checkReelerMinBalance = () => {
    const submitBidData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "reelerId": parseInt(localStorage.getItem("userTypeId")!)
    }

    const api = axios.create({
       baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/getReelerBalance", submitBidData, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data)
        handleLotClear();
        if (res.data.content.balance < res.data.content.minimumMarketBalance) {
          setMessage("Reeler minimum balance should be "+res.data.content.minimumMarketBalance);
          setIserror(true)
          setButtonDisabled(true)
        }else{
          setButtonDisabled(false)
        }
      })
      .catch(error => {
        setMessage("Failed to check reeler balance");
        setIserror(true)
        setButtonDisabled(true)
      })
  }

  //get location of the device 
  const getDeviceLocation = async ()=>{
    let geolocationOptions = { maximumAge: 1000, timeout: 5000, enableHighAccuracy: true };
    const locId = await Geolocation.watchPosition(geolocationOptions,(position,err)=>{
      if(err){
        console.info("error",err);
      }
      if(position){
        checkDeviceInZone(position);
        console.info('position',position);
      }
      
      
    });
    console.info("locId",locId);
  }
  const checkDeviceInZone = (location:any)=>{
    console.info(location);
    let usrloc = {
      lat:location.coords.latitude,
      lng:location.coords.longitude
    };
    
    //6.6 mtr acuracy
    // let mrktloc = {
    //   lat: 12.9652161,
    //   lng: 77.5249014
    // };
   
    let mrktloc = {
      lat: localStorage.getItem("marketLat"),
      lng: localStorage.getItem("marketLongitude")
    };
    //  let mrktloc = {
    //   lat:12.959744,
    //   lng: 77.6404992
    // };
    // let mrktloc = {
    //   lat: 13.7342183,
    //   lng: 75.2542902
    // };
    let radius = 0.2; //range in km
    let isinrange = arePointsNear(usrloc,mrktloc,radius);
    if(!isinrange){
      setMessage("Your location in far away from market"+location.coords.latitude+":Lang"+location.coords.longitude);
      setIserror(true)
      setButtonDisabled(true)
    }else{
      setButtonDisabled(false)
    }
    console.info("isinrange",isinrange);
  }
  //check the device location is within the range
  const arePointsNear = (checkPoint:any, centerPoint:any, km:number) => {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  const startTimer = () => {
    
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
   
  }

  useIonViewWillEnter(() => {
    inputRefLot.current?.setFocus();
  });

  useEffect(() => {
    startTimer();
    checkReelerMinBalance();
    inputRefLot.current?.setFocus();
    getDeviceLocation();
  }, []);


  useEffect(() => {
    
  }, [lotId]);

  const handleInputChange1 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setBidAmountValue1(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };

  const handleInputChange2 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setBidAmountValue2(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };


  const handleInputChange3 = (inputRef: React.RefObject<HTMLIonInputElement>, value: string) => {
    const inputValue = value;
    setBidAmountValue3(inputValue);
    if (!isNaN(parseInt(inputValue, 10))) {
      inputRef.current?.setFocus();
    }
  };


  if (Capacitor.isNative) {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack || location.pathname === '/login') {
        App.exitApp();
      } else {
        history.goBack();
      }
    });
  }

  const handleLotClear = () => {
    setLotNumberValue('');
    setHighestBidForLot('');
    setBidAmountValue1('');
    setBidAmountValue2('');
    setBidAmountValue3('');
  }

  const handleClearAfterBid = () => {
    setBidAmountValue1('');
    setBidAmountValue2('');
    setBidAmountValue3('');
  }

  const handleBidBtn = () => {
    const submitBidData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "allottedLotId": lotId,
      "reelerId": parseInt(localStorage.getItem("userTypeId")!),
      "amount": amount,
      "auctionNumber": auctionNumber
    }

    const api = axios.create({
       baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/submitBid", submitBidData, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data)
        handleClearAfterBid();
        handleRefreshBtn();
        if (res.data.errorCode != 0) {
          setMessage(res.data.errorMessages[0].message);
          setIserror(true)
        }
      })
      .catch(error => {
        setMessage("Bid Adding data Failed");
        setIserror(true)
      })

  }

  const fetchHighestBidForLot = (_lotid: any) => {
    setLotNumberValue(_lotid);
    setLotId(parseInt(_lotid))
    if(_lotid != null){
    const highestBidData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "allottedLotId": parseInt(_lotid)
    }

    const api = axios.create({
       baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/getHighestBidPerLot", highestBidData, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data);
        setHighestBidForLot(res.data.content.highestBidAmount);
      })
      .catch(error => {
    
      })
    }

  }

  const handleReBid = (e: React.MouseEvent<HTMLIonButtonElement>, data: string, _inputRef1: React.RefObject<HTMLIonInputElement>) => {
    e.preventDefault();
    setLotNumberValue(data);
    setLotId(parseInt(data));
    fetchHighestBidForLot(data)
    _inputRef1.current?.setFocus();
  };


  const handleRefreshBtn = () => {
    const submitData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "reelerId": parseInt(localStorage.getItem("userTypeId")!),
    }

    const api = axios.create({
      baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/getHighestAndCurrentBidByEachLotForReeler", submitData, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        setBidData(res.data.content);
      })
      .catch(error => {
        setMessage("Bid Adding data Failed");
        setIserror(true)
      })

  }

  const generateBidAmount = () => {
    let concatenatedBidAmountString = "";
    if (bidAmountValue1 != undefined && bidAmountValue1 != null && !Number.isNaN(bidAmountValue1)) {
      concatenatedBidAmountString = `${bidAmountValue1}`;
    }

    if (bidAmountValue2 != undefined && bidAmountValue2 != null && !Number.isNaN(bidAmountValue2)) {
      concatenatedBidAmountString = concatenatedBidAmountString + `${bidAmountValue2}`;
    }

    if (bidAmountValue3 != undefined && bidAmountValue3 != null && !Number.isNaN(bidAmountValue3)) {
      concatenatedBidAmountString = concatenatedBidAmountString + `${bidAmountValue3}`;
    }

    //concatenatedBidAmountString = `${bidAmountValue1}${bidAmountValue2}${bidAmountValue3}`;
    setAmount(parseInt(concatenatedBidAmountString));
    setConfirmationBidText(`${concatenatedBidAmountString}`);


    if (lotNumberValue == null || lotNumberValue == "") {
      setShowLotNumberAlert(true);
    } else if (concatenatedBidAmountString == "" || concatenatedBidAmountString == null) {
      setShowBidNumberAlert(true);
    } else if (concatenatedBidAmountString == "000") {
      setShowBidNumberAlertWith0(true);
    } else {
      setShowBidConfirmationAlert(true);
    }
  }

  const toggleHomeSection = () => {
    setIonSegmentText("home")
    setShowHomeSection(!showHomeSection);
    setShowReportSection(!showReportSection);
  }


  const toggleReportSection = () => {
    setIonSegmentText("report");
    setShowHomeSection(!showHomeSection);
    setShowReportSection(!showReportSection);
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <TimeTicker key={timeTickerKey} isActive={isActive} />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>

            <IonSegment value={ionSegmentText}>
              <IonSegmentButton value="home" onClick={toggleHomeSection}>
                <IonLabel>Home</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="report" onClick={toggleReportSection}>
                <IonLabel>Transaction Report</IonLabel>
              </IonSegmentButton>
            </IonSegment>

          </IonToolbar>
        </IonHeader>
        {showHomeSection && (
          <IonContent fullscreen className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonInput className='input-big-font-size' inputmode="numeric" value={lotNumberValue}
                  onIonBlur= { async (e: any) => {
                    // After focus out, automatically focus on the next input field
                    fetchHighestBidForLot(e.target.value);
                    inputRef1.current?.setFocus();
                  }}
                    label="Lot No" labelPlacement="stacked" fill="outline" ref={inputRefLot}></IonInput>
                </IonCol>
                <IonCol>
                  <IonButton size="large" style={{marginTop: '-1px'}} onClick={handleLotClear}>Clr</IonButton>
                </IonCol>
                <IonCol>
                  <IonLabel className='highest-bid-label' style={{marginTop: '-1px'}}>{highestBidForLot}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <h3>Bid Amount</h3>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonInput 
                    className='input-big-font-size'
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={bidAmountValue1}
                    onIonInput={(e) => handleInputChange1(inputRef2, e.detail.value!)}
                    ref={inputRef1}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    className='input-big-font-size'
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={bidAmountValue2}
                    onIonInput={(e) => handleInputChange2(inputRef3, e.detail.value!)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        e.preventDefault();
                        inputRef1.current?.setFocus();
                        setBidAmountValue2('')
                      }
                    }}
                    ref={inputRef2}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>

                <IonCol>
                  <IonInput
                    className='input-big-font-size'
                    type='text'
                    maxlength={1}
                    pattern="[0-9]{1}"
                    fill="outline"
                    value={bidAmountValue3}
                    onIonInput={(e) => handleInputChange3(inputRef3, e.detail.value!)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        e.preventDefault();
                        inputRef2.current?.setFocus();
                        setBidAmountValue3('')
                      }
                    }}
                    ref={inputRef3}
                    inputmode="numeric"
                  ></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton id="bid-btn" expand="full" size="large" onClick={generateBidAmount} disabled={isButtonDisabled}>Bid</IonButton>
                  {/* <IonButton id="bid-btn" expand="full" size="large">Bid</IonButton> */}
                </IonCol>
                <IonCol>
                  <IonButton expand="full" size="large" onClick={handleRefreshBtn}>Refresh</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonItem className='item-background-color'>
            <IonLabel>Re-Bid</IonLabel>
              <IonLabel>Lot No</IonLabel>
              <IonLabel>Bid Amt</IonLabel>
              <IonLabel>Curr. Bid</IonLabel>
              {/* <IonLabel>St.</IonLabel> */}
            </IonItem>
            {bidData.map((item) => (
              <IonCol size='12' key={item.allottedLotId}>
                <IonRow>
                <IonCol size="3" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonButton onClick={(e) => handleReBid(e, item.allottedLotId, inputRef1)}>Re-Bid</IonButton>
                  </IonCol>
                  <IonCol size="3" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonLabel>{item.allottedLotId}</IonLabel>
                  </IonCol>
                  <IonCol size="3" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonLabel>{item.highestBidAmount}</IonLabel>
                  </IonCol>
                  <IonCol size="3" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonLabel>{item.myBidAmount}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCol>
            ))}


          </IonContent>

        )}

        {showReportSection && (
          <IonContent fullscreen className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonLabel>Report section</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        )}

      </IonContent>

      <IonAlert
        header="Confirm rate"
        message={confirmationBidText}
        isOpen={showBidConfirmationAlert}
        onDidDismiss={() => setShowBidConfirmationAlert(false)}

        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');

            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
              handleBidBtn();
            },
          },
        ]}

      ></IonAlert>

      <IonAlert
        isOpen={showLotNumberAlert}
        onDidDismiss={() => setShowLotNumberAlert(false)}
        header="Warning!"
        message="Please enter lot number"
        buttons={['OK']}
      />

      <IonAlert
        isOpen={showBidNumberAlert}
        onDidDismiss={() => setShowBidNumberAlert(false)}
        header="Warning!"
        message="Please enter bid amount"
        buttons={['OK']}
      />

    <IonAlert
        isOpen={showBidNumberAlertWith0}
        onDidDismiss={() => setShowBidNumberAlertWith0(false)}
        header="Warning!"
        message="Please enter proper bid amount"
        buttons={['OK']}
      />

      <IonAlert
        isOpen={iserror}
        onDidDismiss={() => setIserror(false)}
        cssClass="my-custom-class"
        header={"Error!"}
        message={message}
        buttons={["Dismiss"]}
      />
    </IonPage>
  );
};

export default Bid;
