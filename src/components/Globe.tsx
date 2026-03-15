'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Object3D } from 'three';
import ThreeGlobe from 'three-globe';

type ArcData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
};

const qsoArcs: ArcData[] = [
  { startLat: 46.0569, startLng: 14.5058, endLat: 52.52, endLng: 13.405, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 48.8566, endLng: 2.3522, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 51.5072, endLng: -0.1276, color: '#9ca3af' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 41.9028, endLng: 12.4964, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 59.3293, endLng: 18.0686, color: '#9ca3af' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 40.7128, endLng: -74.006, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 34.0522, endLng: -118.2437, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 41.8781, endLng: -87.6298, color: '#9ca3af' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 43.6532, endLng: -79.3832, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 19.4326, endLng: -99.1332, color: '#9ca3af' },

  { startLat: 46.0569, startLng: 14.5058, endLat: -23.5505, endLng: -46.6333, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -34.6037, endLng: -58.3816, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -33.4489, endLng: -70.6693, color: '#9ca3af' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -12.0464, endLng: -77.0428, color: '#d1d5db' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 30.0444, endLng: 31.2357, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -1.2921, endLng: 36.8219, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 6.5244, endLng: 3.3792, color: '#9ca3af' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -26.2041, endLng: 28.0473, color: '#d1d5db' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 35.6762, endLng: 139.6503, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 39.9042, endLng: 116.4074, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 28.6139, endLng: 77.209, color: '#9ca3af' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 1.3521, endLng: 103.8198, color: '#d1d5db' },

  { startLat: 46.0569, startLng: 14.5058, endLat: -33.8688, endLng: 151.2093, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -37.8136, endLng: 144.9631, color: '#d1d5db' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -36.8485, endLng: 174.7633, color: '#9ca3af' }
];

const points = [
  { lat: 46.0569, lng: 14.5058, size: 0.4, color: '#ffffff' },
  { lat: 52.52, lng: 13.405, size: 0.2, color: '#d1d5db' },
  { lat: 48.8566, lng: 2.3522, size: 0.2, color: '#9ca3af' },
  { lat: 51.5072, lng: -0.1276, size: 0.2, color: '#d1d5db' },
  { lat: 41.9028, lng: 12.4964, size: 0.2, color: '#9ca3af' },
  { lat: 40.7128, lng: -74.006, size: 0.25, color: '#ffffff' },
  { lat: 34.0522, lng: -118.2437, size: 0.2, color: '#9ca3af' },
  { lat: 41.8781, lng: -87.6298, size: 0.2, color: '#d1d5db' },
  { lat: -23.5505, lng: -46.6333, size: 0.25, color: '#ffffff' },
  { lat: -34.6037, lng: -58.3816, size: 0.2, color: '#d1d5db' },
  { lat: 30.0444, lng: 31.2357, size: 0.2, color: '#d1d5db' },
  { lat: -1.2921, lng: 36.8219, size: 0.2, color: '#9ca3af' },
  { lat: 35.6762, lng: 139.6503, size: 0.25, color: '#ffffff' },
  { lat: 39.9042, lng: 116.4074, size: 0.2, color: '#9ca3af' },
  { lat: -33.8688, lng: 151.2093, size: 0.25, color: '#ffffff' },
  { lat: -36.8485, lng: 174.7633, size: 0.2, color: '#d1d5db' }
];

function GlobeMesh() {
  const globeRef = useRef<Object3D>(null);

  const globe = useMemo(() => {
    const instance = new (ThreeGlobe as any)({ waitForGlobeReady: true })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')

      // ARC CONFIG
      .arcsData(qsoArcs)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor('color')
      .arcStroke(0.8)
      .arcAltitude(0.25)
      .arcDashLength(0.45)
      .arcDashGap(0.2)
      .arcDashAnimateTime(3500)

      // POINT CONFIG
      .pointsData(points)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor('color')
      .pointAltitude(0)
      .pointRadius('size');

    return instance;
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0018;
    }
  });

  return <primitive object={globe} ref={globeRef} />;
}

export default function Globe() {
  return (
    <div className="h-[380px] w-full overflow-hidden rounded-2xl border border-border bg-card/60 shadow-glow">
      <Canvas camera={{ position: [0, 0, 250], fov: 45 }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[1, 1, 2]} intensity={1.4} />
        <GlobeMesh />
        <OrbitControls enablePan={false} minDistance={170} maxDistance={360} />
      </Canvas>
    </div>
  );
}