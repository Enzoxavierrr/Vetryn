import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

export default function Project3DAnimation({ onComplete, onFadeStart }) {
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const initializedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Get CTA box position
    const ctaBox = document.getElementById("cta-box");
    if (!ctaBox) {
      initializedRef.current = false;
      return;
    }

    const boxRect = ctaBox.getBoundingClientRect();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    mountRef.current.appendChild(renderer.domElement);

    // Convert screen coordinates to 3D coordinates
    const screenToWorld = (screenX, screenY) => {
      const x = (screenX / window.innerWidth) * 2 - 1;
      const y = -(screenY / window.innerHeight) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(distance));
    };

    const startPos = screenToWorld(
      boxRect.left + boxRect.width / 2,
      boxRect.top + boxRect.height / 2
    );
    const boxWidth = (boxRect.width / window.innerWidth) * 8;
    const boxHeight = (boxRect.height / window.innerHeight) * 8;

    // Get contact section position - calculate properly
    const contactSection = document.getElementById("contact");
    let endY = startPos.y - 20; // Default: go down significantly
    let endX = startPos.x; // Keep same X position
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      // Get the center of contact section
      const contactCenterY = contactRect.top + contactRect.height / 2;
      const contactCenterX = contactRect.left + contactRect.width / 2;
      const contactPos = screenToWorld(contactCenterX, contactCenterY);
      endY = contactPos.y;
      endX = contactPos.x;
      // Ensure it goes down
      if (endY >= startPos.y) {
        endY = startPos.y - 20;
      }
    }

    // Create initial box (the green box)
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, 0.5);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 1,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(startPos.x, startPos.y, 0);
    scene.add(box);

    // Create rocket - seen from side, pointing right
    const rocketGroup = new THREE.Group();

    // Rocket body (cylinder) - horizontal
    const rocketBodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32);
    const rocketBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0,
    });
    const rocketBody = new THREE.Mesh(rocketBodyGeometry, rocketBodyMaterial);
    rocketBody.rotation.z = Math.PI / 2; // Rotate to be horizontal
    rocketGroup.add(rocketBody);

    // Rocket nose cone (cone) - pointing right
    const noseConeGeometry = new THREE.ConeGeometry(0.4, 0.7, 32);
    const noseConeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0,
    });
    const noseCone = new THREE.Mesh(noseConeGeometry, noseConeMaterial);
    noseCone.position.x = 0.75; // Right side (nose pointing right)
    noseCone.rotation.z = -Math.PI / 2; // Point to the right
    rocketGroup.add(noseCone);

    // Rocket fins (3 fins) - at the back
    const finGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.1);
    const finMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 0.5,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0,
    });

    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      const angle = (i * Math.PI * 2) / 3;
      fin.position.x = -0.75; // Back of rocket (left side)
      fin.position.y = Math.cos(angle) * 0.35;
      fin.position.z = Math.sin(angle) * 0.35;
      fin.rotation.x = Math.PI / 2; // Horizontal
      rocketGroup.add(fin);
    }

    // Rocket flame - at the back (left side)
    const flameGeometry = new THREE.ConeGeometry(0.2, 0.5, 16);
    const flameMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      emissive: 0xff4500,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0,
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.x = -0.9; // Back of rocket (left side)
    flame.rotation.z = Math.PI / 2; // Point to the left
    rocketGroup.add(flame);

    // Rocket starts at box position, pointing right, horizontal
    rocketGroup.position.set(startPos.x, startPos.y, 0);
    rocketGroup.rotation.y = 0; // No rotation - already horizontal
    rocketGroup.rotation.x = 0; // Horizontal
    rocketGroup.rotation.z = 0; // No rotation
    scene.add(rocketGroup);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x4ade80, 2);
    directionalLight.position.set(3, 5, 3);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x22c55e, 1.5, 100);
    pointLight.position.set(-3, 5, 3);
    scene.add(pointLight);

    // Flame light
    const flameLight = new THREE.PointLight(0xff6b00, 2, 50);
    flameLight.position.set(startPos.x, startPos.y, 0);
    scene.add(flameLight);

    // Camera initial position - looking at box from side
    camera.position.set(0, 0, 5);
    camera.lookAt(startPos.x, startPos.y, 0);

    // Render initial frame
    renderer.render(scene, camera);

    // Animation variables
    const startTime = Date.now();
    const duration = 3000; // 3 seconds
    let hasCalledFadeStart = false;
    let animationRunning = true;

    // Animation loop
    const animate = () => {
      if (!animationRunning) return;

      animationFrameRef.current = requestAnimationFrame(animate);

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Phase 1: Box transforms into rocket (0-0.3) - single smooth transition
      if (progress < 0.3) {
        const transformProgress = progress / 0.3;
        const transformEase = 1 - Math.pow(1 - transformProgress, 2);

        // Box transforms - scales down smoothly
        box.scale.y = 1 - transformEase * 0.6;
        box.scale.x = 1 - transformEase * 0.4;
        boxMaterial.opacity = 1 - transformEase;

        // Rocket appears - seamless transition
        rocketBodyMaterial.opacity = transformEase;
        noseConeMaterial.opacity = transformEase;
        finMaterial.opacity = transformEase;
        flameMaterial.opacity = transformEase * 0.8;

        // Rocket scales up from box size - smooth
        const rocketScale = 0.6 + transformEase * 0.8;
        rocketGroup.scale.set(rocketScale, rocketScale, rocketScale);

        // Rocket position follows box - stays horizontal, pointing right
        rocketGroup.position.y = startPos.y;
        rocketGroup.rotation.y = 0; // No rotation
        rocketGroup.rotation.x = 0; // Horizontal
        rocketGroup.rotation.z = 0; // No rotation
      } else {
        // Box is gone
        boxMaterial.opacity = 0;
        box.visible = false;
      }

      // Phase 2: Rocket flies down to contact section (0.3-1.0) - single continuous movement
      if (progress >= 0.3) {
        const fallProgress = (progress - 0.3) / 0.7;
        const fallEase = 1 - Math.pow(1 - fallProgress, 2);

        // Rocket flies down smoothly - calculate distance properly
        const distanceY = startPos.y - endY;
        const distanceX = endX - startPos.x;
        const rocketY = startPos.y - fallEase * distanceY;
        const rocketX = startPos.x + fallEase * distanceX;
        rocketGroup.position.y = rocketY;
        rocketGroup.position.x = rocketX;

        // Rocket stays horizontal, pointing to the right - NO ROTATION
        rocketGroup.rotation.y = 0; // Point to the right (already set)
        rocketGroup.rotation.x = 0; // Horizontal
        rocketGroup.rotation.z = 0; // No rotation

        // Flame intensity increases as it flies
        flameMaterial.opacity = 0.8 + fallEase * 0.2;
        flame.scale.x = 1 + fallEase * 0.5;

        // Flame light follows rocket
        flameLight.position.y = rocketY;
        flameLight.position.x = rocketX;

        // Camera follows rocket down for better side view
        if (progress < 0.85) {
          const cameraFollow = fallProgress * 0.7;
          camera.position.y = -cameraFollow * 4;
          camera.position.x = 0;
          camera.position.z = 5;
          camera.lookAt(
            rocketGroup.position.x,
            rocketGroup.position.y,
            rocketGroup.position.z
          );
        } else {
          camera.position.y = -0.7 * 4;
          camera.position.x = 0;
          camera.position.z = 5;
          camera.lookAt(
            rocketGroup.position.x,
            rocketGroup.position.y,
            rocketGroup.position.z
          );
        }
      }

      // Call fade start callback
      if (progress > 0.5 && !hasCalledFadeStart) {
        hasCalledFadeStart = true;
        if (onFadeStart) {
          onFadeStart();
        }
      }

      // Fade out rocket as it goes behind contact boxes (0.8-1.0)
      if (progress > 0.8) {
        const fadeProgress = (progress - 0.8) / 0.2;
        const smoothFade = 1 - Math.pow(1 - fadeProgress, 2);
        const opacity = 1 - smoothFade;
        rocketBodyMaterial.opacity = opacity;
        noseConeMaterial.opacity = opacity;
        finMaterial.opacity = opacity;
        flameMaterial.opacity = (0.8 + 0.2) * opacity;
      }

      renderer.render(scene, camera);

      // Complete animation - hide everything immediately
      if (progress >= 1) {
        animationRunning = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        rocketGroup.visible = false;
        box.visible = false;
        rocketBodyMaterial.opacity = 0;
        noseConeMaterial.opacity = 0;
        finMaterial.opacity = 0;
        flameMaterial.opacity = 0;
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 50);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      animationRunning = false;
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeometry.dispose();
      boxMaterial.dispose();
      rocketBodyGeometry.dispose();
      rocketBodyMaterial.dispose();
      noseConeGeometry.dispose();
      noseConeMaterial.dispose();
      finGeometry.dispose();
      finMaterial.dispose();
      flameGeometry.dispose();
      flameMaterial.dispose();
      initializedRef.current = false;
    };
  }, [onComplete, onFadeStart]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: "transparent",
            mixBlendMode: "normal",
            overflow: "hidden",
          }}
        >
          <div
            ref={mountRef}
            className="w-full h-full"
            style={{
              pointerEvents: "none",
              background: "transparent",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
