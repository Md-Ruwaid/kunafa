"use client";

import React, { useEffect, useState, memo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface BranchLocation {
  id: string;
  name: string;
  area: string;
  code: string;
  address: string;
  phone: string;
  hours: string;
  highlight: string;
  description: string;
  lat: number;
  lng: number;
  mapUrl: string;
  embedQuery: string;
}

const GOLD = "#EFB80D";

function createMarkerIcon(isActive: boolean) {
  const size = isActive ? 36 : 24;
  const ring = isActive
    ? `<circle cx="18" cy="18" r="16" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.55"/>`
    : "";
  const inner = isActive
    ? `<circle cx="18" cy="18" r="10" fill="${GOLD}" stroke="#FFFFFF" stroke-width="2"/><circle cx="18" cy="18" r="4" fill="#000000"/>`
    : `<circle cx="12" cy="12" r="8" fill="#262626" stroke="${GOLD}" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="${GOLD}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${isActive ? 36 : 24} ${isActive ? 36 : 24}">${ring}${inner}</svg>`;

  return L.divIcon({
    html: svg,
    className: "captain-map-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function createShipIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="15" fill="${GOLD}" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M16 6L19.5 13H12.5L16 6ZM7.5 18L16 16L24.5 18L21.5 24.5H10.5L7.5 18Z" fill="#000000"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "captain-map-ship",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function MapController({ activeBranch }: { activeBranch: BranchLocation }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([activeBranch.lat, activeBranch.lng], 14, {
      duration: 1.1,
      easeLinearity: 0.25,
    });
  }, [map, activeBranch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

interface CaptainsMapProps {
  branches: BranchLocation[];
  activeBranchIndex: number;
  onSelectBranch: (idx: number) => void;
  isVisible: boolean;
  routeLatLngs: [number, number][];
}

const HYD_CENTER: [number, number] = [17.37, 78.45];
const HYD_BOUNDS: [[number, number], [number, number]] = [
  [17.15, 78.2],
  [17.55, 78.7],
];

function CaptainsMap({
  branches,
  activeBranchIndex,
  onSelectBranch,
  isVisible,
  routeLatLngs,
}: CaptainsMapProps) {
  const activeBranch = branches[activeBranchIndex];

  // Animated polyline draw-in once when visible
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!isVisible) return;
    if (drawnPoints.length === routeLatLngs.length) return;

    let timeoutId: NodeJS.Timeout;
    let stepIndex = 0;

    const animateStep = () => {
      stepIndex++;
      setDrawnPoints(routeLatLngs.slice(0, stepIndex + 1));
      if (stepIndex < routeLatLngs.length - 1) {
        timeoutId = setTimeout(animateStep, 180);
      }
    };

    timeoutId = setTimeout(animateStep, 300);
    return () => clearTimeout(timeoutId);
  }, [isVisible, routeLatLngs, drawnPoints.length]);

  return (
    <div className="w-full h-full relative select-none">
      <MapContainer
        center={HYD_CENTER}
        zoom={12}
        scrollWheelZoom={false}
        maxBounds={HYD_BOUNDS}
        maxBoundsViscosity={0.9}
        style={{ width: "100%", height: "100%", background: "#0a0a0a" }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Animated Golden Route Polyline connecting all 4 branches */}
        {drawnPoints.length > 1 && (
          <Polyline
            positions={drawnPoints}
            pathOptions={{
              color: GOLD,
              weight: 3.5,
              opacity: 0.9,
              dashArray: "7 5",
            }}
          />
        )}

        {/* Active Branch Flagship Vessel */}
        {activeBranch && (
          <Marker
            position={[activeBranch.lat, activeBranch.lng]}
            icon={createShipIcon()}
            zIndexOffset={1000}
          />
        )}

        {/* 4 Official Branch Markers */}
        {branches.map((branch, idx) => {
          const isActive = idx === activeBranchIndex;
          return (
            <Marker
              key={branch.id}
              position={[branch.lat, branch.lng]}
              icon={createMarkerIcon(isActive)}
              eventHandlers={{
                click: () => onSelectBranch(idx),
              }}
              keyboard={true}
              title={`${branch.code}: ${branch.name}`}
              alt={branch.name}
            />
          );
        })}

        {activeBranch && <MapController activeBranch={activeBranch} />}
      </MapContainer>
    </div>
  );
}

export default memo(CaptainsMap);
