"use client";
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

// utils
import axiosClient from '../utils/axios-client';

// components
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

// hooks
import useConfirmModal from '../hooks/useConfirmModal';

interface PropertiesClientProps {
    listings: any;
    currentUser: any;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser}) => {
    const { onOpen, onClose, onLoading } = useConfirmModal();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        onLoading();
        axiosClient.delete(`/listing/delete/${id}`).then(({ data }) => {
            toast.success(data.message);
        })
        .catch((error) => {
            toast.error(error?.message);
        }).finally(() => {
            setDeletingId('');
            onClose();
        })
    },[]);

  return (
    <Container>
        <Heading
            title="Properties"
            subtitle="Where yo've been and where you're going"
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing: any) => (
                <ListingCard 
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={(id) => onOpen(() => onCancel(id))}
                    disabled={deletingId === listing.id}
                    actionLabel='Delete Property'
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default PropertiesClient
