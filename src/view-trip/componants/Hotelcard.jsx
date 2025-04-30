import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getplacedetail, PHOTO_REF_URL } from '@/service/Globalapi';

const Hotelcard = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState('/images.jpeg'); 
  
  useEffect(() => {
    if (hotel) {
      getplacephoto();
    }
  }, [hotel]); 
  
  const getplacephoto = async () => {
    try {
      const data = {
        textQuery: hotel.hotelName,
      };
      const response = await getplacedetail(data);
      const photoReference = response?.photos?.[0]?.photo_reference;

      if (photoReference) {
        const finalPhotoUrl = `${PHOTO_REF_URL}&photoreference=${photoReference}`;
        setPhotoUrl(finalPhotoUrl);
      } else {
        setPhotoUrl('https://via.placeholder.com/400x300?text=No+Image');
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl('https://via.placeholder.com/400x300?text=Error+Loading');
    }
  };

  return (
    <div className="p-2">
      <Link
        key={index}
        to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel.hotelAddress}
        target='_blank'
        className="block no-underline"
      >
        <div className='bg-white rounded-xl hover:shadow-xl shadow-cyan-800 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden'>
          <div className="relative">
            <img 
              src={photoUrl} 
              className='h-48 w-full object-cover' 
              alt={hotel.hotelName} 
            />
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1">
              <span className="text-yellow-500 font-semibold">⭐ {hotel.ratings || 'N/A'}</span>
            </div>
          </div>
          
          <div className='p-4 flex flex-col gap-2'>
            <h2 className='font-bold text-gray-800 truncate'>{hotel.hotelName}</h2>
            <p className='text-sm text-gray-500 line-clamp-2'>📍 {hotel.hotelAddress}</p>
            
            <div className='mt-3 flex items-center'>
              <div className='font-medium text-emerald-600'>
                <span className="text-lg">💰</span> {hotel.price?.currency || ''} {hotel.price?.range || ''}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hotelcard;
