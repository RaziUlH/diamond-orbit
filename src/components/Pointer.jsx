import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";

export function Pointer() {
  const ref = useRef(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ mouse, viewport }, delta) => {
    const d = Math.min(0.1, delta);

    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    const current = ref.current
      ? ref.current.translation()
      : { x: 0, y: 0, z: 0 };

    /*
     * Smooth mouse-following.
     */
    const speed = 10;
    const factor = 1 - Math.exp(-speed * d);

    if (ref.current) {
      ref.current.setNextKinematicTranslation(
        vec.set(
          THREE.MathUtils.lerp(current.x, targetX, factor),
          THREE.MathUtils.lerp(current.y, targetY, factor),
          0,
        ),
      );
    }
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[0.5]} />
    </RigidBody>
  );
}
