import { useCallback, useEffect } from "react";
import { setEvents } from "../helpers/logger";

type Props = {
  disabled?: boolean;
};

/**
 * Prevent Copy-Paste
 */
export function useCopyDisable({ disabled }: Props = { disabled: false }) {
  const handleCopy = useCallback((e: ClipboardEvent) => {
    setEvents("try to copy");
    e.preventDefault();
  }, []);

  useEffect(() => {
    const removeListener = () => {
      document.removeEventListener("copy", handleCopy);
    };
    if (disabled) return removeListener;

    document.addEventListener("copy", handleCopy);
    return removeListener;
  }, [disabled, handleCopy]);

  return;
}
