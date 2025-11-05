import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// OutputPass is optional; some three builds may not export it. We'll try to import but not depend on it.
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "lil-gui";

const DEFAULT_PALETTE = {
  primary: 0x12462d,
  primaryContent: 0x7addad,
  primaryLight: 0x1c6f47,
  bg: 0x081d13,
};

export default function BloomAnimation({ height = 420, palette = DEFAULT_PALETTE }) {
  const mountRef = useRef(null);
  const guiRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const V = { ...DEFAULT_PALETTE, ...(palette || {}) };

    let renderer, scene, camera, composer, controls, stats, gui;
    let frameId;

    const params = {
      exposure: 1,
      bloomStrength: 1.2,
      bloomThreshold: 0.0,
      bloomRadius: 0.25,
    };

    init();

    function init() {
      const width = mount.clientWidth;
      const heightPx = mount.clientHeight || 420;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setSize(width, heightPx);
      mount.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(V.bg);

      camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 100);
      camera.position.set(0, 1.5, 5);
      scene.add(camera);

      // lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const point = new THREE.PointLight(0xffffff, 1.5, 50);
      point.position.set(0, 5, 5);
      scene.add(point);

      // simple glowy objects to show bloom: torus + spheres
      const group = new THREE.Group();

      const geomTorus = new THREE.TorusKnotGeometry(0.7, 0.22, 120, 16);
      const matGlow = new THREE.MeshStandardMaterial({
        color: V.primary,
        emissive: new THREE.Color(V.primaryContent),
        emissiveIntensity: 1.5,
        metalness: 0.2,
        roughness: 0.4,
      });

      const torus = new THREE.Mesh(geomTorus, matGlow);
      torus.position.set(-0.5, 0, 0);
      group.add(torus);

      const geomSphere = new THREE.SphereGeometry(0.35, 32, 24);
      const matSphere = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(V.primaryContent),
        emissiveIntensity: 2.5,
        metalness: 0.1,
        roughness: 0.3,
      });
      const sphere = new THREE.Mesh(geomSphere, matSphere);
      sphere.position.set(1.1, 0.2, 0);
      group.add(sphere);

      // add several small glowing particles
      const particleGeo = new THREE.SphereGeometry(0.06, 12, 8);
      for (let i = 0; i < 12; i++) {
        const m = new THREE.Mesh(particleGeo, matSphere);
        const a = Math.random() * Math.PI * 2;
        const r = 1.6 + Math.random() * 0.6;
        m.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 0.6, Math.sin(a) * r);
        group.add(m);
      }

      scene.add(group);

      // composer + passes
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, heightPx), params.bloomStrength, params.bloomRadius, params.bloomThreshold);
      bloomPass.threshold = params.bloomThreshold;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;
      composer.addPass(bloomPass);

      // output pass (some builds don't need it; it's harmless)
      try {
        const outputPass = new OutputPass();
        composer.addPass(outputPass);
      } catch (e) {
        // ignore if not available in this build
      }

      // controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 2.5;
      controls.maxDistance = 10;

      // stats (dev) and gui
      stats = new Stats();
      mount.appendChild(stats.dom);
      statsRef.current = stats;

      gui = new GUI({ width: 260 });
      guiRef.current = gui;
      const f = gui.addFolder("bloom");
      f.add(params, "bloomThreshold", 0.0, 1.0).onChange((v) => { bloomPass.threshold = Number(v); });
      f.add(params, "bloomStrength", 0.0, 3.0).onChange((v) => { bloomPass.strength = Number(v); });
      f.add(params, "bloomRadius", 0.0, 1.0).step(0.01).onChange((v) => { bloomPass.radius = Number(v); });
      gui.add(params, "exposure", 0.1, 2).onChange((v) => { renderer.toneMappingExposure = Math.pow(Number(v), 4.0); });

      window.addEventListener("resize", onWindowResize);

      // animate
      frameId = requestAnimationFrame(animate);
    }

    function onWindowResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }

    function animate() {
      // rotate objects slightly for motion
      scene.rotation.y += 0.0025;
      composer.render();
      stats && stats.update();
      frameId = requestAnimationFrame(animate);
    }

    // cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (frameId) cancelAnimationFrame(frameId);
      try {
        if (guiRef.current) guiRef.current.destroy();
        if (statsRef.current && statsRef.current.dom && statsRef.current.dom.parentNode) statsRef.current.dom.parentNode.removeChild(statsRef.current.dom);
      } catch (e) {}
      try {
        composer && composer.dispose && composer.dispose();
      } catch (e) {}
      try {
        renderer && renderer.dispose && renderer.dispose();
        renderer && renderer.domElement && mount.removeChild(renderer.domElement);
      } catch (e) {}
    };
  }, [height, palette]);

  const style = typeof height === "number" ? { height } : { height };

  return <div ref={mountRef} className="w-full rounded-lg overflow-hidden" style={{ width: "100%", ...style }} />;
}
