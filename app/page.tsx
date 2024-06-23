'use client';
import { useState, useEffect, useRef } from "react";
// import { GoogleMap, LoadScript, OverlayView, OverlayViewF } from '@react-google-maps/api';


// components
// import GoogleMap from "./components/GoogleMap";
import EmptyState from "./components/EmptyState";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";
import ListingLoader from "./components/listings/ListingLoader";

// actions
import { getListings } from "./store/actions/listingActions";

// hooks
import useHomeStore from "./store/homeStore";

// keep this on top
// const center = {
//   lat: 15.3501487,
//   lng: 73.6770293
// };

interface IListingsParams {
  userId?: string;
}

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({searchParams}: HomeProps) => {
  const { user } = useHomeStore();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const loadingTime = Number(process.env.NEXT_PUBLIC_LOADING_TIME) || 1000;

  // const [showPopup, setShowPopup] = useState(false);
  // const [mapBounds, setMapBounds] = useState(null);
  // const mapRef = useRef(null);  


  // const CustomMarker = ({ text, onClick }) => (
  //   <div 
  //     onClick={onClick}
  //     style={{
  //       backgroundColor: 'red',
  //       color: 'white',
  //       padding: '10px 15px',
  //       display: 'inline-flex',
  //       textAlign: 'center',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       borderRadius: '50%',
  //       transform: 'translate(-50%, -50%)',
  //       cursor: 'pointer'
  //     }}
  //   >
  //     {text}
  //   </div>
  // );
  
  // const Popup = ({ text, onClose }) => (
  //   <div style={{
  //     position: 'absolute',
  //     bottom: '100%',
  //     left: '50%',
  //     transform: 'translate(-50%, -10px)',
  //     backgroundColor: 'white',
  //     padding: '10px',
  //     borderRadius: '5px',
  //     boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  //   }}>
  //     <div style={{ marginBottom: '10px' }}>{text}</div>
  //     <button onClick={onClose}>Close</button>
  //   </div>
  // );
  
  useEffect(() => {
    const fetchDetails = async () => {
      const params = searchParams;
      const data = await getListings({setLoading, params});
      setListings(data);
      setIsEmpty(!(data.length > 0));
    }

    fetchDetails();
  }, [searchParams]);

  // just to give the loader a cool effect
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setIsLoadingFinished(true);
      }, loadingTime); 

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if(loading || !isLoadingFinished) {
    return ( <ListingLoader count={9}/> )
  }

  if(isEmpty) {
    return <EmptyState showReset/>
  }


  // const markers = [
  //   { id: 1, lat: 15.563718263775774, lng: 73.80066112807999, info: "₹1200" },
  //   { id: 2, lat: 15.550703965947815, lng: 73.7885000284254, info: "₹1800" },
  //   { id: 3, lat: 15.30322, lng: 73.9140425, info: "₹1002" },
  //   { id: 4, lat: 15.2765182, lng: 73.9183683, info: "₹3453" },
  //   { id: 5, lat: 15.1926526, lng: 74.0450205, info: "₹1232" },
  //   { id: 6, lat: 15.2792318, lng: 73.9360818, info: "₹3453" },
  //   { id: 7, lat: 15.0366355, lng: 73.990198, info: "₹4545" },
  // ]

  // const visibleMarkers = markers.filter((listing) => mapBounds && mapBounds.contains({ lat: listing.lat, lng: listing.lng }));

  // console.log(visibleMarkers);


  // const handleBoundsChanged = () => {
  //   if (mapRef.current) {
  //     setMapBounds(mapRef.current.getBounds());
  //   }
  // };

  // const handleMarkerClick = () => {
  //   setShowPopup(true);
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };


  return (
    <Container>
      <div className="pt-24 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return <ListingCard
            currentUser={user}
            key={listing.id}
            data={listing}
          />
        })}

        {/* <div>

    <div style={{ height: '100vh', width: '900px' }}>
          <LoadScript googleMapsApiKey="AIzaSyBs-qVUie4dglZmVZsPJ4vJ-VkGT8VaXks">
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100vh'
              }}
              center={center}
              zoom={11}
              onLoad={(map) => mapRef.current = map}
              onBoundsChanged={handleBoundsChanged}
            >
          {markers.map((map) => {
            return (               <OverlayViewF
            key={map.id}
              position={{ lat: map.lat, lng: map.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
            <>
                

            <CustomMarker text="Wow" onClick={handleMarkerClick} />
              {showPopup && <Popup text="Marker Information" onClose={handleClosePopup} />}
            </>
            </OverlayViewF>)
          })}
    
            </GoogleMap>
          </LoadScript>
    </div>

        </div> */}
      </div>
    </Container>
  );
}

export default Home;