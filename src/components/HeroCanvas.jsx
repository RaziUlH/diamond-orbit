import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Diamond } from "./Diamond";
import { Pointer } from "./Pointer";

import { useControls } from 'leva';

export default function HeroCanvas(props) {
  const bloomConfig = useControls('Bloom', {
    mipmapBlur: true,
    luminanceThreshold: { value: 10, min: 0, max: 10, step: 0.1 },
    intensity: { value: 1, min: 0, max: 10, step: 0.1 },
    levels: { value: 9, min: 1, max: 10, step: 1 },
  });

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
      }}
      camera={{ position: [0, 0, 20], fov: 20, near: 10, far: 50 }}
      {...props}
    >
      <color attach="background" args={["#000000"]} />
      <Suspense fallback={null}>
        <Physics gravity={[0, 0, -5]}>
          <Pointer />

          {Array.from({ length: 10 }).map((_, i) => (
            <Diamond key={i} scale={0.5} />
          ))}
        </Physics>

        <EffectComposer multisampling={1} enableNormalPass enabled>
          <N8AO />
          <Bloom {...bloomConfig} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
