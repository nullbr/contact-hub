import Geocode from "react-geocode";

const useGeoCode = () => {
  Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string);
  Geocode.setLanguage("pt-BR");

  return Geocode;
};
export default useGeoCode;
