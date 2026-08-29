"use client";

import React, { useEffect, useState, useRef, memo } from "react";
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

function createMarkerIcon(isActive: boolean, hasRipple: boolean) {
  const size = isActive ? 44 : 26;
  const ripple = (isActive && hasRipple)
    ? `<div class="sonar-ripple-ring"></div>`
    : "";
  const ring = isActive
    ? `<circle cx="22" cy="22" r="18" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.65"/>`
    : "";
  const inner = isActive
    ? `<circle cx="22" cy="22" r="11" fill="${GOLD}" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="22" cy="22" r="4.5" fill="#000000"/>`
    : `<circle cx="13" cy="13" r="8" fill="#202020" stroke="${GOLD}" stroke-width="2"/><circle cx="13" cy="13" r="3.5" fill="${GOLD}"/>`;
  
  const svg = `<div class="relative flex items-center justify-center w-full h-full">
    ${ripple}
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${isActive ? 44 : 26} ${isActive ? 44 : 26}">
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

function createShipIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" class="drop-shadow-[0_0_12px_rgba(239,184,13,0.8)]">
    <circle cx="17" cy="17" r="15.5" fill="${GOLD}" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M17 6L21 13.5H13L17 6ZM7.5 19L17 16.5L26.5 19L23 26H11L7.5 19Z" fill="#000000"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "captain-map-ship",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function createBeamHeadIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="8" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="10" cy="10" r="5" fill="${GOLD}"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "beam-pulse-head",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

// Generate quadratic bezier arc waypoints between two coordinates
function generateArcWaypoints(
  start: [number, number],
  end: [number, number],
  steps = 40
): [number, number][] {
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  // Curvature perpendicular to vector
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const curvature = 0.16;
  const controlLat = midLat - dLng * curvature;
  const controlLng = midLng + dLat * curvature;

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const invT = 1 - t;
    const lat = invT * invT * lat1 + 2 * invT * t * controlLat + t * t * lat2;
    const lng = invT * invT * lng1 + 2 * invT * t * controlLng + t * t * lng2;
    points.push([lat, lng]);
  }
  return points;
}

function MapController({ activeBranch }: { activeBranch: BranchLocation }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([activeBranch.lat, activeBranch.lng], 13.5, {
      duration: 1.2,
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
  const prevBranchIndexRef = useRef<number>(activeBranchIndex);

  // Dynamic Emission Line & Ship Position states
  const [emissionLine, setEmissionLine] = useState<[number, number][]>([]);
  const [shipPos, setShipPos] = useState<[number, number]>([
    branches[activeBranchIndex].lat,
    branches[activeBranchIndex].lng,
  ]);
  const [triggerRipple, setTriggerRipple] = useState(false);

  // Animate emission laser whenever active branch changes
  useEffect(() => {
    const prevIdx = prevBranchIndexRef.current;
    const currIdx = activeBranchIndex;

    const fromBranch = branches[prevIdx] || branches[0];
    const toBranch = branches[currIdx] || branches[0];

    if (prevIdx === currIdx) {
      setShipPos([toBranch.lat, toBranch.lng]);
      setTriggerRipple(true);
      return;
    }

    const waypoints = generateArcWaypoints(
      [fromBranch.lat, fromBranch.lng],
      [toBranch.lat, toBranch.lng],
      45
    );

    let frameId: number;
    const durationMs = 850;
    const startTime = performance.now();

    setTriggerRipple(false);

    const animateEmission = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentPointIndex = Math.min(
        waypoints.length - 1,
        Math.floor(eased * (waypoints.length - 1))
      );

      // Emitted progressive beam
      const currentBeam = waypoints.slice(0, currentPointIndex + 1);
      setEmissionLine(currentBeam);

      // Ship moves along the beam
      if (waypoints[currentPointIndex]) {
        setShipPos(waypoints[currentPointIndex]);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(animateEmission);
      } else {
        setShipPos([toBranch.lat, toBranch.lng]);
        setTriggerRipple(true);
        prevBranchIndexRef.current = currIdx;
      }
    };

    frameId = requestAnimationFrame(animateEmission);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeBranchIndex, branches]);

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

        {/* Global Base Connecting Maritime Trail with Animated Flow */}
        <Polyline
          positions={routeLatLngs}
          pathOptions={{
            color: "#665014",
            weight: 3,
            opacity: 0.6,
            dashArray: "6 6",
            className: "flowing-route-line",
          }}
        />

        {/* Dynamic Emitted Laser Beam towards newly selected location */}
        {emissionLine.length > 1 && (
          <>
            {/* Outer Glow Halo */}
            <Polyline
              positions={emissionLine}
              pathOptions={{
                color: "#FFD700",
                weight: 8,
                opacity: 0.45,
                lineCap: "round",
              }}
            />
            {/* Core Golden Beam */}
            <Polyline
              positions={emissionLine}
              pathOptions={{
                color: GOLD,
                weight: 4,
                opacity: 1,
                lineCap: "round",
              }}
            />
            {/* Leading Beam Head Light Particle */}
            <Marker
              position={emissionLine[emissionLine.length - 1]}
              icon={createBeamHeadIcon()}
              zIndexOffset={950}
            />
          </>
        )}

        {/* Sailing Vessel gliding to target location */}
        <Marker
          position={shipPos}
          icon={createShipIcon()}
          zIndexOffset={1000}
        />

        {/* 4 Official Branch Markers */}
        {branches.map((branch, idx) => {
          const isActive = idx === activeBranchIndex;
          return (
            <Marker
              key={branch.id}
              position={[branch.lat, branch.lng]}
              icon={createMarkerIcon(isActive, triggerRipple)}
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
