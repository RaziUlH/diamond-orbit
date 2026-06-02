import { MeshRefractionMaterial } from "@react-three/drei";
import { useCachedGLTF } from "../hooks/useCachedGLTF";
import { useFrame, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

import { useControls } from "leva";

export function Diamond({ position, rotation, isMobile, ...props }) {
  const ref = useRef(null);
  const api = useRef(null);
  const { nodes } = useCachedGLTF("/3d/dflat.glb");
  const r = THREE.MathUtils.randFloatSpread;
  const pos = useMemo(
    () => position || [r(isMobile ? 1 : 2), r(isMobile ? 1 : 2), r(isMobile ? 1 : 2)], 
    [position, r, isMobile]
  );

  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr",
  );

  const config = useControls("Diamond Material", {
    bounces: { value: 3, min: 1, max: 10, step: 1 },
    aberrationStrength: { value: 0.015, min: 0.001, max: 0.1, step: 0.001 },
    ior: { value: 2.42, min: 1, max: 3, step: 0.01 },
    fresnel: { value: 1, min: 0, max: 1, step: 0.1 },
    color: "white",
  });

  const vec = useMemo(() => new THREE.Vector3(), []);
  const wobbleSpeed = useMemo(() => THREE.MathUtils.randFloat(0.1, 0.3), []);
  const wobbleOffset = useMemo(
    () => THREE.MathUtils.randFloat(0, Math.PI * 2),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const currentTranslation = api.current
      ? api.current.translation()
      : { x: 0, y: 0, z: 0 };

    const pullX =
      -currentTranslation.x * 0.25 +
      Math.sin(t * wobbleSpeed + wobbleOffset) * 0.15;

    const pullY =
      -currentTranslation.y * 0.25 +
      Math.cos(t * wobbleSpeed * 0.8 + wobbleOffset) * 0.15;

    const pullZ =
      -currentTranslation.z * 0.25 +
      Math.sin(t * wobbleSpeed * 0.5 + wobbleOffset) * 0.1;

    if (api.current) {
      api.current.applyImpulse(vec.set(pullX, pullY, pullZ), true);
    }
  });

  const geometry =
    nodes.Diamond_1_0?.geometry ||
    nodes.Diamond?.geometry ||
    nodes.Mesh?.geometry ||
    Object.values(nodes).find((n) => n.geometry)?.geometry;

  return (
    <RigidBody
      ref={api}
      position={pos}
      rotation={rotation}
      colliders="ball"
      linearDamping={4}
      angularDamping={1}
      friction={1000}
    >
      <mesh geometry={geometry} visible={false} scale={props.scale} />
      <mesh ref={ref} geometry={geometry} {...props}>
        <MeshRefractionMaterial
          envMap={texture}
          {...config}
          toneMapped={false}
        />
      </mesh>
    </RigidBody>
  );
}

useCachedGLTF.preload("/3d/dflat.glb");
