import { useEffect, useRef, useState } from "react";
import Loading from "../loading/loading";

interface MapsProps {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const mapStyles = [
  {
    featureType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape",
    stylers: [{ visibility: "on" }, { color: "#e0e0e0" }],
  },
  {
    featureType: "water",
    stylers: [{ visibility: "on" }, { color: "#b0c4de" }],
  },
  {
    featureType: "road",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    stylers: [{ visibility: "off" }],
  },
];

export const Maps = ({ latitude, longitude }: MapsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      const position = { lat: latitude, lng: longitude };

      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          zoom: 12,
          center: position,
          mapId: "map",
          styles: mapStyles,
          disableDefaultUI: true,
          clickableIcons: false,
          backgroundColor: "#e0e0e0",
        });
        mapInstanceRef.current = map;

        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: "Localização da Estação",
        });
        markerRef.current = marker;

        marker.addListener("click", () => {
          map.setZoom(15);
          map.setCenter(position);
        });

        setIsLoading(false); // Mapa carregado
      }
    };

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API || "";


    if (!apiKey) {
      console.error("A chave da API do Google Maps não foi encontrada!");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=Function.prototype`;
    console.log(script.src);

    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      if (script.parentNode) {
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
