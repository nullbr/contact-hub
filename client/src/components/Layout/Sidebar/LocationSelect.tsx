import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "../../../assets/icons/heroicons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CityAutocomplete } from "./CityAutocomplete";
import { CityInfo } from "./CityInfo";

// main component
const LocationSelect = () => {
  const {
    currentUser: { defaultLocation },
  } = useSelector((state: RootState) => state.sessions);
  const { loadedMapsScript } = useSelector((state: RootState) => state.app);
  const [openSearch, setOpenSearch] = useState(false);

  // effect to hide search bar when click outside
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    };

    if (openSearch) {
      document.addEventListener("mousedown", handleClickOutsideSidebar);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
    };
  }, [openSearch]);

  return (
    <>
      {openSearch && loadedMapsScript ? (
        <div ref={searchRef} className="relative inline-block text-left w-full">
          <CityAutocomplete setOpenSearch={setOpenSearch} />

          <CityInfo />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpenSearch(true)}
          className="flex gap-2 justify-between w-full rounded-lg p-2 text-gray-900 hover:bg-gray-100"
        >
          <p>
            <span className="capitalize">{defaultLocation?.city}, </span>
            <span className="uppercase">{defaultLocation?.state}</span>
          </p>
          <ChevronDown cls="h-2 my-auto" />
        </button>
      )}
    </>
  );
};

export default LocationSelect;
