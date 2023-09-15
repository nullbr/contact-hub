import { useState } from "react";
import Map from "../Shared/Map";
import { MarkerProp } from "../../types/maps";
import { LocationPayload } from "../../types/locations";
import { useEffect } from "react";
import usePlacesAutocomplete, {
  SetValue,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import SearchInput from "../Shared/Inputs/searchInput";
import { toast } from "react-hot-toast";
import useGeoCode from "../../utils/Hooks/useGeoCode";

interface LocationProps {
  location: LocationPayload | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationPayload | null>>;
}

export const LocationPicker = ({ location, setLocation }: LocationProps) => {
  const locationMark = location && [
    {
      title: location.address,
      position: {
        lat: location.latitude,
        lng: location.longitude,
      },
    },
  ];
  const [markers, setMarkers] = useState<MarkerProp[]>(locationMark || []);
  const geoCode = useGeoCode();

  // Places autocomplete
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  // handle marker click
  const handleMapClick = (event: google.maps.MapMouseEvent | null) => {
    // get lat and lng from event
    const lat = event?.latLng?.lat() || 0;
    const lng = event?.latLng?.lng() || 0;

    // get location details from lat and lng
    geoCode.fromLatLng(lat.toString(), lng.toString()).then(
      (res) => {
        const location: LocationPayload = {
          address: "N/A",
          city: "",
          state: "",
          country: "",
          zip_code: "",
          latitude: lat,
          longitude: lng,
        };

        res.results[0].address_components.forEach(
          (c: google.maps.GeocoderAddressComponent) => {
            if (c.types.includes(addressType) && c.long_name !== "")
              location.address = c.long_name;
            if (c.types.includes(cityType)) location.city = c.long_name;
            if (c.types.includes(stateType)) location.state = c.short_name;
            if (c.types.includes(countryType)) location.country = c.long_name;
            if (c.types.includes(zipCodeType)) location.zip_code = c.long_name;
          }
        );

        // set location
        setLocation(location);

        setValue(res.results[0].formatted_address);

        setMarkers([
          {
            title: location.address,
            position: {
              lat: location.latitude,
              lng: location.longitude,
            },
          },
        ]);
      },
      (err) => {
        console.log(err);

        toast.error("Não foi possível encontrar o município");
      }
    );
  };

  return (
    <div className="grid grid-cols-6 border-b border-gray-200 w-full">
      <div className="col-span-6">
        <label
          htmlFor="regions"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Localização
        </label>

        {/* search input */}
        {!!location ? (
          <button
            type="button"
            className="form-input text-left cursor-text"
            onClick={() => setLocation(null)}
          >
            {location.address}, {location.city}, {location.state},{" "}
            {location.country}
          </button>
        ) : (
          <>
            <SearchInput
              loading={
                status !== "OK" && status !== "ZERO_RESULTS" && value !== ""
              }
              placeHolder="Buscar município"
              changeFn={setValue}
              value={value}
              id="city-search"
            />

            {status === "OK" && data.length > 0 && (
              <ComboBox
                data={data}
                ready={ready}
                setValue={setValue}
                setLocation={setLocation}
                setMarkers={setMarkers}
              />
            )}
          </>
        )}
      </div>

      <div className="col-span-6">
        <Map
          cls="mt-4"
          height="h-80"
          center={{
            lat: location?.latitude || 0,
            lng: location?.longitude || 0,
          }}
          markers={markers}
          handleMapClick={handleMapClick}
          zoom={markers.length > 0 ? 14 : 2}
        />
      </div>
    </div>
  );
};

// results combo component
const addressType = "sublocality_level_1";
const cityType = "administrative_area_level_2";
const stateType = "administrative_area_level_1";
const countryType = "country";
const zipCodeType = "postal_code";

const ComboBox = ({
  data,
  ready,
  setValue,
  setLocation,
  setMarkers,
}: {
  data: google.maps.places.AutocompletePrediction[];
  ready: boolean;
  setValue: SetValue;
  setLocation: React.Dispatch<React.SetStateAction<LocationPayload | null>>;
  setMarkers: React.Dispatch<React.SetStateAction<MarkerProp[]>>;
}) => {
  // handle town select
  const handleSelect = async (address: string) => {
    const results = await getGeocode({ address });

    if (!results.length) {
      toast.error("Não foi possível encontrar o município");
      return;
    }

    const result = results[0];

    // get location details from result
    const location: LocationPayload = {
      address: "N/A",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      latitude: 0,
      longitude: 0,
    };

    result.address_components.forEach((c) => {
      if (c.types.includes(addressType) && c.long_name !== "")
        location.address = c.long_name;
      if (c.types.includes(cityType)) location.city = c.long_name;
      if (c.types.includes(stateType)) location.state = c.short_name;
      if (c.types.includes(countryType)) location.country = c.long_name;
      if (c.types.includes(zipCodeType)) location.zip_code = c.long_name;
    });

    // get lat and lng from result
    const { lat, lng } = await getLatLng(result);
    location.latitude = lat;
    location.longitude = lng;

    // set location
    setLocation(location);

    setValue(result.formatted_address);

    setMarkers([
      {
        title: location.address,
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
      },
    ]);
  };

  // handle select with keyboard
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (data.length > 0) {
          handleSelect(data[0].description);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSelect, data]);

  if (!ready) return null;

  return (
    <div
      className="absolute left-6 z-10 mt-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      tabIndex={-1}
    >
      <div
        className="py-1 flex flex-col z-10 divide-y divide-gray-100"
        role="none"
      >
        {data.map(({ place_id, description }) => (
          <button
            key={place_id}
            type="button"
            onClick={() => handleSelect(description)}
            className="text-gray-500 block px-4 py-2 text-sm text-left"
            tabIndex={-1}
          >
            {description}
          </button>
        ))}
      </div>
    </div>
  );
};
