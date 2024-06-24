'use client';
import React from 'react'

interface MapMarkerProps {
    listing: any;
    onClick : () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ listing, onClick}) => {
  return (
    <div onClick={onClick} className='transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white shadow-md border border-gray-400  px-3 flex flex-row items-center justify-center rounded-full cursor-pointer'>
        <p className='text-lg font-semibold'>
        $ {listing.price}
        </p>
    </div>    
  )
}

export default MapMarker
