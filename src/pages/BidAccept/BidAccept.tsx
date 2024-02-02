import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../BidAccept/BidAccept.css';
import axios from "axios"; import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import TimeTicker from '../../components/TimeTicker';
import { useEffect, useRef, useState } from 'react';

const BidAccept: React.FC = () => {

  const [iserror, setIserror] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [dateValue, setDateValue] = useState<string>("");
  const [lotNumberValue, setLotNumberValue] = useState<string>("");
  const [showClickDetailsSection, setShowClickDetailsSection] = useState(true);
  const [showFarmerDetailsSection, setShowFarmerDetailsSection] = useState(false);
  const [showAcceptButtonSection, setShowAcceptButtonSection] = useState(false);
  const [showBackButtonSection, setShowBackButtonSection] = useState(false);
  const [marketId, setMarketId] = useState<number>(9);
  const [lotId, setLotId] = useState<string>("");

  const [fruitsId, setFruitsId] = useState<string>("");
  const [farmerName, setFarmerName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [reelerAuctionId, setReelerAuctionId] = useState<number>();
  const [reelerName, setReelerName] = useState<string>("");
  const [villageName, setVillageName] = useState<string>("");
  const [bidStatus, setBidStatus] = useState<string>("");
  const [bidAcceptedBy, setBidAcceptedBy] = useState<string>("");

  const [reelingLicenseNumber, setReelingLicenseNumber] = useState<string>("");
  const [reelerFruitsId, setReelerFruitsId] = useState<string>("");

  const [timeTickerKey, setTimeTickerKey] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const inputRefLot = useRef<HTMLIonInputElement>(null);

  const history = useHistory();
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

  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  // State to hold the current date
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());

  // useIonViewDidEnter(() => {
  //   inputRefLot.current?.setFocus();
  // });

  useIonViewWillEnter(() => {
    inputRefLot.current?.setFocus();
  });

  useEffect(() => {
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

  const fetchHighestBidDetails = () => {
    inputRefLot.current?.setFocus();

    setShowClickDetailsSection(!showClickDetailsSection);
    setShowFarmerDetailsSection(!showFarmerDetailsSection);
    setShowAcceptButtonSection(!showAcceptButtonSection);

    const fetchHighestBidPayload = {
      "marketId": localStorage.getItem("marketId"),
      "allottedLotId": lotId
    }

    const api = axios.create({
      baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
      //  baseURL: `http://13.200.62.144:8002/market-auction/v1/auction/reeler`
    })
    api.post("/getHighestBidPerLotDetails", fetchHighestBidPayload, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        let contents = res.data.content;

        if (res.data.errorCode == -1) {
          setMessage(res.data.errorMessages[0]);
          setIserror(true)

          setLotId("")
          setLotNumberValue("")

          setShowClickDetailsSection(true)
          setShowFarmerDetailsSection(false)
          setShowAcceptButtonSection(false)
          setShowBackButtonSection(false)

        } else {

          setFruitsId(contents.farmerNumber);
          setFarmerName(contents.farmerFirstName + "" + contents.farmerMiddleName + "" + contents.farmerLastName);
          setAmount(contents.amount + ".000");
          setReelerName(contents.reelerName);
          setReelerAuctionId(contents.reelerAuctionId);
          setVillageName(contents.farmervillageName);
          setBidAcceptedBy(contents.bidAcceptedBy);
          setBidStatus(contents.status);
          setReelingLicenseNumber(contents.reelingLicenseNumber);
          setReelerFruitsId(contents.reelerFruitsId);

          if (contents.status == "accepted") {
            setShowFarmerDetailsSection(!showFarmerDetailsSection);
            setShowAcceptButtonSection(false);
            setShowBackButtonSection(!showBackButtonSection);
          }
        }

      })
      .catch(error => {
        setMessage("Failed to fetch highest bid");
        setIserror(true)
      })

  }


  const toggleBackButtonSection = () => {
    inputRefLot.current?.setFocus();
    setShowClickDetailsSection(true);
    setShowFarmerDetailsSection(false);
    setShowAcceptButtonSection(false);
    setShowBackButtonSection(false);
  }

  const toggleClickDetailsSection = () => {
    inputRefLot.current?.setFocus();
    setLotId("");
    setLotNumberValue("");
    setShowClickDetailsSection(!showClickDetailsSection);
    setShowFarmerDetailsSection(!showFarmerDetailsSection);
    setShowAcceptButtonSection(!showAcceptButtonSection);
  };

  const handleAcceptButtonEvent = () => {
    inputRefLot.current?.setFocus();
    setShowClickDetailsSection(!showClickDetailsSection);
    setShowFarmerDetailsSection(!showFarmerDetailsSection);
    setShowAcceptButtonSection(!showAcceptButtonSection);

    const acceptBidPayLoad = {
      "marketId": localStorage.getItem("marketId"),
      "godownId": localStorage.getItem("godownId"),
      "allottedLotId": lotId,
      "bidAcceptedBy": localStorage.getItem("username")!,
    }

    const api = axios.create({
      baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/acceptReelerBidForGivenLot", acceptBidPayLoad, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.errorCode == -1) {
          setMessage(res.data.errorMessages[0].message);
          setIserror(true)
        } else {
          setIsSuccess(true)
          setMessage("Bid accepted")
        }

      })
      .catch(error => {
        setMessage("Failed to fetch highest bid");
        setIserror(true)
      })

  };

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
        {showClickDetailsSection && (
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonInput className="input-big-font-size" value={lotNumberValue} onIonInput={(e: any) => {
                  setLotNumberValue(e.detail.value!);
                  setLotId(e.detail.value!);
                }}
                  label="Lot No" labelPlacement="stacked" fill="outline" ref={inputRefLot}></IonInput>
              </IonCol>

            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton id="click-for-details-btn" expand="full" size="large" onClick={fetchHighestBidDetails}>Click for Details</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}



        {showFarmerDetailsSection && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol size='6'>
                  <IonInput className="input-big-font-size" readonly value={lotNumberValue} onIonInput={(e: any) => {
                    setLotNumberValue(e.detail.value!);
                  }}
                    label="Lot No" labelPlacement="stacked" fill="outline"></IonInput>
                </IonCol>

                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={currentDate} label="Date" labelPlacement="floating"></IonInput>
                </IonCol>
              </IonRow>

              {/* <IonRow>
              <IonCol size="6"  class='--ion-grid-column-padding'>
                <IonLabel className='label-content'><h1>Farmer Details</h1></IonLabel>
              </IonCol>
              <IonCol size="6">
                <IonLabel className='label-content'><h1>Reeler Details</h1></IonLabel>
              </IonCol>
            </IonRow> */}

              <IonRow>

              </IonRow>

            </IonGrid>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonRow>
                      <IonCol className='row-header'>
                        <IonLabel className='label-content'><h1>Farmer Details</h1></IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow className='first-row'>
                      <IonCol>
                        <IonItem>{fruitsId}</IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow className='next-row'>
                      <IonCol>
                        <IonItem>{farmerName}</IonItem>
                      </IonCol>
                    </IonRow>
                    {villageName && (
                      <IonRow className='next-row'>
                        <IonCol>
                          <IonItem>{villageName}</IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                  </IonGrid>
                </IonCol>

                <IonCol>
                  <IonGrid>
                    <IonRow>
                      <IonCol className='row-header'>
                        <IonLabel className='label-content'><h1>Reeler Details</h1></IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow className='next-row'>
                      <IonCol>
                        <IonItem>{reelerAuctionId}</IonItem>
                      </IonCol>
                    </IonRow>
                    {reelerFruitsId && (
                      <IonRow className='next-row'>
                        <IonCol>
                          <IonItem>{reelerFruitsId}</IonItem>
                        </IonCol>
                      </IonRow>
                    )}

                    <IonRow className='next-row'>
                      <IonCol>
                        <IonItem>{reelerName}</IonItem>
                      </IonCol>
                    </IonRow>
                    {reelingLicenseNumber && (
                      <IonRow className='next-row'>
                        <IonCol>
                          <IonItem>{reelingLicenseNumber}</IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                    <IonRow className='next-row'>
                      <IonCol>
                        <IonItem>{amount}</IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={fruitsId}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={farmerName}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={villageName}></IonInput>
                </IonCol>
                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={reelerName}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonInput className="ion-text-left" readonly fill="outline" value={amount}></IonInput>
                </IonCol>
              </IonRow>
            </IonGrid> */}

          </>
        )}

        {showAcceptButtonSection && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton id="click-for-details-btn" expand="full" size="large" onClick={handleAcceptButtonEvent}>Accept</IonButton>
              </IonCol>
              <IonCol>
                <IonButton id="click-for-details-btn" expand="full" size="large" onClick={toggleClickDetailsSection}>Back</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        {showBackButtonSection && (
          <IonGrid>

            <IonRow>
              <IonCol>
                <IonLabel>Already Accepted by {bidAcceptedBy}</IonLabel>
              </IonCol>

            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton id="click-for-details-btn" expand="full" size="large" onClick={toggleBackButtonSection} >Back</IonButton>
              </IonCol>

            </IonRow>
          </IonGrid>
        )}
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
          onDidDismiss={() => setIsSuccess(false)}
          cssClass="my-custom-class"
          header={"Success!"}
          message={message}
          buttons={["Dismiss"]}
        />

      </IonContent>
    </IonPage>
  );
};

export default BidAccept;
