import { useLocation, useNavigate } from 'react-router-dom';

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;
  const itinerary = trip?.Tripdata?.itinerary;

  console.log("Trip data received:", trip); 
  console.log("Itinerary extracted:", itinerary);

  if (!itinerary) {
    return (
      <div className="p-10 text-center text-xl text-gray-700">
        No itinerary available.{' '}
        <button
          className="text-blue-600 underline hover:text-blue-800 transition"
          onClick={() => navigate('/')}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:px-16 lg:px-32 xl:px-48 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-500 mb-10">
        Day-wise Itinerary
      </h1>
      {Object.entries(itinerary).map(([day, details], index) => {
        if (!day.startsWith("day")) return null;
        return (
          <div
            key={day}
            className="bg-white p-6 shadow-lg rounded-3xl hover:shadow-2xl transition duration-300 ease-in-out mb-8"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-5">
              Day {index + 1}
            </h2>
            {details.plan.map((place, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-6 mb-6 border-t border-gray-200 pt-6"
              >
                <img
                  src={place.imageUrl}
                  alt={place.placeName}
                  className="w-full md:w-1/3 rounded-xl object-cover max-h-60 shadow-sm"
                />
                <div className="text-gray-700 space-y-2 md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-900">{place.placeName}</h3>
                  <p><span className="font-medium text-gray-800">Details:</span> {place.placeDetails}</p>
                  <p><span className="font-medium text-gray-800">Best Time:</span> {place.bestTime ||'Not specified'}</p>
                  <p><span className="font-medium text-gray-800">Time Required:</span> {place.timeTravel}</p>
                  
                  {/* Tickets Section */}
                  <p><span className="font-medium text-gray-800">Tickets:</span> 
                    {typeof place.ticketPricing === 'string' ? 
                      place.ticketPricing :
                      place.ticketPricing?.amount || 'N/A'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Itinerary;
