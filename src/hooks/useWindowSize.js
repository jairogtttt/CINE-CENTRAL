import { useState, useEffect } from "react";

export function useWindowSize() {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    const manejarResize = () => setAncho(window.innerWidth);
    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, []);

  return ancho;
}
