import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/Firebaseconfig';
import Usertripcard from './componants/Usertripcard';

function Mytrip() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      trips.push(doc.data());
    });

    setUserTrips(trips);
  };

  return (
    <div className="sm:p-10 md:px-32 lg:px-56 xl:px-10 px-5">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 object-cover rounded-xl gap-5'>
        {userTrips.map((trip, index) => (
          <Usertripcard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default Mytrip;
