import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "lil-gui";

export default function InstancedRaycast({ amount = 8 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let camera, scene, renderer, controls, stats, mesh, gui;

    const count = Math.pow(amount, 3);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(1, 1);
    const color = new THREE.Color();
    const white = new THREE.Color(0xffffff);

    init();

    function init() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(amount, amount, amount);
      camera.lookAt(0, 0, 0);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x081d13);
      scene.fog = new THREE.Fog(0x081d13, 20, 120);

      const light = new THREE.HemisphereLight(0xffffff, 0x888888, 2.5);
      light.position.set(0, 1, 0);
      scene.add(light);

      const geometry = new THREE.IcosahedronGeometry(0.5, 3);
      const material = new THREE.MeshPhongMaterial({ color: 0x12462d });

      mesh = new THREE.InstancedMesh(geometry, material, count);
      let i = 0;
      const offset = (amount - 1) / 2;
      const matrix = new THREE.Matrix4();

      for (let x = 0; x < amount; x++) {
        for (let y = 0; y < amount; y++) {
          for (let z = 0; z < amount; z++) {
            matrix.setPosition(offset - x, offset - y, offset - z);
            mesh.setMatrixAt(i, matrix);
            mesh.setColorAt(i, white);
            i++;
          }
        }
      }
      scene.add(mesh);

      // GUI (small)
      gui = new GUI({ width: 260 });
      try {
        gui.add(mesh, "count", 0, count, 1).name("Instâncias visíveis");
      } catch (e) {
        // ignore if GUI can't bind
      }

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(animate);
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = true;

      stats = new Stats();
      container.appendChild(stats.dom);

      window.addEventListener("resize", onWindowResize);
      renderer.domElement.addEventListener("mousemove", onMouseMove);
    }

    function onWindowResize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function onMouseMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function animate() {
      controls.update();

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(mesh, false);

      if (hits.length > 0) {
        const id = hits[0].instanceId;
        mesh.getColorAt(id, color);
        if (color.equals(white)) {
          mesh.setColorAt(id, new THREE.Color(0x7addad));
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      stats.update();
    }

    // cleanup
    return () => {
      try {
        window.removeEventListener("resize", onWindowResize);
        if (renderer && renderer.domElement) renderer.domElement.removeEventListener("mousemove", onMouseMove);
        if (renderer) {
          renderer.setAnimationLoop(null);
          renderer.domElement && container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        if (controls) controls.dispose();
        if (stats && stats.dom && stats.dom.parentNode) stats.dom.parentNode.removeChild(stats.dom);
        if (gui) gui.destroy();
        if (mesh) {
          mesh.geometry && mesh.geometry.dispose();
          mesh.material && mesh.material.dispose();
          scene.remove(mesh);
        }
      } catch (err) {
        // ignore cleanup errors
      }
    };
  }, [amount]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden"
      style={{ width: "100%", height: 360 }}
    />
  );
}
