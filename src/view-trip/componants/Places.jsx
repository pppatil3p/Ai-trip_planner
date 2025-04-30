import React from 'react';
import { Link } from 'react-router-dom'; 
import { getplacedetail } from '@/service/Globalapi';
import Placecard from './Placecaed';
const Places = ({ trip }) => {
  const itinerary = trip?.Tripdata?.itinerary ? Object.entries(trip.Tripdata.itinerary) : [];

  return (
    <div className='font-bold text-xl mt-5'>
      <h2 className='m-5'>Places to Visit</h2>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5'> 
        {itinerary.map(([dayKey, dayData]) =>
          Array.isArray(dayData.plan) &&
          dayData.plan.map((place, index) => (
            <Placecard place={place}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Places;
