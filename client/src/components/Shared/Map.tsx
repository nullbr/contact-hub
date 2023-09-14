import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { LoaderIcon } from "../../assets/icons/loaderIcon";
import Paper from "./Template/Paper";
import React, { useState } from "react";
import { Coordinates, MarkerProp } from "../../types/maps";

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ],
};

const Map = ({
  cls = "",
  width = "w-full",
  height = "h-80",
  center,
  zoom = 14,
  markers,
  setOnClick,
  handleMarkerClick = () => {},
  selectedMarkerIds = [],
}: {
  cls?: string;
  width?: string;
  height?: string;
  center: Coordinates;
  zoom?: number;
  markers?: Array<MarkerProp>;
  setOnClick?: React.Dispatch<
    React.SetStateAction<google.maps.MapMouseEvent | null>
  >;
  handleMarkerClick?: (marker: MarkerProp) => void;
  selectedMarkerIds?: number[];
}) => {
  const { loadedMapsScript } = useSelector((state: RootState) => state.app);
  const [openMarker, setOpenMarker] = useState<MarkerProp | null>(null);

  // get on map click info
  function handleMapClick(event: google.maps.MapMouseEvent) {
    if (setOnClick) setOnClick(event);

    setOpenMarker(null);
  }

  return (
    <Paper cls={`flex justify-center items-center ${width} ${height} ${cls}`}>
      {loadedMapsScript ? (
        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerClassName={`rounded-lg ${width} ${height}`}
          onClick={(e) => handleMapClick(e)}
          options={options}
        >
          {markers &&
            markers.map((marker, index) => (
              <MarkerF
                key={index}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                icon={
                  selectedMarkerIds.includes(marker.id || 0)
                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
              >
                {openMarker === marker && (
                  <InfoWindowF onCloseClick={() => setOpenMarker(null)}>
                    <p>{marker.title}</p>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
        </GoogleMap>
      ) : (
        <LoaderIcon cls="w-10 h-10 text-primary-300 animate-spin" />
      )}
    </Paper>
  );
};

export default Map;
