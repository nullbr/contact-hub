import { useEffect, useRef } from "react";

const Modal = ({
  children,
  closeFn,
  maxWidth = "max-w-2xl",
}: {
  children: React.ReactNode;
  closeFn: () => void;
  maxWidth?: "max-w-4xl" | "max-w-2xl" | "max-w-lg";
}) => {
  // handle click outside of modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeFn();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[100svh]"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-h-[100svh] -translate-x-1/2 sm:-translate-y-1/2 sm:top-2/4 left-1/2 ${maxWidth} animate-fade-in`}
      >
        {/* <!-- Modal content --> */}
        {children}
      </div>
    </div>
  );
};
export default Modal;
