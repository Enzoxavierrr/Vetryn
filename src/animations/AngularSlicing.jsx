import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "lil-gui";

const DEFAULT_PALETTE = {
  primary: 0x12462d,
  primaryContent: 0x7addad,
  bg: 0x081d13,
};

export default function AngularSlicing({ height = 520, palette = DEFAULT_PALETTE }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const V = { ...DEFAULT_PALETTE, ...(palette || {}) };

    let scene, camera, renderer, controls, mesh, stats, gui;
    let rafId;

    const uniforms = {
      sliceStart: { value: 1.75 },
      sliceArc: { value: 1.25 },
      sliceColor: { value: new THREE.Color(V.primaryContent) },
      baseColor: { value: new THREE.Color(0x858080) },
      lightPos: { value: new THREE.Vector3(6.25, 3, 4) },
      ambient: { value: 0.2 },
    };

    init();

    function init() {
      const width = mount.clientWidth;
      const heightPx = mount.clientHeight || height;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(V.bg);

      camera = new THREE.PerspectiveCamera(35, width / heightPx, 0.1, 100);
      camera.position.set(-5, 5, 12);
      scene.add(camera);

      // lights (we will use a simple directional for shading)
      const dirLight = new THREE.DirectionalLight(0xffffff, 4);
      dirLight.position.copy(uniforms.lightPos.value);
      scene.add(dirLight);

      // geometry: use torus knot as a stand-in for a model
      const geom = new THREE.TorusKnotGeometry(1.6, 0.45, 256, 32);

      // simple shader material that discards fragments outside angular slice
      const vertex = `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragment = `
        precision highp float;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float sliceStart;
        uniform float sliceArc;
        uniform vec3 sliceColor;
        uniform vec3 baseColor;
        uniform vec3 lightPos;
        uniform float ambient;

        const float PI2 = 6.28318530718;

        void main() {
          float angle = atan(vPosition.y, vPosition.x) - sliceStart;
          // wrap to 0..2PI
          angle = mod(angle + PI2, PI2);
          if (angle < 0.0) angle += PI2;
          if (!(angle >= 0.0 && angle < sliceArc)) discard;

          // basic lambert shading
          vec3 N = normalize(vNormal);
          vec3 L = normalize(lightPos - vPosition);
          float diff = max(dot(N, L), 0.0);
          vec3 col = baseColor * (ambient + diff * 0.9);

          // backface coloring
          #ifdef FRONT_FACING
            gl_FragColor = vec4(col, 1.0);
          #else
            gl_FragColor = vec4(sliceColor, 1.0);
          #endif
        }
      `;

      // Create ShaderMaterial
      const mat = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment.replace('#ifdef FRONT_FACING', 'bool front = gl_FrontFacing; if (front)').replace('#else', 'else'),
        uniforms,
        side: THREE.DoubleSide,
      });

      mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      // plane
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
      plane.receiveShadow = true;
      plane.position.set(-4, -3, -4);
      plane.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(plane);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, heightPx);
      renderer.setAnimationLoop(() => {});
      mount.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 0.1;
      controls.maxDistance = 50;

      // stats + gui
      stats = new Stats();
      mount.appendChild(stats.dom);

      gui = new GUI({ width: 260 });
      gui.add(uniforms.sliceStart, 'value', -Math.PI, Math.PI, 0.001).name('sliceStart');
      gui.add(uniforms.sliceArc, 'value', 0, Math.PI * 2, 0.001).name('sliceArc');
      gui.addColor({ color: '#' + uniforms.sliceColor.value.getHexString() }, 'color').onChange((v) => uniforms.sliceColor.value.set(v));

      window.addEventListener('resize', onWindowResize);

      rafId = requestAnimationFrame(animate);
    }

    function onWindowResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    function animate() {
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
      stats && stats.update();
      rafId = requestAnimationFrame(animate);
    }

    // cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (rafId) cancelAnimationFrame(rafId);
      try {
        gui && gui.destroy();
        stats && stats.dom && stats.dom.parentNode && stats.dom.parentNode.removeChild(stats.dom);
        controls && controls.dispose();
        renderer && renderer.dispose();
        renderer && renderer.domElement && mount.removeChild(renderer.domElement);
      } catch (e) {}
    };
  }, [height, palette]);

  const style = typeof height === 'number' ? { height } : { height };
  return <div ref={mountRef} className="w-full rounded-lg overflow-hidden" style={{ width: '100%', ...style }} />;
}
