import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden"; // prevent background scroll
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // click on overlay closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden m-4">
        {/* Close button */}
        <div className="absolute right-3 top-3">
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
