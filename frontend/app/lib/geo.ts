//TODO: dirty hack is dirty, just want typescript to stop srceaming at me
declare global {
	interface Window {
		ENV: {
			GOOGLE_API_KEY: string;
		};
	}
}
// more elegant solutino needed, but this is what remix says to do
export const apiKey = typeof window !== "undefined" ? window.ENV.GOOGLE_API_KEY : null;



/**
 * Checks if a given string is a valid UK postcode.
 * 
 * @param postcode - The string representing the postcode to validate.
 * @returns A boolean indicating whether the postcode is valid or not.
 */
export const isValidUKPostcode = (postcode: string): boolean => {
	const postcodeRegex = /^(GIR ?0AA|(?:(?:AB|AL|B|BA|BB|BD|BF|BH|BL|BN|BR|BS|BT|BX|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(?:\d[\dA-Z]? ?\d[ABD-HJLN-UW-Z]{2}))|BFPO ?\d{1,4})$/i;
	return postcodeRegex.test(postcode);
};


/**
 * Checks if a given string is a valid UK postcode.
 * 
 * @param Props object containing `{latitude:any, longitude:any}` coordinates
 * @returns Coordinates object containing `{latitude:number, longitude:number}` coordinates
 */
export const validateCoordinates = (props: any): Coordinates | null => {
	const coordinates: Coordinates = {
		latitude: parseFloat(props.latitude),
		longitude: parseFloat(props.longitude),
	};
	if (isNaN(coordinates.latitude) || isNaN(coordinates.longitude)) {
		return null;
	}
	if (coordinates.latitude === 0 || coordinates.longitude === 0) {
		return null;
	}
	//TODO: check coordinates are within acceptable range - no point looking for data in France yet
	return coordinates;
};

/**
 * Finds street addresses at the given postcode.
 * 
 * @param postcode - UK postcode, e.g., SW1W 3GT.
 * @returns A URL-encoded query string.
 */
export const getCoordinatesFromAddress = async (query: string): Promise<Coordinates | undefined> => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?countrycode=GB&address=${encodeURIComponent(query)}&key=${apiKey}`;
	try {
		const response = await fetch(url);//, { mode: 'no-cors' });
		const data = await response.text();
		let json;
		try {
			json = JSON.parse(data);
		}
		catch (e) {
			console.error("GEO: Failed to parse JSON from google", { e, data });
		}
		console.log("GEO: GEOCODING: ", { query, data, json });
		if (json && json.status === 'OK' && json.results?.length > 0) {
			const { lat, lng } = json?.results[0].geometry?.location || {};
			if (!lat || !lng) return;
			return { latitude: lat, longitude: lng };
		} else {
			console.error("GEO: Geocoding failed", { query, data });
		}
	}
	catch (error) {
		console.log("GEO: Geocoding error", error);
	}
};

/**
 * Finds latlng coordinates for a given query string (address, postcode, city, etc).
 * 
 * @param query - The string representing the address to geocode.
 * @returns The coordinates as type `Coordinates`.
 */
export const getAddressesFromAddress = async (address: string, coordinates?: Coordinates): Promise<google.maps.places.Place[] | undefined> => {
	const url = [`https://maps.googleapis.com/maps/api/place/autocomplete/json?`,
		`input=${encodeURIComponent(address)}`,
		`types=street_address`,
		`components=country:GB`,
		`key=${apiKey}`,
		coordinates?.latitude ? `location=${coordinates.latitude},${coordinates.longitude}` : '',
	].filter(s => !!s).join('&');
	try {
		const response = await fetch(url);//, { mode: 'no-cors' });
		const data = await response.json();
		if (data.status === 'OK') {
			// Print each address
			data.predictions.forEach((place: any) => {
				console.log("GEO: ADDRESS LOOKUP: ", place.description, data.predictions);
			});
			return data.predictions;
		} else {
			console.error('GEO: Failed to fetch addresses:', data.status);
		}
	}
	catch (error) {
		console.error('GEO: Error fetching data:', error);
	}
}



