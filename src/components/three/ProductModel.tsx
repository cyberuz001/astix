import { useGLTF } from '@react-three/drei';

/** Ready for a future real model; no current ASTIX product has a GLB/GLTF. */
export function ProductModel({ src, scale = 1 }: { src: string; scale?: number }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} scale={scale} />;
}
