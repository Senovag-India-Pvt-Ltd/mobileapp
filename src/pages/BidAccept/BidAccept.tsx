import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './../BidAccept/BidAccept.css';
import axios from "axios";
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const BidAccept: React.FC = () => {

  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [dateValue, setDateValue] = useState<string>("");
  const [lotNumberValue, setLotNumberValue] = useState<number>();
  const [showClickDetailsSection, setShowClickDetailsSection] = useState(true);
  const [showFarmerDetailsSection, setShowFarmerDetailsSection] = useState(false);
  const [showAcceptButtonSection, setShowAcceptButtonSection] = useState(false);
  const [showBackButtonSection, setShowBackButtonSection] = useState(false);
  const [marketId, setMarketId] = useState<number>(9);
  const [lotId, setLotId] = useState<number>();

  const [fruitsId, setFruitsId] = useState<string>("");
  const [farmerName, setFarmerName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [reelerAuctionId, setReelerAuctionId] = useState<number>();
  const [reelerName, setReelerName] = useState<string>("");
  const [villageName, setVillageName] = useState<string>("");
  const [bidStatus, setBidStatus] = useState<string>("");
  const [bidAcceptedBy, setBidAcceptedBy] = useState<string>("");

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
    return `${year}-${month}-${day}`;
  };

  // State to hold the current date
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());


  const fetchHighestBidDetails = () => {
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
    api.post("/getHighestBidPerLotDetails", fetchHighestBidPayload)
        .then(res => { 
          let contents = res.data.content;

          setFruitsId(contents.farmerNumber);
          setFarmerName(contents.farmerFirstName + "" + contents.farmerMiddleName + "" + contents.farmerLastName); 
          setAmount(contents.amount + ".000");  
          setReelerName(contents.reelerName);
          setReelerAuctionId(contents.reelerAuctionId);   
          setVillageName(contents.farmervillageName);
          setBidAcceptedBy(contents.bidAcceptedBy);
          setBidStatus(contents.status);
          
          if(contents.status == "accepted"){
            setShowFarmerDetailsSection(!showFarmerDetailsSection);
            setShowAcceptButtonSection(false);
            setShowBackButtonSection(!showBackButtonSection);
          }

         })
         .catch(error=>{
            setMessage("Failed to fetch highest bid");
            setIserror(true)
         })

        }
         

  const toggleBackButtonSection = () => {
    setShowClickDetailsSection(true);
    setShowFarmerDetailsSection(false);
    setShowAcceptButtonSection(false);
    setShowBackButtonSection(false);
  }

  const toggleClickDetailsSection = () => {
    setShowClickDetailsSection(!showClickDetailsSection);
    setShowFarmerDetailsSection(!showFarmerDetailsSection);
    setShowAcceptButtonSection(!showAcceptButtonSection);
  };

  const handleAcceptButtonEvent = () => {
    setShowClickDetailsSection(!showClickDetailsSection);
    setShowFarmerDetailsSection(!showFarmerDetailsSection);
    setShowAcceptButtonSection(!showAcceptButtonSection);

    const acceptBidPayLoad = {
      "marketId": localStorage.getItem("marketId"),
      "godownId": localStorage.getItem("godownId"),
      "allottedLotId": lotId,
      "bidAcceptedBy":localStorage.getItem("username")!,
    }
    
    const api = axios.create({
        baseURL: `https://api.senovagseri.com/market-auction/v1/auction/reeler`
    })
    api.post("/acceptReelerBidForGivenLot", acceptBidPayLoad)
        .then(res => { 
          console.log(res.data);
         })
         .catch(error=>{
            setMessage("Failed to fetch highest bid");
            setIserror(true)
         })
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enter Lot Number for Acceptance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        {showClickDetailsSection && (
          <IonGrid>
            <IonRow>
              <IonCol size='6'>
                <IonInput className="ion-text-left" value={lotNumberValue} onIonInput={(e: any) => {
                  setLotNumberValue(e.detail.value!);
                  setLotId(parseInt(e.detail.value!));
                }}
                  label="Lot Number" labelPlacement="floating" fill="outline"></IonInput>
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
                <IonInput className="ion-text-left" readonly value={lotNumberValue} onIonInput={(e: any) => {
                  setLotNumberValue(e.detail.value!);
                }}
                  label="Lot Number" labelPlacement="floating" fill="outline"></IonInput>
              </IonCol>

              <IonCol size="6">
                <IonInput className="ion-text-left" readonly fill="outline" value={currentDate}  label="Date" labelPlacement="floating"></IonInput>
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
                  <IonRow className='next-row'>
                    <IonCol>
                      <IonItem>{villageName}</IonItem>
                    </IonCol>
                  </IonRow>
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
                      <IonItem>{reelerName}</IonItem>
                    </IonCol>
                  </IonRow>
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

      </IonContent>
    </IonPage>
  );
};

export default BidAccept;
