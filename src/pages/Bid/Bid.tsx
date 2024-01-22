import { InputChangeEventDetail, IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../Bid/Bid.css';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import TimeTicker from '../../components/TimeTicker';

const Bid: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [marketId, setMarketId] = useState<number>(9);
  const [godownId, setGodownId] = useState<number>(8);
  const [lotId, setLotId] = useState<number>(1);
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

  const checkReelerMinBalance = () => {
    const submitBidData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "reelerId": parseInt(localStorage.getItem("userTypeId")!)
    }

    const api = axios.create({
       baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/getReelerBalance", submitBidData)
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



  useEffect(() => {
    startTimer();
    checkReelerMinBalance();
    setTimeout(() => {
      const inputElement = inputRefLot.current?.querySelector('input');
      inputElement?.focus();
    }, 100); // Adjust the delay as needed
  }, []);

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
    // setLotNumberValue('');
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
    api.post("/submitBid", submitBidData)
      .then(res => {
        console.log(res.data)
        handleLotClear();
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



  const handleRefreshBtn = () => {
    // const submitData = {
    //   "marketId":  localStorage.getItem("marketId"),
    //   "allottedLotId": lotId,
    // }

    const submitData = {
      "marketId": parseInt(localStorage.getItem("marketId")!),
      "godownId": parseInt(localStorage.getItem("godownId")!),
      "reelerId": parseInt(localStorage.getItem("userTypeId")!),
    }

    const api = axios.create({
      //  baseURL: `http://13.200.62.144:8002/market-auction/v1/auction/reeler`
      baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/getHighestAndCurrentBidByEachLotForReeler", submitData)
      //   api.post("/getHighestBidPerLotDetails", submitData)
      .then(res => {
        // console.log(res.data)
        // setHighestBidAmount(res.data.content.amount)

        setBidData(res.data.content);

        // setBidData([
        //   {
        //     "allottedLotId": 19,
        //     "highestBidAmount": 400,
        //     "myBidAmount": 400
        //   },
        //   {
        //     "allottedLotId": 20,
        //     "highestBidAmount": 650,
        //     "myBidAmount": 100
        //   },
        //   {
        //     "allottedLotId": 6,
        //     "highestBidAmount": 600,
        //     "myBidAmount": 200
        //   },
        //   {
        //     "allottedLotId": 9,
        //     "highestBidAmount": 400,
        //     "myBidAmount": 250
        //   },
        //   {
        //     "allottedLotId": 13,
        //     "highestBidAmount": 500,
        //     "myBidAmount": 500
        //   }
        // ]);
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
          {/* <IonTitle>MARKET {name}</IonTitle> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            {/* <IonTitle size="small">Welcome {name}</IonTitle> */}

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
        {/* <ExploreContainer name={name} /> */}
        {showHomeSection && (
          <IonContent fullscreen className="ion-padding">
            {/* <IonSegment value="default">
                    <IonSegmentButton value="default">
                        <IonLabel>Home</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="segment">
                        <IonLabel>Transaction Report</IonLabel>
                    </IonSegmentButton>
                </IonSegment> */}

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonInput className='input-big-font-size' inputmode="numeric" value={lotNumberValue} onIonInput={(e: any) => {
                    setLotNumberValue(e.detail.value!);
                    setLotId(parseInt(e.detail.value!))
                  }}
                    label="Lot No" labelPlacement="stacked" fill="outline" ref={inputRefLot}></IonInput>
                </IonCol>
                <IonCol>
                  <IonButton size="large" style={{marginTop: '-1px'}} onClick={handleLotClear}>Clear</IonButton>
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
              <IonLabel>Lot No</IonLabel>
              <IonLabel>Bid Amt</IonLabel>
              <IonLabel>Curr. Bid</IonLabel>
              {/* <IonLabel>St.</IonLabel> */}
            </IonItem>
            {bidData.map((item) => (
              <IonCol size='12' key={item.allottedLotId}>
                <IonRow>
                  <IonCol size="4" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonLabel>{item.allottedLotId}</IonLabel>
                  </IonCol>
                  <IonCol size="4" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
                    <IonLabel>{item.highestBidAmount}</IonLabel>
                  </IonCol>
                  <IonCol size="4" className={item.awarded ? "awarded-label" : "not-awarded-label"}>
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
