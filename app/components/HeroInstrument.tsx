"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroInstrument() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const abort = new AbortController();
    let disposed = false;
    let cleanup = () => {};

    async function initialize() {
      const [THREE, { GLTFLoader }, { RoomEnvironment }, { OrbitControls }] = await Promise.all([
        import("three"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/environments/RoomEnvironment.js"),
        import("three/addons/controls/OrbitControls.js"),
      ]);
      if (disposed || !mount) return;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.6;
      renderer.domElement.setAttribute("aria-label", "Calabi Yau surface. Drag or use arrow keys to rotate.");
      renderer.domElement.setAttribute("role", "img");
      renderer.domElement.tabIndex = 0;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.4, 8.6);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI * 0.2;
      controls.maxPolarAngle = Math.PI * 0.8;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();
      scene.add(new THREE.HemisphereLight(0xc8e5dc, 0x294c3f, 2));
      const key = new THREE.DirectionalLight(0xffe6b4, 5);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x89ddc5, 3);
      rim.position.set(-4, 1, -2);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);
      let previous = 0;
      let visible = true;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      pausedRef.current = motion.matches;
      setPaused(motion.matches);
      const render = () => renderer.render(scene, camera);
      const onKey = (event: KeyboardEvent) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        if (event.key === "ArrowLeft") group.rotation.y -= 0.15;
        if (event.key === "ArrowRight") group.rotation.y += 0.15;
        if (event.key === "ArrowUp") group.rotation.x -= 0.15;
        if (event.key === "ArrowDown") group.rotation.x += 0.15;
        render();
      };
      renderer.domElement.addEventListener("keydown", onKey);
      const frame = (time: number) => {
        if (previous && time - previous < 33) return;
        const delta = previous ? Math.min((time - previous) / 1000, 0.06) : 0;
        previous = time;
        if (!pausedRef.current) {
          group.rotation.y += delta * 0.12;
        }
        render();
      };
      const updateLoop = () => {
        previous = 0;
        renderer.setAnimationLoop(visible && !document.hidden && !pausedRef.current ? frame : null);
        render();
      };
      const onMotion = () => {
        pausedRef.current = motion.matches;
        setPaused(motion.matches);
        updateLoop();
      };
      const resize = new ResizeObserver(() => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < 1 ? 10 : 8.6;
        camera.updateProjectionMatrix();
        render();
      });
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateLoop();
      });
      resize.observe(mount);
      observer.observe(mount);
      controls.addEventListener("change", render);
      document.addEventListener("visibilitychange", updateLoop);
      motion.addEventListener("change", onMotion);
      mount.addEventListener("motionchange", updateLoop);

      const disposeModel = (root: InstanceType<typeof THREE.Object3D>) => {
        root.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material: InstanceType<typeof THREE.Material>) => material.dispose());
          }
        });
      };
      cleanup = () => {
        renderer.setAnimationLoop(null);
        resize.disconnect();
        observer.disconnect();
        document.removeEventListener("visibilitychange", updateLoop);
        motion.removeEventListener("change", onMotion);
        mount.removeEventListener("motionchange", updateLoop);
        controls.dispose();
        renderer.domElement.removeEventListener("keydown", onKey);
        disposeModel(group);
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };

      const response = await fetch("/models/calabi_yau_surface.glb", { signal: abort.signal });
      if (!response.ok) throw new Error("Model unavailable");
      const gltf = await new GLTFLoader().parseAsync(await response.arrayBuffer(), "");
      if (disposed) {
        disposeModel(gltf.scene);
        return;
      }
      const bounds = new THREE.Box3().setFromObject(gltf.scene);
      gltf.scene.position.sub(bounds.getCenter(new THREE.Vector3()));
      const size = bounds.getSize(new THREE.Vector3());
      group.scale.setScalar(3.7 / Math.max(size.x, size.y, size.z));
      group.add(gltf.scene);
      group.rotation.set(0.15, -0.35, -0.12);
      render();
      setStatus("ready");
      updateLoop();
    }

    initialize().catch(() => {
      if (!disposed) {
        cleanup();
        cleanup = () => {};
        setStatus("fallback");
      }
    });
    return () => {
      disposed = true;
      abort.abort();
      cleanup();
    };
  }, []);

  function toggleMotion() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    mountRef.current?.dispatchEvent(new Event("motionchange"));
  }

  return (
    <figure className="surface-instrument" aria-label="Calabi Yau surface, a study in connected geometry">
      <div className="surface-instrument-header">
        <span>FORM STUDY / 01</span>
        <span>CALABI YAU SURFACE</span>
      </div>
      <div className="surface-stage" data-status={status}>
        <Image className="surface-poster" src="/images/calabi-yau-poster.png" alt="Folded green and bronze Calabi Yau surface" fill priority sizes="(max-width: 767px) 92vw, 56vw" />
        <div className="surface-canvas" ref={mountRef} />
        <span className="surface-axis" aria-hidden="true">Y<br />│<br />└── X</span>
        <span className="surface-stage-caption">COMPLEXITY, GIVEN STRUCTURE.</span>
      </div>
      <figcaption className="surface-instrument-footer">
        <span>{status === "ready" ? "DRAG / ARROW KEYS TO EXPLORE" : "A STUDY IN CONNECTED FORM"}</span>
        {status === "ready" && <button type="button" onClick={toggleMotion} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"} <span aria-hidden="true">{paused ? "↻" : "Ⅱ"}</span></button>}
      </figcaption>
      <p className="surface-credit">Model by <a href="https://sketchfab.com/3d-models/calabi-yau-surface-e8e9ff86262b44fdaea8c8c70a9abf88" target="_blank" rel="noopener noreferrer">smice</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></p>
    </figure>
  );
}
