export const containerStyle = {
  width: "100%",
  height: "500px",
};

export const mapStyles = [
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

export const mapOptions = {
  mapId: "map",
  styles: mapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
  backgroundColor: "#e0e0e0",
};

export interface Station {
  id: string;
  uuid: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface MultiMapsProps {
  stations: Station[];
} 