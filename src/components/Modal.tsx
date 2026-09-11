import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function Modal({
  onClose,
  children,
  labelledBy,
  maxWidth = "max-w-lg",
}: {
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  maxWidth?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-[fade-in_0.2s_ease]" onClick={onClose} />
      <div className={`relative z-10 w-full ${maxWidth} max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-panel animate-[modal-in_0.22s_cubic-bezier(0.16,1,0.3,1)]`}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal-500 shadow-sm hover:text-charcoal-900"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modal-in { from { opacity: 0; transform: scale(0.97) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>,
    document.body
  );
}
