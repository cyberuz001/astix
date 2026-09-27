import { memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ProductPlane } from './ProductPlane';
import { productAssets } from './productAssets';

export type SceneProgress = { current: number };
type ColorIndex = 0 | 1 | 2;
type Pose = { x: number; y: number; z: number; scale: number; rx: number; ry: number; alpha: number };
type Props = {
  progress: SceneProgress;
  sneakerColor: ColorIndex | null;
  jacketColor: ColorIndex | null;
  onReady: () => void;
  onFailure: () => void;
  active: boolean;
};

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
const at = (p: number, keys: [number, number][]) => {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const t = smooth((p - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0]));
      return THREE.MathUtils.lerp(keys[i - 1][1], keys[i][1], t);
    }
  }
  return keys[keys.length - 1][1];
};
const deg = (n: number) => THREE.MathUtils.degToRad(n);

function usePointer() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      target.current.x = (e.clientX / innerWidth) * 2 - 1;
      target.current.y = 1 - (e.clientY / innerHeight) * 2;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return target;
}

function SoftShadow({ size, opacity }: { size: number; opacity: () => number }) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(64, 64, 3, 64, 64, 62);
    gradient.addColorStop(0, 'rgba(22,17,17,0.36)');
    gradient.addColorStop(0.45, 'rgba(22,17,17,0.16)');
    gradient.addColorStop(1, 'rgba(22,17,17,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(() => {
    const alpha = clamp(opacity());
    if (material.current) material.current.opacity = alpha;
    if (mesh.current) mesh.current.visible = alpha > 0.004;
  });
  return (
    <mesh ref={mesh} position={[0, -size * 0.41, -0.09]} scale={[size * 0.83, size * 0.19, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={material} map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Actor({
  progress, pointer, pose, size, images, weights, shadow = false, icon = false,
}: {
  progress: SceneProgress;
  pointer: ReturnType<typeof usePointer>;
  pose: (p: number) => Pose;
  size: number;
  images: readonly string[];
  weights?: (p: number) => number[];
  shadow?: boolean;
  icon?: boolean;
}) {
  const scroll = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const alpha = useRef(0);
  const colorWeights = useRef<number[]>([1, 0, 0]);
  useFrame((_, delta) => {
    const p = progress.current;
    const v = pose(p);
    alpha.current = v.alpha;
    const nextWeights = weights ? weights(p) : [1];
    const colorDamping = 1 - Math.exp(-delta * 6);
    colorWeights.current = nextWeights.map((value, i) =>
      THREE.MathUtils.lerp(colorWeights.current[i] ?? 0, value, colorDamping));
    if (scroll.current) {
      scroll.current.position.set(v.x, v.y, v.z);
      scroll.current.scale.setScalar(v.scale);
      scroll.current.rotation.set(deg(v.rx), deg(v.ry), 0);
    }
    if (parallax.current) {
      const damping = 1 - Math.exp(-delta * 3.5);
      parallax.current.rotation.x = THREE.MathUtils.lerp(parallax.current.rotation.x, deg(pointer.current.y * (icon ? 1 : 1.5)), damping);
      parallax.current.rotation.y = THREE.MathUtils.lerp(parallax.current.rotation.y, deg(pointer.current.x * (icon ? 1.5 : 2.5)), damping);
    }
  });
  return (
    <group ref={scroll}>
      <group ref={parallax}>
        {icon && <ProductPlane src={images[0]} size={size} depth={-0.025} opacity={() => alpha.current * 0.14} />}
        {images.map((src, i) => (
          <ProductPlane key={src} src={src} size={size} depth={icon ? 0.025 : i * 0.001}
            opacity={() => alpha.current * (colorWeights.current[i] ?? 0)} />
        ))}
        {shadow && <SoftShadow size={size} opacity={() => alpha.current * 0.38} />}
      </group>
    </group>
  );
}

function SceneContent({ progress, sneakerColor, jacketColor, onReady }: Props) {
  const { viewport, camera } = useThree();
  const pointer = usePointer();
  const [loadedStage, setLoadedStage] = useState(0);
  const desktop = viewport.width > viewport.height * 1.05;
  const mobile = viewport.width < viewport.height * 0.8;
  const shoeSize = Math.min(viewport.width * (desktop ? 0.49 : 0.94), viewport.height * (desktop ? 0.91 : 0.59));
  const jacketSize = Math.min(viewport.width * (desktop ? 0.37 : 0.90), viewport.height * (desktop ? 0.74 : 0.57));
  const right = desktop ? viewport.width * 0.18 : 0;
  const low = mobile ? -viewport.height * 0.16 : 0;
  const loadColorways = loadedStage >= 1;
  const loadJacket = loadedStage >= 2;
  const loadGallery = loadedStage >= 3;

  useEffect(() => { onReady(); }, [onReady]);
  useFrame(() => {
    const t = progress.current;
    const requiredStage = t > 0.89 ? 3 : t > 0.74 ? 2 : t > 0.59 ? 1 : 0;
    if (requiredStage > loadedStage) setLoadedStage(requiredStage);
    camera.position.x = at(t, [[0, 0], [0.55, 0], [0.84, 0.08], [0.95, -0.18], [1, 0]]);
    camera.position.y = at(t, [[0, 0], [0.83, 0], [0.97, 0.15], [1, 0]]);
    camera.position.z = at(t, [[0, 10], [0.6, 9.8], [0.78, 9.8], [0.91, 9.6], [0.98, 8.8]]);
    camera.lookAt(0, 0, 0);
  });

  const iconPose = (t: number): Pose => ({
    x: at(t, [[0, 0], [0.15, 0], [0.35, -viewport.width * 0.09], [0.54, -viewport.width * 0.11]]),
    y: at(t, [[0, viewport.height * 0.07], [0.35, viewport.height * 0.11], [0.54, viewport.height * 0.08]]),
    z: at(t, [[0, 0.7], [0.35, -0.1], [0.55, -1.5]]),
    scale: at(t, [[0, 1], [0.15, 1.04], [0.35, 0.95], [0.55, 0.85]]),
    rx: 0, ry: at(t, [[0, 0], [0.15, 3], [0.35, -5], [0.55, -3]]),
    alpha: at(t, [[0, 1], [0.35, 1], [0.5, 0.65], [0.59, 0]]),
  });
  const sneakerPose = (t: number): Pose => ({
    x: at(t, [[0, right + viewport.width * 0.09], [0.35, right + viewport.width * 0.09], [0.55, right], [0.78, right], [0.87, right - viewport.width * 0.1]]),
    y: at(t, [[0, low - viewport.height * 0.12], [0.35, low - viewport.height * 0.12], [0.55, low], [0.78, low], [0.87, low - viewport.height * 0.04]]),
    z: at(t, [[0, -1.6], [0.35, -1.6], [0.55, 0.1], [0.78, 0.2], [0.87, 4.7]]),
    scale: at(t, [[0, 0.77], [0.35, 0.77], [0.55, 1], [0.7, 1.05], [0.78, 1.05], [0.87, 1.2]]),
    rx: at(t, [[0, -2], [0.55, 0], [0.87, 1]]),
    ry: at(t, [[0, -4], [0.55, -1], [0.78, 0], [0.87, 3]]),
    alpha: at(t, [[0, 0], [0.345, 0], [0.41, 1], [0.845, 1], [0.89, 0]]),
  });
  const jacketPose = (t: number): Pose => ({
    x: at(t, [[0, right], [0.79, right], [0.87, right], [0.94, right], [0.98, right - viewport.width * 0.08]]),
    y: at(t, [[0, low - viewport.height * 0.08], [0.79, low - viewport.height * 0.08], [0.87, low], [0.94, low]]),
    z: at(t, [[0, -1.8], [0.8, -1.8], [0.88, 0], [0.94, 0.45]]),
    scale: at(t, [[0, 0.76], [0.8, 0.76], [0.88, 1], [0.94, 1.05]]),
    rx: at(t, [[0, -1], [0.88, 0]]), ry: at(t, [[0, 2], [0.88, 0]]),
    alpha: at(t, [[0, 0], [0.79, 0], [0.85, 1], [0.94, 1], [0.965, 0]]),
  });
  const sneakerWeights = (t: number) => {
    if (sneakerColor !== null && t >= 0.59 && t < 0.79) return [0, 1, 2].map(i => Number(i === sneakerColor));
    const black = smooth((t - 0.645) / 0.025) * (1 - smooth((t - 0.705) / 0.025));
    const crimson = smooth((t - 0.705) / 0.025) * (1 - smooth((t - 0.765) / 0.025));
    return [1 - black - crimson, black, crimson];
  };
  const jacketWeights = (t: number) => {
    if (jacketColor !== null && t >= 0.85 && t < 0.95) return [0, 1, 2].map(i => Number(i === jacketColor));
    const black = smooth((t - 0.875) / 0.014) * (1 - smooth((t - 0.902) / 0.014));
    const crimson = smooth((t - 0.902) / 0.014);
    return [1 - black - crimson, black, crimson];
  };
  const galleryAlpha = (t: number) => at(t, [[0, 0], [0.948, 0], [0.97, 1], [0.99, 1], [1, 0]]);
  const galleryPose = (x: number, y: number, z: number): ((t: number) => Pose) => (t) => ({
    x: x * viewport.width + at(t, [[0, 0], [0.94, viewport.width * 0.04], [0.975, 0]]),
    y: y * viewport.height,
    z,
    scale: 1,
    rx: 0, ry: at(t, [[0, 0], [0.94, -2], [0.975, 0]]),
    alpha: galleryAlpha(t),
  });

  return (
    <>
      <Actor progress={progress} pointer={pointer} pose={iconPose} size={mobile ? 1.35 : 1.75} images={[productAssets.icon]} icon />
      <Actor progress={progress} pointer={pointer} pose={sneakerPose} size={shoeSize} images={[productAssets.sneakers[0]]} shadow
        weights={() => [loadColorways ? sneakerWeights(progress.current)[0] : 1]} />
      {loadColorways && <Suspense fallback={null}>
        <Actor progress={progress} pointer={pointer} pose={sneakerPose} size={shoeSize} images={productAssets.sneakers.slice(1)}
          weights={(t) => sneakerWeights(t).slice(1)} />
      </Suspense>}
      {loadJacket && <Suspense fallback={null}>
        <Actor progress={progress} pointer={pointer} pose={jacketPose} size={jacketSize} images={productAssets.jackets}
          weights={jacketWeights} shadow />
      </Suspense>}
      {loadGallery && <Suspense fallback={null}>
        <Actor progress={progress} pointer={pointer} pose={galleryPose(desktop ? -0.25 : mobile ? -0.1 : -0.2, mobile ? -0.19 : -0.12, 1.2)}
          size={shoeSize * (mobile ? 0.42 : 0.43)} images={[productAssets.sneakers[0]]} />
        <Actor progress={progress} pointer={pointer} pose={galleryPose(desktop ? 0.19 : mobile ? 0.18 : 0.2, mobile ? 0.07 : -0.08, 0)}
          size={shoeSize * (mobile ? 0.39 : 0.43)} images={[productAssets.sneakers[1]]} />
        {!mobile && <Actor progress={progress} pointer={pointer} pose={galleryPose(0, 0.02, -1)}
          size={shoeSize * 0.31} images={[productAssets.sneakers[2]]} />}
        <Actor progress={progress} pointer={pointer} pose={galleryPose(desktop ? 0.34 : mobile ? -0.18 : 0.12, mobile ? 0.15 : 0.13, -2)}
          size={jacketSize * (mobile ? 0.34 : 0.37)} images={[productAssets.jackets[0]]} />
      </Suspense>}
    </>
  );
}

useTexture.preload(productAssets.icon);
useTexture.preload(productAssets.sneakers[0]);

export const AstixScene = memo(function AstixScene(props: Props) {
  return (
    <Canvas dpr={[1, 1.5]} frameloop={props.active ? 'always' : 'demand'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 35, position: [0, 0, 10], near: 0.1, far: 100 }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', props.onFailure, { once: true })}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Suspense fallback={null}><SceneContent {...props} /></Suspense>
    </Canvas>
  );
});
