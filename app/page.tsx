'use client';
import { useState, useEffect } from "react";
// import { Status, Wrapper } from '@googlemaps/react-wrapper';

// components
// import GoogleMap from "./components/GoogleMap";
import EmptyState from "./components/EmptyState";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";

// utils
import axiosClient from "./utils/axios-client";
import toast from "react-hot-toast";

// hooks
import useCurrentUser from "./hooks/useCurrentUser";

export default function Home() {
  const currentUser = useCurrentUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosClient.get('/listing/getListings');
        setListings(response.data);
        setIsEmpty(!(response.data.length > 0));
      } catch (error) {
        toast.error('Error fetching listing');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if(isEmpty) {
    return <EmptyState showReset/>
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        })}

        {/* <div>
        <Wrapper apiKey={"AIzaSyBs-qVUie4dglZmVZsPJ4vJ-VkGT8VaXks"} render={ (status: Status) => (<h1>{status}</h1>)}>
        <GoogleMap />
      </Wrapper>
        </div> */}
      </div>
    </Container>
  );
}
