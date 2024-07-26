import fetch from 'node-fetch';

exports.handler = async function(event, context) {
    const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
    const address = event.queryStringParameters.address;
    const range = event.queryStringParameters.range;
    const price = event.queryStringParameters.price;
    const rating = event.queryStringParameters.rating;

    //const range = (rangeInput / 0.00062137).toFixed(0);
    console.log(`Received parameters: address=${address}, range=${range}, price=${price}, rating=${rating}`);

    if (!address || !range) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Address and range are required parameters' })
        };
    }

    // Function to convert address to coordinates using Geocoding API
    const getCoordinates = async (address) => {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        console.log(`Geocode URL: ${geocodeUrl}`);
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return `${location.lat},${location.lng}`;
        } else {
            throw new Error(`Geocode error: ${data.status}`);
        }
    };

    try {
        const coords = await getCoordinates(address);
        let googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${range}&type=restaurant&opennow=true&key=${apiKey}`;
        if (price !== 'any') {
            googlePlacesUrl += `&minprice=${price}&maxprice=${price}`;
        }

        console.log(`Google Places URL: ${googlePlacesUrl}`);

        const response = await fetch(googlePlacesUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        
        // Filter results by rating if provided
        if (rating !== 'any') {
            data.results = data.results.filter(place => place.rating >= rating);
        }

        console.log(`Fetched ${data.results.length} places`);

        return {
            statusCode: 200,
            body: JSON.stringify(data.results),
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

