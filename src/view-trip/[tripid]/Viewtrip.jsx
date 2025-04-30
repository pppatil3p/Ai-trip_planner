import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoSec from '../componants/InfoSec';
import Hotels from '../componants/Hotels';
import Places from '../componants/Places';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/Firebaseconfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Viewtrip = () => {
  const { tripid } = useParams();
  const [trip, settrip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    tripid && gettripdata();
  }, [tripid]);

  const gettripdata = async () => {
    const docRef = doc(db, 'AITrips', tripid);
    const docsanp = await getDoc(docRef);
    if (docsanp.exists()) {
      console.log("document:", docsanp.data());
      settrip(docsanp.data());
    } else {
      console.log("no doc");
      toast('no trip found');
    }
  };

  const handleItineraryClick = () => {
    navigate('/itinerary', { state: { trip } });
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 space-y-6'>
      <InfoSec trip={trip} />
      <Hotels trip={trip} />
      <Places trip={trip} />
      <div className="text-center">
        <button
          onClick={handleItineraryClick}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
        >
          Show Itinerary
        </button>
      </div>
    </div>
  );
};

export default Viewtrip;
