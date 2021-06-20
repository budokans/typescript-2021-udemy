import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyB5wtYmn1rXbew60NTXtiqpPDBRM8hjREo";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function initMap(coordinates: { lat: number; lng: number }): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: coordinates,
      zoom: 16,
    }
  );
  new google.maps.Marker({
    position: coordinates,
    map,
  });
}

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

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
      initMap(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener("submit", searchHandler);
