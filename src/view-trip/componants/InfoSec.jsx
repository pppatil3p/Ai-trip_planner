import React, { useEffect, useState } from 'react';
import { FaShareAltSquare } from 'react-icons/fa';
import { getplacedetail } from '@/service/Globalapi';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/NAME/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

const InfoSec = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/trip.jpeg');

  useEffect(() => {
    if (trip) {
      getplacephoto();
    }
  }, [trip]);

  const getplacephoto = async () => {
    const data = {
      textQuery: trip?.userselection?.location?.label,
    };
    try {
      const resp = await getplacedetail(data);

      if (resp.data?.places?.[0]?.photos?.[1]?.name) {
        const photoName = resp.data.places[0].photos[1].name;
        const url = PHOTO_REF_URL.replace('NAME', photoName);
        setPhotoUrl(url); // Store the photo URL in state
       // console.log('Photo URL:', url);
      } else {
       // console.error("Photo data is incomplete or missing.");
      }
    } catch (error) {
    //  console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      

      {photoUrl ? (
        <img src={photoUrl} alt="Place" className="h-[270px] w-full object-cover rounded-xl" />
      ) : (
        <img src="/trip.jpeg" alt="Default Trip" className="h-[270px] w-full object-cover rounded-xl" />
      )}

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userselection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-600 rounded-full text-gray-100 text-xs md:text-md">
              📆{trip?.userselection?.noofdays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-600 rounded-full text-gray-100 text-xs md:text-md">
              💰{trip?.userselection?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-600 rounded-full text-gray-100 text-xs md:text-md">
              🥂 No.of Traveler: {trip?.userselection?.Traveler}
            </h2>
          </div>
        </div>
        <button className="h-10">
          <FaShareAltSquare />
        </button>
      </div>
    </div>
  );
};

export default InfoSec;