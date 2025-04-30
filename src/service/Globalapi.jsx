import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id,places.formattedAddress,places.photos.name'
    }
};

export const getplacedetail = async (data) => {
    const requestBody = {
        textQuery: data.textQuery
    };

    try {
        const response = await axios.post(BASE_URL, requestBody, config);
        return response;
    } catch (error) {
        console.error("Error fetching place details:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/NAME/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;