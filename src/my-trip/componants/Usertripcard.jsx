import React, { useEffect, useState } from 'react';
import { getplacedetail } from '@/service/Globalapi';
import { Link } from 'react-router-dom';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/NAME/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function Usertripcard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');
  
  useEffect(() => {
    if (trip) {
      getplacephoto();
    }
  }, [trip]);
  
  const getplacephoto = async () => {
    const data = {
      textQuery: trip?.userselection?.location?.label,
    };
    // Note: Your original function was empty - you may want to implement the actual photo fetching logic here
  };

  return (
    <Link to={'/view-trip/' + trip.id} className="block">
      <div className='bg-white overflow-hidden rounded-xl  hover:shadow-xl shadow-cyan-800 transition-all duration-300 hover:scale-105 transform'>
        <div className="relative h-48">
          <img 
            src={photoUrl ? photoUrl : "/trip.jpeg"} 
            className='w-full h-full object-cover'
            alt={trip?.userselection?.location?.label || "Trip destination"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {trip?.userselection?.noofdays} Days
            </span>
            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full ml-2">
              {trip?.userselection?.budget}
            </span>
          </div>
        </div>
        
        <div className="p-4 ">
          <h2 className='font-bold text-lg text-gray-800'>{trip?.userselection?.location?.label}</h2>
          <div className="flex items-center mt-2 text-gray-600">
           
            <span className="text-sm">
              {trip?.userselection?.noofdays} Days trip with {trip?.userselection?.budget} budget
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Usertripcard;