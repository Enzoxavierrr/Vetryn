import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer.js";

const DEFAULT_PALETTE = {
  primary: 0x12462d,
  primaryContent: 0x7addad,
  bg: 0x081d13,
};

export default function CSS3DSpritesAnimation({ height = 520, palette = DEFAULT_PALETTE }) {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const V = { ...DEFAULT_PALETTE, ...(palette || {}) };

    let camera, scene, renderer, controls;
    const particlesTotal = 512;
    const positions = [];
    const objects = [];
    let current = 0;

    init();
    animate();

    function init() {
      const width = mount.clientWidth;
      const heightPx = mount.clientHeight || height;

      camera = new THREE.PerspectiveCamera(75, width / heightPx, 1, 5000);
      camera.position.set(600, 400, 1500);
      camera.lookAt(0, 0, 0);

      scene = new THREE.Scene();

      // create a prototype sprite element using project colors
      const spriteProto = document.createElement("div");
      spriteProto.style.width = "56px";
      spriteProto.style.height = "56px";
      spriteProto.style.borderRadius = "50%";
      spriteProto.style.boxShadow = `0 8px 20px rgba(0,0,0,0.25)`;
      spriteProto.style.background = `radial-gradient(circle at 30% 30%, #${V.primaryContent.toString(16).padStart(6, "0")}, #${V.primary.toString(16).padStart(6, "0")})`;
      spriteProto.style.border = `2px solid rgba(255,255,255,0.06)`;

      // create objects when sprite is 'ready' (we have proto immediately)
      for (let i = 0; i < particlesTotal; i++) {
        const el = spriteProto.cloneNode();
        // slight variation
        el.style.transform = `translateZ(0)`;
        const obj = new CSS3DSprite(el);
        obj.position.x = Math.random() * 4000 - 2000;
        obj.position.y = Math.random() * 4000 - 2000;
        obj.position.z = Math.random() * 4000 - 2000;
        scene.add(obj);
        objects.push(obj);
      }

      // Plane layout
      const amountX = 16;
      const amountZ = 32;
      const separationPlane = 150;
      const offsetX = ((amountX - 1) * separationPlane) / 2;
      const offsetZ = ((amountZ - 1) * separationPlane) / 2;

      for (let i = 0; i < particlesTotal; i++) {
        const x = (i % amountX) * separationPlane;
        const z = Math.floor(i / amountX) * separationPlane;
        const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;
        positions.push(x - offsetX, y, z - offsetZ);
      }

      // Cube layout
      const amount = 8;
      const separationCube = 150;
      const offset = ((amount - 1) * separationCube) / 2;

      for (let i = 0; i < particlesTotal; i++) {
        const x = (i % amount) * separationCube;
        const y = Math.floor((i / amount) % amount) * separationCube;
        const z = Math.floor(i / (amount * amount)) * separationCube;
        positions.push(x - offset, y - offset, z - offset);
      }

      // Random
      for (let i = 0; i < particlesTotal; i++) {
        positions.push(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
      }

      // Sphere
      const radius = 750;
      for (let i = 0; i < particlesTotal; i++) {
        const phi = Math.acos(-1 + (2 * i) / particlesTotal);
        const theta = Math.sqrt(particlesTotal * Math.PI) * phi;
        positions.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi));
      }

      renderer = new CSS3DRenderer();
      renderer.setSize(width, heightPx);
      mount.appendChild(renderer.domElement);

      controls = new TrackballControls(camera, renderer.domElement);
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;

      window.addEventListener("resize", onWindowResize);

      // start the first transition
      transition();
    }

    function onWindowResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    function transition() {
      const offset = current * particlesTotal * 3;
      const duration = 2000;

      for (let i = 0, j = offset; i < particlesTotal; i++, j += 3) {
        const object = objects[i];
        new TWEEN.Tween(object.position)
          .to({ x: positions[j], y: positions[j + 1], z: positions[j + 2] }, Math.random() * duration + duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      }

      new TWEEN.Tween({})
        .to({}, duration * 3)
        .onComplete(() => transition())
        .start();

      current = (current + 1) % 4;
    }

    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();

      const time = performance.now();
      for (let i = 0, l = objects.length; i < l; i++) {
        const object = objects[i];
        const scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1;
        object.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    }

    // cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        controls && controls.dispose();
        renderer && renderer.domElement && mount.removeChild(renderer.domElement);
      } catch (e) {
        // ignore
      }
    };
  }, [height, palette]);

  const style = typeof height === "number" ? { height } : { height };

  return <div ref={mountRef} className="w-full rounded-lg overflow-hidden" style={{ width: "100%", ...style }} />;
}
