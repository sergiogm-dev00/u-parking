'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';

// Fix default icon issue with Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  center?: LatLngTuple;
  university?: string;
  showAllPins?: boolean;
}

function RecenterMap({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function MapView({ center, university, showAllPins }: MapViewProps) {
  // Lista de ubicaciones y nombres
  const locations: { name: string; coords: [number, number]; total: number }[] = [
    { name: 'Lot 6', coords: [28.0557, -82.4058], total: 232 },
    { name: 'Lot 22F', coords: [28.0550, -82.4138], total: 180 },
    { name: 'Lot 22D / 22E', coords: [28.0675, -82.4200], total: 150 },
    { name: 'Sycamore Lot', coords: [28.0560, -82.4187], total: 120 },
    { name: 'Lot 18', coords: [28.0640, -82.4120], total: 200 },
    { name: 'Lot 43', coords: [28.0605, -82.4175], total: 100 },
    { name: 'Beard Garage', coords: [28.0595, -82.4234], total: 300 },
    { name: 'Collins Blvd Garage', coords: [28.0608, -82.4152], total: 250 },
    { name: 'Laurel Garage', coords: [28.0615, -82.4078], total: 220 },
  ];

  // Generar plazas aleatorias para cada ubicación
  const plazas = locations.map(loc => Math.floor(Math.random() * (loc.total + 1)));

  // Default center: USF
  const mapCenter: LatLngTuple = center || [28.0629, -82.4120];

  // Coordenadas de las otras universidades
  const otherUniversities: Record<string, [number, number]> = {
    "University of Miami": [25.7174, -80.2781],
    "University of Central Florida": [28.6016, -81.2005],
    "Florida State University": [30.4419, -84.2986],
    "Florida International University": [25.7541, -80.3739],
    "Florida Atlantic University": [26.3700, -80.1026],
    "University of Florida": [29.6475, -82.3450],
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      style={{ height: '70vh', width: '100%', borderRadius: '1rem' }}
      scrollWheelZoom={true}
    >
      <RecenterMap center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Show pins for all universities if showAllPins is true */}
      {showAllPins && university && (
        university === 'University of South Florida'
          ? locations.map((loc, i) => (
              <Marker key={loc.name} position={loc.coords}>
                <Popup>
                  <div className="font-semibold">{loc.name}</div>
                  Available parking spaces: {plazas[i]}/{loc.total}.
                </Popup>
              </Marker>
            ))
          : otherUniversities[university] && (
              <Marker position={otherUniversities[university]}>
                <Popup>
                  <div className="font-semibold">{university}</div>
                  Available parking spaces: {Math.floor(Math.random() * 201) + 50}/250.
                </Popup>
              </Marker>
            )
      )}
      {/* Fallback: Only show pins for USF, otherwise just show the map */}
      {!showAllPins && university === 'University of South Florida' && locations.map((loc, i) => (
        <Marker key={loc.name} position={loc.coords}>
          <Popup>
            <div className="font-semibold">{loc.name}</div>
            Available parking spaces: {plazas[i]}/{loc.total}.
          </Popup>
        </Marker>
      ))}
      {!showAllPins && university !== 'University of South Florida' && otherUniversities[university || ''] && (
        <Marker position={otherUniversities[university || '']}>
          <Popup>
            <div className="font-semibold">{university}</div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
} 