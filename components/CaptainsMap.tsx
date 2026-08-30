"use client";

import React, { useEffect, memo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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
  const size = isActive ? 40 : 26;
  const ring = isActive
    ? `<circle cx="20" cy="20" r="17" fill="none" stroke="${GOLD}" stroke-width="2.5" opacity="0.6"/>`
    : "";
  const inner = isActive
    ? `<circle cx="20" cy="20" r="10" fill="${GOLD}" stroke="#FFFFFF" stroke-width="2"/><circle cx="20" cy="20" r="4" fill="#000000"/>`
    : `<circle cx="13" cy="13" r="8" fill="#1e1e1e" stroke="${GOLD}" stroke-width="1.8"/><circle cx="13" cy="13" r="3.5" fill="${GOLD}"/>`;

  const svg = `<div class="relative flex items-center justify-center w-full h-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${isActive ? 40 : 26} ${isActive ? 40 : 26}">
      ${ring}
      ${inner}
    </svg>
  </div>`;

  return L.divIcon({
    html: svg,
    className: "captain-map-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function MapController({ activeBranch }: { activeBranch: BranchLocation }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([activeBranch.lat, activeBranch.lng], 14, {
      duration: 0.9,
      easeLinearity: 0.25,
    });
  }, [map, activeBranch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

interface CaptainsMapProps {
  branches: BranchLocation[];
  activeBranchIndex: number;
  onSelectBranch: (idx: number) => void;
  isVisible: boolean;
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
}: CaptainsMapProps) {
  const activeBranch = branches[activeBranchIndex];

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
        {/* Seamless Dark Base Tile Layer — 100% Free, Zero Watermark */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
          maxZoom={16}
        />

        {/* Crisp Neighborhood & Street Label Overlay */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          maxZoom={16}
        />

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
