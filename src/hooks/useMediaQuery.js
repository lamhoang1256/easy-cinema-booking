import { useEffect, useState } from "react";

export const useMediaQuery = (breakpoint) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(breakpoint);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, breakpoint]);
  return matches;
};
