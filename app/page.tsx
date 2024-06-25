'use client';
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { GoogleMap, OverlayView, OverlayViewF, useLoadScript } from '@react-google-maps/api';

// components
import EmptyState from "./components/EmptyState";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";
import ListingLoader from "./components/listings/ListingLoader";
import MapMarker from "./components/MapMarker";
import ListingMapMenu from "./components/listings/ListingMapMenu";

// actions
import { getListings } from "./store/actions/listingActions";

// hooks
import useHomeStore from "./store/homeStore";
import useSocket from "./hooks/useSocket";

interface IListingsParams {
  userId?: string;
}

interface HomeProps {
  searchParams: IListingsParams;
}


const Home = ({searchParams}: HomeProps) => {
  const { user, location } = useHomeStore();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapListings, setMapListings] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const loadingTime = Number(process.env.NEXT_PUBLIC_LOADING_TIME) || 1000;
  const socket = useSocket(process.env.NEXT_PUBLIC_API_BASE_URL);

  
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY || '' });

  const params = useSearchParams();
  const locationValue = params?.get('locationValue');

  const [mapCenter, setMapCenter] = useState<any>({});
  const [showPopup, setShowPopup] = useState(false);
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [listingId, setListingId] = useState<string>("");

  const mapRef = useRef<any>(null);  

  useEffect(() => {
    if (location?.latlng) {
      setMapCenter({ lat: location.latlng[0], lng: location.latlng[1] });
    }
  }, [location]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      const params = searchParams;
      const listings = await getListings({setLoading, params});
      setListings(listings);

      setIsEmpty(!(listings.length > 0));
    }

    fetchDetails();

    if (socket) socket.on("listingsUpdated", () => fetchDetails());

    return () =>  {socket && socket.off('listingsUpdated');}
  }, [searchParams, socket]);


  // just to give the loader a cool effect
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setIsLoadingFinished(true);
      }, loadingTime); 

      return () => clearTimeout(timeout);
    }
  }, [loading]);


  useEffect(() => {
      const currentData = listings.filter((listing) => mapBounds && mapBounds.contains({ lat: listing.locationValue.latlng[0], lng: listing.locationValue.latlng[1] }));
      setMapListings(currentData);
  }, [mapBounds])

  if(loading || !isLoadingFinished) {
    return ( <ListingLoader count={9}/> )
  }

  if(isEmpty) {
    return <EmptyState showReset/>
  }

  const handleBoundsChanged = () => {
    if (mapRef.current) {
      setMapBounds(mapRef.current.getBounds());
    }
  };

  const handleMarkerClick = (listing: any) => {
    setShowPopup(true);
    setListingId(listing.id);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setListingId("");
  };


  if(location && locationValue) {
    return (
      <div className="flex flex-col md:flex-row">
      <div className="w-full lg:w-3/5 overflow-y-auto">
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mapListings.map((listing: any) => {
              return <ListingCard
                currentUser={user}
                key={listing.id}
                data={listing}
              />
            })}
        </div>
      </Container>
    </div>

 {isLoaded && mapCenter.lat && mapCenter.lng ? (   
    <div className="fixed top-24 right-0 md:w-2/5 h-screen hidden lg:block">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '90vh' }}
          center={mapCenter}
          zoom={6}
          onBoundsChanged={handleBoundsChanged}
          onLoad={(map: any) => mapRef.current = map}
          mapTypeId='roadmap' // Set the map type to satellite
        >
      {listings.map((listing) => {
        return (
        <OverlayViewF
          key={listing.id}
          position={{ lat: listing.locationValue.latlng[0], lng: listing.locationValue.latlng[1] }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
        <>

          <div className="relative">
          {showPopup && listingId === listing.id &&  
    
    <div className="z-50 absolute w-[20rem]">
      <ListingMapMenu data={listing} user={user} onClose={handleClosePopup}/>
    </div>

}
     
        <MapMarker listing={listing} onClick={() => handleMarkerClick(listing)} />
          </div>

        </>
        </OverlayViewF>)
      })}
        </GoogleMap>
      </div>) : 
      
      <div>Loading...</div>}
    </div>
    )

  }

  return (
      <>
      <Container>
        <div className="pt-24 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
                  return <ListingCard
                    currentUser={user}
                    key={listing.id}
                    data={listing}
                  />
                })}
        </div>
        </Container>
      </>
)
}

export default Home;