"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type CoreMode = "assembled" | "exploded" | "quality" | "product" | "compact";

type SystemCoreProps = {
  mode?: CoreMode;
  activeLayer?: number;
  className?: string;
};

const layerNames = [
  "Interface",
  "Application",
  "Workflow",
  "Automation",
  "Data",
  "Security",
  "Operations",
];

export function SystemCore({
  mode = "assembled",
  activeLayer = -1,
  className = "",
}: SystemCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ mode, activeLayer });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    stateRef.current = { mode, activeLayer };
  }, [activeLayer, mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return;

    let disposed = false;
    let visible = false;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const mobileFallback = window.matchMedia("(max-width: 767px)").matches;
    const pointer = { x: 0, y: 0 };

    async function initialise() {
      if (mobileFallback) return;
      try {
        const THREE = await import("three");
        if (disposed || !canvas || !shell) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: !coarsePointer,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.15 : 1.6));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(6.8, 5.2, 8.2);
        camera.lookAt(0, 0, 0);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x28312f, 2.2));
        const key = new THREE.DirectionalLight(0xffffff, 4.2);
        key.position.set(4, 7, 5);
        scene.add(key);
        const teal = new THREE.PointLight(0x2ac7b8, 24, 15, 1.7);
        teal.position.set(-2.5, 0.5, 3);
        scene.add(teal);

        const group = new THREE.Group();
        group.rotation.set(-0.08, -0.54, -0.02);
        scene.add(group);

        const geometry = new THREE.BoxGeometry(4.5, 0.32, 3.15, 2, 1, 2);
        const edgeGeometry = new THREE.EdgesGeometry(geometry, 28);
        const layerColors = [0xe9ece8, 0x313735, 0xb9c3bf, 0x1f2523, 0x8ea19b, 0x252b29, 0x111513];
        const layers: import("three").Mesh[] = [];

        layerColors.forEach((color, index) => {
          const material = new THREE.MeshPhysicalMaterial({
            color,
            metalness: index % 2 ? 0.82 : 0.34,
            roughness: index % 2 ? 0.24 : 0.38,
            transmission: index === 2 || index === 4 ? 0.18 : 0,
            transparent: index === 2 || index === 4,
            opacity: index === 2 || index === 4 ? 0.88 : 1,
            clearcoat: 0.55,
            clearcoatRoughness: 0.18,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.y = (3 - index) * 0.43;
          mesh.userData.baseIndex = index;
          group.add(mesh);
          layers.push(mesh);

          const edges = new THREE.LineSegments(
            edgeGeometry,
            new THREE.LineBasicMaterial({
              color: 0x66706d,
              transparent: true,
              opacity: 0.32,
            }),
          );
          mesh.add(edges);
        });

        const scanUniforms = {
          time: { value: 0 },
          intensity: { value: 0.2 },
        };
        const scanMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: scanUniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform float time;
            uniform float intensity;
            void main() {
              float line = 1.0 - smoothstep(0.0, 0.09, abs(vUv.y - fract(time)));
              float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(0.0, 0.12, 1.0 - vUv.x);
              gl_FragColor = vec4(0.08, 0.78, 0.70, line * edge * intensity);
            }
          `,
        });
        const scanner = new THREE.Mesh(new THREE.PlaneGeometry(4.9, 3.55), scanMaterial);
        scanner.rotation.x = -Math.PI / 2;
        scanner.position.y = 0.02;
        group.add(scanner);

        const resize = () => {
          const width = Math.max(shell.clientWidth, 1);
          const height = Math.max(shell.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(shell);
        resize();

        const onPointerMove = (event: PointerEvent) => {
          if (coarsePointer) return;
          const rect = shell.getBoundingClientRect();
          pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        const onPointerLeave = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        shell.addEventListener("pointermove", onPointerMove);
        shell.addEventListener("pointerleave", onPointerLeave);

        const render = (time = 0) => {
          if (disposed) return;
          const state = stateRef.current;
          const spacing =
            state.mode === "exploded" ? 0.72 : state.mode === "product" ? 0.24 : 0.43;
          layers.forEach((layer, index) => {
            const targetY = (3 - index) * spacing;
            layer.position.y += (targetY - layer.position.y) * (reduceMotion ? 1 : 0.075);
            const selected = state.activeLayer === index;
            const targetX = selected ? 0.24 : 0;
            layer.position.x += (targetX - layer.position.x) * (reduceMotion ? 1 : 0.09);
            const material = layer.material as import("three").MeshPhysicalMaterial;
            material.emissive.set(selected ? 0x0d665d : 0x000000);
            material.emissiveIntensity = selected ? 0.7 : 0;
          });

          const seconds = time * 0.001;
          scanUniforms.time.value = (seconds * 0.09) % 1;
          scanUniforms.intensity.value = state.mode === "quality" ? 0.9 : 0.22;
          scanner.visible = state.mode === "quality" || state.mode === "assembled";
          const compactScale = state.mode === "compact" ? 0.82 : 1;
          group.scale.lerp(new THREE.Vector3(compactScale, compactScale, compactScale), 0.08);
          group.rotation.y += (-0.54 + pointer.x * 0.055 - group.rotation.y) * 0.045;
          group.rotation.x += (-0.08 + pointer.y * 0.035 - group.rotation.x) * 0.045;
          // Keep the silhouette locked to whole-scene coordinates. Continuous vertical
          // drift made the fine layer edges shimmer as they crossed device pixels.
          group.position.y = 0;
          renderer.render(scene, camera);

          if (!reduceMotion && visible && !document.hidden) {
            frame = requestAnimationFrame(render);
          }
        };

        intersectionObserver = new IntersectionObserver(([entry]) => {
          const nextVisible = entry.isIntersecting;
          if (nextVisible && !visible) {
            visible = true;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(render);
          } else {
            visible = nextVisible;
            if (!visible) cancelAnimationFrame(frame);
          }
        }, { rootMargin: "120px" });
        intersectionObserver.observe(shell);

        const onVisibility = () => {
          cancelAnimationFrame(frame);
          if (!document.hidden && visible) frame = requestAnimationFrame(render);
        };
        document.addEventListener("visibilitychange", onVisibility);
        render();
        setReady(true);

        return () => {
          document.removeEventListener("visibilitychange", onVisibility);
          shell.removeEventListener("pointermove", onPointerMove);
          shell.removeEventListener("pointerleave", onPointerLeave);
          renderer.dispose();
          geometry.dispose();
          edgeGeometry.dispose();
          scanMaterial.dispose();
          scanner.geometry.dispose();
          layers.forEach((layer) => {
            (layer.material as import("three").Material).dispose();
            const edges = layer.children[0] as import("three").LineSegments;
            (edges.material as import("three").Material).dispose();
          });
        };
      } catch {
        setReady(false);
      }
    }

    let cleanup: (() => void) | undefined;
    void initialise().then((result) => {
      cleanup = result;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className={`system-core ${ready ? "is-ready" : ""} ${className}`}
      data-mode={mode}
      aria-hidden="true"
    >
      <picture className="system-core-poster system-core-poster-light">
        <source srcSet="/images/system-core/system-core-poster.avif" type="image/avif" />
        <source srcSet="/images/system-core/system-core-poster.webp" type="image/webp" />
        <Image
          src="/images/system-core/system-core-poster.png"
          alt=""
          width={1536}
          height={1024}
          priority={mode === "assembled"}
        />
      </picture>
      <picture className="system-core-poster system-core-poster-dark">
        <source srcSet="/images/system-core/system-core-poster-dark.avif" type="image/avif" />
        <source srcSet="/images/system-core/system-core-poster-dark.webp" type="image/webp" />
        <Image
          src="/images/system-core/system-core-poster-dark.png"
          alt=""
          width={1536}
          height={1024}
        />
      </picture>
      <canvas ref={canvasRef} />
      <div className="system-core-labels">
        {layerNames.map((name, index) => (
          <span className={activeLayer === index ? "is-active" : ""} key={name}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
