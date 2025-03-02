import { useEffect } from "react";
import { usePrevious } from "../hooks";

import { useLocation } from "react-router-dom";

export const ScrollToTop = (): any => {
  const { pathname } = useLocation();
  const previousPath = usePrevious(pathname);

  useEffect(() => {
    if (
      pathname.split("/")[1] !== previousPath?.split("/")[1] ||
      pathname.split("/")[1] === "legal"
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname, previousPath]);

  return null;
};
