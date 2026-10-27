"use client";

import { useEffect } from "react";
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

import { STATUSES } from "../../lib/constants";
import type { Issue, StatusId } from "@/types/issue";

const BAKU_CENTER: [number, number] = [40.4093, 49.8671];

const iconCache = new Map<string, L.DivIcon>();

function getIcon(status: StatusId, selected: boolean): L.DivIcon {
  const key = `${status}-${selected}`;
  const cached = iconCache.get(key);

  if (cached) return cached;

  const size = selected ? 38 : 30;
  const ring = selected ? "0 0 0 3px #0F172A" : "0 0 0 1px rgba(15,23,42,0.35)";

  const icon = L.divIcon({
    className: "",
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:${STATUSES[status].markerColor};border:3px solid #fff;box-shadow:${ring};color:#fff;font:700 15px/1 system-ui,sans-serif;">${STATUSES[status].glyph}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  iconCache.set(key, icon);
  return icon;
}

function ResizeWatcher() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const observer = new ResizeObserver(() => {
      if (map.getContainer().isConnected) {
        map.invalidateSize({ pan: false });
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [map]);

  return null;
}

function ClickToDeselect({ onDeselect }: { onDeselect: () => void }) {
  useMapEvents({
    click: onDeselect,
  });

  return null;
}

function PanToSelected({ issue }: { issue: Issue | undefined }) {
  const map = useMap();
  const lat = issue?.lat;
  const lng = issue?.lng;

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.panTo([lat, lng]);
    }
  }, [map, lat, lng]);

  return null;
}

interface IssueMapProps {
  issues: Issue[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function IssueMap({
  issues,
  selectedId,
  onSelect,
}: IssueMapProps) {
  const selectedIssue = issues.find((issue) => issue.id === selectedId);

  return (
    <MapContainer
      center={BAKU_CENTER}
      zoom={12}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      <ResizeWatcher />

      <ClickToDeselect onDeselect={() => onSelect(null)} />

      <PanToSelected issue={selectedIssue} />

      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.lat, issue.lng]}
          icon={getIcon(issue.status, issue.id === selectedId)}
          title={`${issue.title} (${STATUSES[issue.status].label})`}
          eventHandlers={{
            click: () => onSelect(issue.id),
          }}
        />
      ))}
    </MapContainer>
  );
}
