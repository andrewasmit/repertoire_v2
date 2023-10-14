// External Dependencies
import { useCallback, useMemo, useState } from "react";

export const useIsOpen = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  const toggleIsOpen = useCallback(() => setIsOpen((open) => !open), []);

  return useMemo(
    () => ({
      handleClose,
      handleOpen,
      isOpen,
      toggleIsOpen,
    }),
    [handleClose, handleOpen, isOpen, toggleIsOpen]
  );
};
