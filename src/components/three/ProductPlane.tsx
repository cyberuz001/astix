import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  src: string;
  size: number;
  opacity: () => number;
  depth?: number;
};

/** A transparent photograph in space. Motion never exposes its edge as a card. */
export function ProductPlane({ src, size, opacity, depth = 0 }: Props) {
  const texture = useTexture(src);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame(() => {
    const alpha = Math.max(0, Math.min(1, opacity()));
    if (material.current) material.current.opacity = alpha;
    if (mesh.current) mesh.current.visible = alpha > 0.004;
  });

  return (
    <mesh ref={mesh} position-z={depth} renderOrder={depth > 0 ? 2 : 1}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        ref={material}
        map={texture}
        transparent
        opacity={0}
        alphaTest={0.012}
        depthWrite={false}
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
}
