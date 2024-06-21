'use client';
import React, { useEffect, useRef, useState } from 'react';

// AIzaSyBs-qVUie4dglZmVZsPJ4vJ-VkGT8VaXks
{/* <div style={{ height: '100vh', width: '900px' }}></div> */}

interface Marker {
  id: number; // Unique identifier for each marker
  lat: number;
  lng: number;
  info?: string; // Additional information for the marker
  markerInstance?: any; // Google Maps Marker instance (optional)
}

interface BoundingBox {
  northEast: {
    lat: number;
    lng: number;
  };
  southWest: {
    lat: number;
    lng: number;
  };
}

// Declare Google Maps API globally
declare global {
  interface Window {
    google: any; // Replace `any` with a more specific type if possible
  }
}

let boundingBox: BoundingBox; // Global bounding box variable

const GoogleMap: React.FC = () => {
  const [map, setMap] = useState<any>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 1, lat: 15.563718263775774, lng: 73.80066112807999, info: "₹1200" },
    { id: 2, lat: 15.550703965947815, lng: 73.7885000284254, info: "₹1800" },
    { id: 3, lat: 15.30322, lng: 73.9140425, info: "₹1002" },
    { id: 4, lat: 15.2765182, lng: 73.9183683, info: "₹3453" },
    { id: 5, lat: 15.1926526, lng: 74.0450205, info: "₹1232" },
    { id: 6, lat: 15.2792318, lng: 73.9360818, info: "₹3453" },
    { id: 7, lat: 15.0366355, lng: 73.990198, info: "₹4545" },
    // Add more markers as needed
  ]);

  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || map !== null) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 15.3501487, lng: 73.6770293 },
      zoom: 10,
    });
    setMap(googleMap);
  }, [map]);

  // Update markers when the map or markers state changes
  useEffect(() => {
    if (!map || !markers.length) return;

    const updateMarkers = () => {
      const bounds = map.getBounds();
      if (bounds) {
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        
        boundingBox = {
          northEast: { lat: northEast.lat(), lng: northEast.lng() },
          southWest: { lat: southWest.lat(), lng: southWest.lng() },
        };
      }

      if (!boundingBox) {
        boundingBox = {
          northEast: { lat: 15.877208, lng: 74.321104 },
          southWest: { lat: 14.838667, lng: 73.902748 },
        };
      }

      const filteredMarkers = getMarkersInBoundingBox(markers, boundingBox);
      console.log(filteredMarkers);

      // Clear existing markers
      markers.forEach((marker) => {
        if (marker.markerInstance) {
          marker.markerInstance.setMap(null);
        }
      });

      // Add new markers
      filteredMarkers.forEach((marker) => {
        const markerInstance = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          label: {
            text: `${marker.info}`,
            fontWeight: 'bold',
            color: marker.id === currentId ? 'white' : 'black',
          },
          icon: {
            url: marker.id === currentId ? '/images/black.png' : '/images/white.png',
            scaledSize: new window.google.maps.Size(60, 30),
          },
        });

        // Show info window on marker click
        markerInstance.addListener('click', () => {
          if (marker.info) {
            const infowindow = new window.google.maps.InfoWindow({
              content: `<div style="color: red;">${marker.info}</div>`,
            });
            infowindow.open(map, markerInstance);
          }
          setCurrentId(marker.id);
        });

        // Assign marker instance to marker object
        marker.markerInstance = markerInstance;
      });
    };

    // Add event listeners to update markers on map changes
    window.google.maps.event.addListener(map, 'zoom_changed', updateMarkers);
    window.google.maps.event.addListener(map, 'bounds_changed', updateMarkers);

    // Initial marker population
    updateMarkers();

    // Cleanup listeners and marker instances on component unmount
    return () => {
      window.google.maps.event.clearListeners(map, 'zoom_changed');
      window.google.maps.event.clearListeners(map, 'bounds_changed');
      markers.forEach((marker) => {
        if (marker.markerInstance) {
          window.google.maps.event.clearInstanceListeners(marker.markerInstance);
          marker.markerInstance.setMap(null);
        }
      });
    };
  }, [map, markers, currentId]);

  // Filter markers within the bounding box
  function getMarkersInBoundingBox(markers: Marker[], boundingBox: BoundingBox): Marker[] {
    return markers.filter((marker) => {
      return (
        marker.lat >= boundingBox.southWest.lat &&
        marker.lat <= boundingBox.northEast.lat &&
        marker.lng >= boundingBox.southWest.lng &&
        marker.lng <= boundingBox.northEast.lng
      );
    });
  }

  return <div ref={mapRef} style={{ height: '100%', width:(window.innerWidth/2)- 30, minHeight:"700px" }} />;
};

export default GoogleMap;
