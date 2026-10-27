"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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

const pickedIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:28px;height:28px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 2px #0F172A;"></span>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
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
          className="absolute left-3 top-3 z-[1000] rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
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
        <CenterButton onPick={onPick} />
        {value && (
            <Marker position={[value.lat, value.lng]} icon={pickedIcon} />
        )}
      </MapContainer>
  );
}