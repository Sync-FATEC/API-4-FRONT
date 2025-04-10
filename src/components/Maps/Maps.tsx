import { useEffect, useRef, useState } from "react";
import Loading from "../loading/loading";
import { containerStyle, mapOptions } from "./mapConfig";

interface MapsProps {
  latitude: number;
  longitude: number;
}

export const Maps = ({ latitude, longitude }: MapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeMap = async () => {
    const position = { lat: latitude, lng: longitude };

    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

    if (!mapRef.current) return;

    const map = new Map(mapRef.current, {
      ...mapOptions,
      zoom: 12,
      center: position,
    });
    mapInstanceRef.current = map;

    const marker = new AdvancedMarkerElement({
      map,
      position,
      title: "Localização da Estação",
    });
    markerRef.current = marker;

    marker.addListener("click", () => {
      map.setZoom(15);
      map.setCenter(position);
    });

    setIsLoading(false);
  };

  const loadGoogleMapsScript = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
    if (!apiKey) {
      console.error("A chave da API do Google Maps não foi encontrada!");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=Function.prototype`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return script;
  };

  useEffect(() => {
    const script = loadGoogleMapsScript();

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [latitude, longitude]);

  return (
    <div>
      {isLoading && <Loading />}
      <div ref={mapRef} style={containerStyle} id="map" />
    </div>
  );
};
