import { useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoadScript } from "../../features/app/appSlice";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const LoadMapsScript = () => {
  const dispatch = useDispatch() as any;

  // load google maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
    language: "pt-BR",
  });

  useEffect(() => {
    if (isLoaded) {
      dispatch(setLoadScript(true));
    }
  }, [isLoaded]);

  return null;
};
export default LoadMapsScript;
