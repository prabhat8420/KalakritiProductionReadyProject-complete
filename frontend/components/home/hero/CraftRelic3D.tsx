'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CraftRelic3DProps {
  materialType?: 'terracotta' | 'bronze' | 'glazed_blue';
}

export default function CraftRelic3D({ materialType = 'glazed_blue' }: CraftRelic3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;
    camera.position.y = 0.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for object
    const relicGroup = new THREE.Group();
    scene.add(relicGroup);

    // Create Classical Indian Craft Urn Geometry (Lathe profile)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, 0.0));
    points.push(new THREE.Vector2(0.5, 0.05));
    points.push(new THREE.Vector2(0.7, 0.25));
    points.push(new THREE.Vector2(0.9, 0.6));
    points.push(new THREE.Vector2(0.95, 0.9));
    points.push(new THREE.Vector2(0.8, 1.2));
    points.push(new THREE.Vector2(0.45, 1.45));
    points.push(new THREE.Vector2(0.38, 1.6));
    points.push(new THREE.Vector2(0.48, 1.7));
    points.push(new THREE.Vector2(0.45, 1.75));
    points.push(new THREE.Vector2(0.35, 1.75));

    const latheGeometry = new THREE.LatheGeometry(points, 48);

    // Material Shaders based on craft tradition
    let relicMaterial: THREE.Material;
    if (materialType === 'glazed_blue') {
      // Jaipur Blue Pottery Glaze (Cobalt & Quartz luster)
      relicMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x1a3a60),
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
      });
    } else if (materialType === 'bronze') {
      // Bastar Dhokra Lost-wax Bell Metal
      relicMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xb88e36),
        roughness: 0.35,
        metalness: 0.85,
      });
    } else {
      // Kutch Earthen Fired Clay
      relicMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x9e432a),
        roughness: 0.75,
        metalness: 0.05,
      });
    }

    const urnMesh = new THREE.Mesh(latheGeometry, relicMaterial);
    urnMesh.position.y = -0.85;
    relicGroup.add(urnMesh);

    // Ambient Ring / Geometric Sanskrit Pedestal
    const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc29b38, transparent: true, opacity: 0.4 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.85;
    relicGroup.add(ringMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x842a1c, 2.0);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ambient slow rotation
      relicGroup.rotation.y = elapsedTime * 0.4 + (mouseX - relicGroup.rotation.y) * 0.05;
      relicGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08 + (mouseY - relicGroup.rotation.x) * 0.05;

      ringMesh.rotation.z = -elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      latheGeometry.dispose();
      relicMaterial.dispose();
      renderer.dispose();
    };
  }, [materialType]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#141312]/80 backdrop-blur-sm border border-[#C29B38]/40 rounded-full text-[10px] tracking-widest text-[#EBE5DC] uppercase font-mono">
        Jaipur Glazed Quartz Relic • 3D View
      </div>
    </div>
  );
}
