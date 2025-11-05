import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * InstancedAnimation
 * Props:
 *  - amount (number): cubes per side (amount^3 instances). default 8
 *  - height (number|string): CSS height for the canvas container, e.g. 360 or '50vh'
 *  - palette (object): optional colors { primary, primaryContent, bg }
 */
export default function InstancedAnimation({ amount = 8, height = 360, palette }) {
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const V = palette || {
      primary: 0x12462d,
      primaryContent: 0x7addad,
      bg: 0x081d13,
    };

    let renderer, scene, camera, mesh, controls, frameId;

    const count = Math.pow(amount, 3);
    const mouse = new THREE.Vector2(10, 10); // off-screen init
    const raycaster = new THREE.Raycaster();
    const hoverColor = new THREE.Color(V.primaryContent);
    const baseColor = new THREE.Color(V.primary);

    init();

    function init() {
      const width = mount.clientWidth;
      const heightPx = mount.clientHeight || 360;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(width, heightPx, false);
      mount.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(60, width / heightPx, 0.1, 100);
      camera.position.set(amount, amount, amount);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(V.bg);

      const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.8);
      scene.add(hemi);

      const ambient = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambient);

      // geometry + material
      const geometry = new THREE.IcosahedronGeometry(0.45, 2);
      const material = new THREE.MeshStandardMaterial({
        color: V.primary,
        flatShading: false,
        metalness: 0.15,
        roughness: 0.6,
        vertexColors: true,
      });

      mesh = new THREE.InstancedMesh(geometry, material, count);

      // ensure instanceColor exists
      const instanceColors = new Float32Array(count * 3);
      mesh.instanceColor = new THREE.InstancedBufferAttribute(instanceColors, 3);

      const matrix = new THREE.Matrix4();
      let i = 0;
      const offset = (amount - 1) / 2;

      for (let x = 0; x < amount; x++) {
        for (let y = 0; y < amount; y++) {
          for (let z = 0; z < amount; z++) {
            matrix.setPosition(offset - x, offset - y, offset - z);
            mesh.setMatrixAt(i, matrix);
            // set initial color to base
            mesh.setColorAt(i, baseColor);
            i++;
          }
        }
      }

      mesh.instanceColor.needsUpdate = true;
      scene.add(mesh);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;

      // event listeners
      window.addEventListener("resize", onWindowResize, { passive: true });
      renderer.domElement.addEventListener("pointermove", onPointerMove);

      frameId = requestAnimationFrame(animate);
    }

    function onWindowResize() {
      if (!mount || !renderer || !camera) return;
      const width = mount.clientWidth;
      const heightPx = mount.clientHeight || 360;
      camera.aspect = width / heightPx;
      camera.updateProjectionMatrix();
      renderer.setSize(width, heightPx, false);
    }

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function animate() {
      controls.update();

      // raycast against instanced mesh
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(mesh, false);

      if (hits.length > 0) {
        const id = hits[0].instanceId;
        if (typeof id === "number") {
          // read current color and only change if different from hover
          const color = new THREE.Color();
          mesh.getColorAt(id, color);
          if (!color.equals(hoverColor)) {
            mesh.setColorAt(id, hoverColor);
            mesh.instanceColor.needsUpdate = true;
          }
        }
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    // cleanup
    cleanupRef.current = () => {
      window.removeEventListener("resize", onWindowResize);
      if (renderer && renderer.domElement) renderer.domElement.removeEventListener("pointermove", onPointerMove);
      if (frameId) cancelAnimationFrame(frameId);
      try {
        if (controls) controls.dispose();
        if (mesh) {
          mesh.geometry && mesh.geometry.dispose();
          mesh.material && mesh.material.dispose();
          scene.remove(mesh);
        }
        if (renderer) {
          renderer.forceContextLoss && renderer.forceContextLoss();
          renderer.domElement && mount.removeChild(renderer.domElement);
          renderer.dispose();
        }
      } catch (err) {
        // ignore
      }
    };

    return () => {
      cleanupRef.current && cleanupRef.current();
    };
  }, [amount, palette]);

  const style = typeof height === "number" ? { height } : { height };

  return (
    <div
      ref={mountRef}
      className="w-full rounded-lg overflow-hidden"
      style={{ width: "100%", ...style }}
    />
  );
}
