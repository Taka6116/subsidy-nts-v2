"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PartnerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 5);

    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(0xb4dcff),
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const lightBeamMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x78c8ff),
      transparent: true,
      opacity: 0.045,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const beamConfigs = [
      { x: -3, rotation: 0.25 },
      { x: 0, rotation: 0.05 },
      { x: 3.5, rotation: -0.2 },
    ];

    const beams: THREE.Mesh[] = [];
    beamConfigs.forEach(({ x, rotation }) => {
      const geo = new THREE.PlaneGeometry(1.2, 20);
      const beam = new THREE.Mesh(geo, lightBeamMat);
      beam.position.set(x, 2, -2);
      beam.rotation.z = rotation;
      scene.add(beam);
      beams.push(beam);
    });

    let animationId = 0;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.0004;

      particles.rotation.y = time * 0.3;
      particles.rotation.x = time * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      particleGeo.dispose();
      particleMat.dispose();
      lightBeamMat.dispose();
      beams.forEach((b) => {
        b.geometry.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
