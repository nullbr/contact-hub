import { useEffect, useRef } from "react";

export type ComboResource = {
  id: number;
  name: JSX.Element | string;
};

// parent of this component must be relative
const ComboBox = ({
  cls = "",
  buttonRef,
  results,
  openCombo,
  setOpenCombo,
  handleSelect,
}: {
  cls?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  results: Array<ComboResource> | undefined | null;
  openCombo: boolean;
  setOpenCombo:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((state: boolean) => void);
  handleSelect: (id: number) => void;
}) => {
  // handle click outside of combobox
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openCombo) return;

    const handleClickOutside = (event: any) => {
      if (
        comboRef.current &&
        !comboRef.current.contains(event.target) &&
        (!buttonRef ||
          (buttonRef.current && !buttonRef.current.contains(event.target)))
      ) {
        setOpenCombo(false);
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (results && results.length > 0) {
          handleSelect(results[0].id);
          setOpenCombo(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [comboRef, results, handleSelect, setOpenCombo, buttonRef, openCombo]);

  if (!openCombo || !results) return null;

  return (
    <div
      ref={comboRef}
      className={`absolute left-0 z-10 mt-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[16rem] ${cls}`}
      tabIndex={-1}
    >
      <div
        className="py-1 flex flex-col whitespace-nowrap divide-y divide-gray-100"
        role="none"
      >
        {results.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            className="text-gray-500 block px-4 py-2 text-sm text-left"
            tabIndex={-1}
          >
            {item.name}
          </button>
        ))}
        {results.length === 0 && (
          <p
            className="text-gray-500 block px-4 py-2 text-sm text-left"
            tabIndex={-1}
          >
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
