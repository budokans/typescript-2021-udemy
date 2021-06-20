import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyB5wtYmn1rXbew60NTXtiqpPDBRM8hjREo";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchHandler = (event: Event) => {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Something went wrong!");
      }
      const coordinates = res.data.results[0].geometry.location;
      console.log(coordinates);
    })
    .catch((err) => console.log(err));
};

form.addEventListener("submit", searchHandler);
