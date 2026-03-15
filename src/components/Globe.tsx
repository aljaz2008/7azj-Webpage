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
  { startLat: 46.0569, startLng: 14.5058, endLat: 40.7128, endLng: -74.006, color: '#a1a1a1' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 35.6762, endLng: 139.6503, color: '#ffffff' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -23.5505, endLng: -46.6333, color: '#a1a1a1' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -33.8688, endLng: 151.2093, color: '#ffffff' }
];

const points = [
  { lat: 46.0569, lng: 14.5058, size: 0.35, color: '#ffffff' },
  { lat: 52.52, lng: 13.405, size: 0.2, color: '#d1d5db' },
  { lat: 40.7128, lng: -74.006, size: 0.2, color: '#9ca3af' },
  { lat: 35.6762, lng: 139.6503, size: 0.2, color: '#d1d5db' },
  { lat: -23.5505, lng: -46.6333, size: 0.2, color: '#9ca3af' },
  { lat: -33.8688, lng: 151.2093, size: 0.2, color: '#d1d5db' }
];

function GlobeMesh() {
  const globeRef = useRef<Object3D>(null);

  const globe = useMemo(() => {
    const instance = new (ThreeGlobe as any)({ waitForGlobeReady: true })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .arcsData(qsoArcs)
      .arcColor('color')
      .arcStroke(0.8)
      .arcAltitude(0.18)
      .arcDashLength(0.45)
      .arcDashGap(0.2)
      .arcDashAnimateTime(3500)
      .pointsData(points)
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.3);

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
