"use client";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Map({
  coordinates,
}: {
  coordinates: { lat: number; lon: number };
}) {
  return typeof window === "undefined" ? (
    <>Window not found</>
  ) : (
    <MapContainer
      className="w-full h-full "
      // @ts-ignore
      center={[coordinates.lat, coordinates.lon]}
      zoom={12}
    >
      <TileLayer
        // @ts-ignore
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
      />
      {/* <Marker position={[coordinates.lat, coordinates.lon]}>
    <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    </Marker> */}
    </MapContainer>
  );
}
