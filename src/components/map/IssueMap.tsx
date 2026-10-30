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
import { STATUSES } from "@/lib/constants";
import { ON_MARKER } from "@/lib/marker-colors";
import type { CategoryId, Issue, StatusId } from "@/types/issue";

const BAKU_CENTER: [number, number] = [40.4093, 49.8671];

// lucide ikonlarının daxili həndəsəsi (24x24 şəbəkə)
const ICON_SVG: Record<CategoryId, string> = {
  road: '<rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M10 14 2.3 6.3"/><path d="m14 6 7.7 7.7"/><path d="m8 6 8 8"/>',
  waste:
      '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  streetlight:
      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  sidewalk:
      '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>',
  other:
      '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
};

const iconCache = new Map<string, L.DivIcon>();

// Yalnız sabit dəyərlər (rəng, ikon, simvol) HTML-ə yazılır, istifadəçi mətni yox
function getIcon(
    status: StatusId,
    category: CategoryId,
    selected: boolean
): L.DivIcon {
  const key = `${status}-${category}-${selected}`;
  const cached = iconCache.get(key);
  if (cached) return cached;

  const w = selected ? 50 : 40;
  const h = selected ? 65 : 52;
  const color = STATUSES[status].markerColor;

  const pulse = selected
      ? `<span style="position:absolute;left:50%;bottom:-4px;width:34px;height:12px;margin-left:-17px;border-radius:50%;background:${color};animation:signal 2.2s ease-out infinite;"></span>`
      : "";

  const html =
      `<div style="position:relative;width:${w}px;height:${h}px;">${pulse}` +
      `<svg aria-hidden="true" focusable="false" width="${w}" height="${h}" viewBox="0 0 40 52" style="position:relative;display:block;overflow:visible">` +
      `<ellipse cx="20" cy="49.5" rx="9" ry="2.5" fill="rgba(15,27,45,0.22)"/>` +
      `<path d="M20 50 C 20 50 3 33 3 19 a17 17 0 0 1 34 0 C 37 33 20 50 20 50 Z" fill="${color}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>` +
      `<g transform="translate(10.4 9.4) scale(0.8)" fill="none" stroke="${ON_MARKER[status]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_SVG[category]}</g>` +
      `<circle cx="32" cy="8" r="8" fill="#fff" stroke="${color}" stroke-width="2"/>` +
      `<text x="32" y="12" text-anchor="middle" font-size="11" font-weight="700" fill="#0F1B2D" font-family="system-ui,sans-serif">${STATUSES[status].glyph}</text>` +
      `</svg></div>`;

  const icon = L.divIcon({
    className: "",
    html,
    iconSize: [w, h],
    iconAnchor: [w / 2, h - 2],
  });

  iconCache.set(key, icon);
  return icon;
}

function ResizeWatcher() {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (map.getContainer().isConnected) {
        map.invalidateSize({ pan: false });
      }
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  return null;
}

function ClickToDeselect({ onDeselect }: { onDeselect: () => void }) {
  useMapEvents({ click: onDeselect });
  return null;
}

// Seçilmiş nişan detal kartının arxasında qalmasın deyə mərkəzi sürüşdürür
function PanToSelected({ issue }: { issue: Issue | undefined }) {
  const map = useMap();
  const lat = issue?.lat;
  const lng = issue?.lng;

  useEffect(() => {
    if (lat === undefined || lng === undefined) return;

    const zoom = map.getZoom();
    const width = window.innerWidth;
    let dx = 0;
    let dy = 0;

    if (width < 768) {
      dy = map.getSize().y * 0.325; // alt panel: nişan yuxarıda qalsın
    } else {
      dx = 204; // yan kart sağdadır: nişan solda qalsın
    }

    const target = map.project([lat, lng], zoom).add([dx, dy]);
    map.panTo(map.unproject(target, zoom));
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

        {issues.map((issue) => {
          const selected = issue.id === selectedId;
          return (
              <Marker
                  key={issue.id}
                  position={[issue.lat, issue.lng]}
                  icon={getIcon(issue.status, issue.category, selected)}
                  zIndexOffset={selected ? 1000 : 0}
                  title={`${issue.title} (${STATUSES[issue.status].label})`}
                  eventHandlers={{ click: () => onSelect(issue.id) }}
              />
          );
        })}
      </MapContainer>
  );
}