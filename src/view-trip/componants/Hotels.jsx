import React from 'react';
import { Link } from 'react-router-dom';
import Hotelcard from './Hotelcard';

const Hotels = ({ trip }) => {
  return (
    <div className='font-bold text-xl mt-5'>
      <h2 className='m-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.Tripdata?.hotelOptions?.map((hotel, index) => (
          <Hotelcard key={index} hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;