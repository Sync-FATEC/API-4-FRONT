import { useEffect, useRef, useState } from "react";
import Loading from "../loading/loading";
import { containerStyle, mapOptions, MultiMapsProps } from "./mapConfig";

export const MultiMaps = ({ stations }: MultiMapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initializeMap = async () => {
    if (stations.length === 0) return;

    const firstStation = stations[0];
    const centerPosition = {
      lat: parseFloat(firstStation.latitude),
      lng: parseFloat(firstStation.longitude),
    };

    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

    if (!mapRef.current) return;

    const map = new Map(mapRef.current, {
      ...mapOptions,
      zoom: 12,
      center: centerPosition,
    });
    mapInstanceRef.current = map;

    // Limpar marcadores anteriores
    markersRef.current.forEach(marker => marker.map = null);
    markersRef.current = [];

    // Adicionar novos marcadores
    stations.forEach(station => {
      const position = {
        lat: parseFloat(station.latitude),
        lng: parseFloat(station.longitude),
      };

      const marker = new AdvancedMarkerElement({
        map,
        position,
        title: `${station.name} ; ${station.uuid}`,
      });

      marker.addListener("click", () => {
        map.setZoom(15);
        map.setCenter(position);
      });

      markersRef.current.push(marker);
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
      markersRef.current.forEach(marker => marker.map = null);
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [stations]);

  return (
    <div className="station-tab__map">
      {isLoading && <Loading />}
      <div ref={mapRef} style={containerStyle} id="map" />
    </div>
  );
}; 