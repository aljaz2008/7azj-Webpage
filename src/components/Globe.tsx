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
  { startLat: 46.0569, startLng: 14.5058, endLat: 52.52, endLng: 13.405, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 48.8566, endLng: 2.3522, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 51.5072, endLng: -0.1276, color: '#f3efe6' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 41.9028, endLng: 12.4964, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 59.3293, endLng: 18.0686, color: '#f3efe6' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 40.7128, endLng: -74.006, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 34.0522, endLng: -118.2437, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 41.8781, endLng: -87.6298, color: '#f3efe6' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 43.6532, endLng: -79.3832, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 19.4326, endLng: -99.1332, color: '#f3efe6' },

  { startLat: 46.0569, startLng: 14.5058, endLat: -23.5505, endLng: -46.6333, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -34.6037, endLng: -58.3816, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -33.4489, endLng: -70.6693, color: '#f3efe6' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -12.0464, endLng: -77.0428, color: '#ffd08a' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 30.0444, endLng: 31.2357, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -1.2921, endLng: 36.8219, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 6.5244, endLng: 3.3792, color: '#f3efe6' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -26.2041, endLng: 28.0473, color: '#ffd08a' },

  { startLat: 46.0569, startLng: 14.5058, endLat: 35.6762, endLng: 139.6503, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 39.9042, endLng: 116.4074, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 28.6139, endLng: 77.209, color: '#f3efe6' },
  { startLat: 46.0569, startLng: 14.5058, endLat: 1.3521, endLng: 103.8198, color: '#ffd08a' },

  { startLat: 46.0569, startLng: 14.5058, endLat: -33.8688, endLng: 151.2093, color: '#ffb23f' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -37.8136, endLng: 144.9631, color: '#ffd08a' },
  { startLat: 46.0569, startLng: 14.5058, endLat: -36.8485, endLng: 174.7633, color: '#f3efe6' }
];

const points = [
  { lat: 46.0569, lng: 14.5058, size: 0.4, color: '#ffb23f' },
  { lat: 52.52, lng: 13.405, size: 0.2, color: '#ffd08a' },
  { lat: 48.8566, lng: 2.3522, size: 0.2, color: '#f3efe6' },
  { lat: 51.5072, lng: -0.1276, size: 0.2, color: '#ffd08a' },
  { lat: 41.9028, lng: 12.4964, size: 0.2, color: '#f3efe6' },
  { lat: 40.7128, lng: -74.006, size: 0.25, color: '#ffb23f' },
  { lat: 34.0522, lng: -118.2437, size: 0.2, color: '#f3efe6' },
  { lat: 41.8781, lng: -87.6298, size: 0.2, color: '#ffd08a' },
  { lat: -23.5505, lng: -46.6333, size: 0.25, color: '#ffb23f' },
  { lat: -34.6037, lng: -58.3816, size: 0.2, color: '#ffd08a' },
  { lat: 30.0444, lng: 31.2357, size: 0.2, color: '#ffd08a' },
  { lat: -1.2921, lng: 36.8219, size: 0.2, color: '#f3efe6' },
  { lat: 35.6762, lng: 139.6503, size: 0.25, color: '#ffb23f' },
  { lat: 39.9042, lng: 116.4074, size: 0.2, color: '#f3efe6' },
  { lat: -33.8688, lng: 151.2093, size: 0.25, color: '#ffb23f' },
  { lat: -36.8485, lng: 174.7633, size: 0.2, color: '#ffd08a' }
];

function GlobeMesh() {
  const globeRef = useRef<Object3D>(null);

  const globe = useMemo(() => {
    // texture is self-hosted (copied from three-globe's examples) - no third-party requests
    const instance = new ThreeGlobe({ waitForGlobeReady: true })
      .globeImageUrl('/images/globe/earth-night.jpg')
      .showAtmosphere(true)
      .atmosphereColor('#ffb23f')
      .atmosphereAltitude(0.12)

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
    <div
      className="h-[460px] w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Rotating globe showing QSO paths from Ljubljana to stations around the world"
    >
      <Canvas camera={{ position: [0, 0, 310], fov: 45 }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[1, 1, 2]} intensity={1.4} />
        <GlobeMesh />
        <OrbitControls enablePan={false} enableZoom={false} minDistance={180} maxDistance={400} />
      </Canvas>
    </div>
  );
}