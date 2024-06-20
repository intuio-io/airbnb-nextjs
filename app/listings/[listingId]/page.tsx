'use client';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// utils
import axiosClient from '@/app/utils/axios-client';

// components
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

// hooks
import useCurrentUser from '@/app/hooks/useCurrentUser';

interface IParams {
    listingId?: string;
}

const page = ({params}: {params: IParams}) => {
    const currentUser = useCurrentUser();
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchListingDetail = async () => {
            try {
                const response = await axiosClient.get(`/listing/${params.listingId}`);
                setListing(response.data);
            } catch (error) {
                toast.error("Error fetch listing details");
            } finally {
                setLoading(false);
            }
        }

        fetchListingDetail();
    },[]);

    if(loading) {
        return <div>loading....</div>
    }

    if(listing.length === 0) {
        return <EmptyState/>
    }

  return (
    <ListingClient listing={listing} currentUser={currentUser}/>
  )
}

export default page
