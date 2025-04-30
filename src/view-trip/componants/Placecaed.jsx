import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getplacedetail, PHOTO_REF_URL } from '@/service/Globalapi';

const Placecard = ({ place, index }) => {
  const [photoUrl, setPhotoUrl] = useState('/b.jpg'); 
  
  useEffect(() => {
    if (place) {
      getplacephoto();
    }
  }, [place]); 
  
  const getplacephoto = async () => {
    if (!place?.placeName) return; 
    
    const data = { textQuery: place.placeName };
    
    try {
      const resp = await getplacedetail(data);
      const photoArray = resp.data?.places?.[0]?.photos || [];
      
      if (photoArray.length > 0) {
        const photoName = photoArray[0]?.name; 
        if (photoName) {
          const url = PHOTO_REF_URL.replace('NAME', photoName);
          setPhotoUrl(url);
        }
      } else {
        setPhotoUrl('/b.jpg');
      }
    } catch (error) {
      setPhotoUrl('/b.jpg');
    }
  };
  
  const renderTicketPricing = () => {
    if (!place.ticketPricing) return "Free or not available";
    
    if (typeof place.ticketPricing === 'string') {
      return place.ticketPricing;
    } else {
      return Object.entries(place.ticketPricing)
        .slice(0, 2)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ') + (Object.keys(place.ticketPricing).length > 2 ? '...' : '');
    }
  };
console.log()
  return (
    <div className="p-2">
      <Link
        key={index}
        to={`https://www.google.com/maps/search/?api=1&query=${place.geoCoordinates?.latitude},${place.geoCoordinates?.longitude}`}
        target='_blank'
        className="block no-underline"
      >
        <div className='bg-white  hover:shadow-xl shadow-cyan-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer'>
          <div className="relative">
            <img
              src={photoUrl}
              className='h-48 w-full  object-cover'
              alt={place.placeName || 'Place image'}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <h2 className='font-bold text-lg text-white truncate'>{place.placeName}</h2>
            </div>
          </div>
          
          <div className='p-4 flex flex-col gap-3'>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">📍</span>
              <p className='truncate'>{place.placeDetails}</p>
            </div>
            
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex items-center text-sm bg-blue-50 p-2 rounded-lg'>
                <span className="mr-1 text-blue-500">⏰</span>
                <span className="text-gray-800 font-medium">{place.bestTime ||'Not Specified'}</span>
              </div>
              <div className='flex items-center text-sm bg-indigo-50 p-2 rounded-lg'>
                <span className="mr-1 text-indigo-500">🚗</span>
                <span className="text-gray-800 font-medium">{place.timeTravel}</span>
              </div>
            </div>
            
            <div className='mt-2 p-2 bg-gray-50 rounded-lg'>
              <div className='text-xs text-gray-700'>
                <span className="font-semibold">Ticket Pricing: </span>
                <span className="text-gray-600">{renderTicketPricing()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Placecard;