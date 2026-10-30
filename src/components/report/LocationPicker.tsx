"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair } from "lucide-react";
import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";

export interface LatLng {
  lat: number;
  lng: number;
}

const BAKU_CENTER: [number, number] = [40.4093, 49.8671];

// Xəritədəki markerlərlə eyni damla forması, brend mavisi
const pickedIcon = L.divIcon({
  className: "",
  html: `<svg aria-hidden="true" focusable="false" width="40" height="52" viewBox="0 0 40 52" style="display:block;overflow:visible"><ellipse cx="20" cy="49.5" rx="9" ry="2.5" fill="rgba(15,27,45,0.22)"/><path d="M20 50 C 20 50 3 33 3 19 a17 17 0 0 1 34 0 C 37 33 20 50 20 50 Z" fill="#2563EB" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><circle cx="20" cy="19" r="6" fill="#fff"/></svg>`,
  iconSize: [40, 52],
  iconAnchor: [20, 50],
});

function ClickToPick({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({
    click: (e) => {
      // wrap(): xəritə dünya boyu sürüşdürüləndə uzunluğu -180..180 aralığına qaytarır
      const p = e.latlng.wrap();
      onPick({ lat: p.lat, lng: p.lng });
    },
  });
  return null;
}

// "Mərkəzi seç" düyməsinin nəyi seçdiyini göstərən zəif işarə
function CenterReticle() {
  return (
      <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[600] grid place-items-center"
      >
        <span className="h-6 w-6 rounded-full border-2 border-dashed border-slate-700/60" />
      </div>
  );
}

function CenterButton({ onPick }: { onPick: (p: LatLng) => void }) {
  const map = useMap();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
  }, []);

  return (
      <button
          ref={ref}
          type="button"
          onClick={() => {
            const c = map.getCenter().wrap();
            onPick({ lat: c.lat, lng: c.lng });
          }}
          className="absolute left-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-card hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <Crosshair aria-hidden className="h-3.5 w-3.5" />
        Xəritənin mərkəzini seç
      </button>
  );
}

interface LocationPickerProps {
  value: LatLng | null;
  onPick: (p: LatLng) => void;
}

export default function LocationPicker({ value, onPick }: LocationPickerProps) {
  return (
      <MapContainer
          center={value ? [value.lat, value.lng] : BAKU_CENTER}
          zoom={12}
          zoomControl={false}
          className="h-full w-full"
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <ClickToPick onPick={onPick} />
        <CenterReticle />
        <CenterButton onPick={onPick} />
        {value && <Marker position={[value.lat, value.lng]} icon={pickedIcon} />}
      </MapContainer>
  );
}