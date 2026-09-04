'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CraftRelic3DProps {
  materialType?: 'terracotta' | 'bronze' | 'glazed_blue';
}

// Generate high-resolution procedural Indian craft ornamental texture & bump map
function generateCraftTextures(materialType: 'terracotta' | 'bronze' | 'glazed_blue') {
  const width = 1024;
  const height = 1024;

  // Diffuse Canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Bump Canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d');

  if (!ctx || !bumpCtx) return { texture: null, bumpTexture: null };

  // 1. Base Tone Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  if (materialType === 'glazed_blue') {
    grad.addColorStop(0, '#0F2B48');
    grad.addColorStop(0.5, '#194572');
    grad.addColorStop(1, '#0A1C30');
  } else if (materialType === 'bronze') {
    grad.addColorStop(0, '#8A6827');
    grad.addColorStop(0.5, '#B8860B');
    grad.addColorStop(1, '#684E18');
  } else {
    grad.addColorStop(0, '#8C3826');
    grad.addColorStop(0.5, '#A84832');
    grad.addColorStop(1, '#652316');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, width, height);

  // 2. Ornamental Colors
  const gold = '#E5C158';
  const goldDark = '#B8860B';
  const turquoise = '#2DD4BF';
  const ruby = '#E11D48';
  const ivory = '#FDF6E2';

  // Helper to draw repeating horizontal motifs
  const drawBand = (y: number, h: number, drawUnit: (cx: number, cy: number, uW: number) => void, repeat = 16) => {
    const unitW = width / repeat;
    for (let i = 0; i < repeat; i++) {
      const cx = i * unitW + unitW / 2;
      const cy = y + h / 2;
      drawUnit(cx, cy, unitW);
    }
  };

  // Border Gold Rules
  const drawRule = (y: number, strokeW = 4, isGold = true) => {
    ctx.strokeStyle = isGold ? gold : ivory;
    ctx.lineWidth = strokeW;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    bumpCtx.strokeStyle = '#FFFFFF';
    bumpCtx.lineWidth = strokeW;
    bumpCtx.beginPath();
    bumpCtx.moveTo(0, y);
    bumpCtx.lineTo(width, y);
    bumpCtx.stroke();
  };

  // Top Neck Rim Frieze (Y: 40 - 110)
  drawRule(40, 3);
  drawBand(45, 60, (cx, cy, uW) => {
    // Diamond lattice with gold center
    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 20);
    ctx.lineTo(cx + uW * 0.4, cy);
    ctx.lineTo(cx, cy + 20);
    ctx.lineTo(cx - uW * 0.4, cy);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = materialType === 'glazed_blue' ? turquoise : ruby;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.fillStyle = '#FFFFFF';
    bumpCtx.beginPath();
    bumpCtx.arc(cx, cy, 6, 0, Math.PI * 2);
    bumpCtx.fill();
  }, 20);
  drawRule(110, 3);

  // Upper Neck Beads (Y: 160 - 220)
  drawRule(160, 2);
  drawBand(165, 50, (cx, cy) => {
    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = ivory;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.fillStyle = '#FFFFFF';
    bumpCtx.beginPath();
    bumpCtx.arc(cx, cy, 8, 0, Math.PI * 2);
    bumpCtx.fill();
  }, 24);
  drawRule(220, 2);

  // Upper Shoulder Sacred Lotus Petal Arcade (Y: 270 - 410)
  drawRule(270, 4);
  drawBand(280, 120, (cx, cy, uW) => {
    // Lotus Petal Arch
    ctx.strokeStyle = gold;
    ctx.lineWidth = 4;
    ctx.fillStyle = materialType === 'glazed_blue' ? '#0B2545' : '#5A1F13';
    ctx.beginPath();
    ctx.moveTo(cx - uW * 0.45, cy + 50);
    ctx.quadraticCurveTo(cx, cy - 50, cx + uW * 0.45, cy + 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner Lotus Gold Vein
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 45);
    ctx.lineTo(cx, cy - 35);
    ctx.stroke();

    // Lotus Core Gem / Bead
    ctx.fillStyle = goldDark;
    ctx.beginPath();
    ctx.arc(cx, cy + 10, 7, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.strokeStyle = '#FFFFFF';
    bumpCtx.lineWidth = 5;
    bumpCtx.beginPath();
    bumpCtx.moveTo(cx - uW * 0.45, cy + 50);
    bumpCtx.quadraticCurveTo(cx, cy - 50, cx + uW * 0.45, cy + 50);
    bumpCtx.stroke();
  }, 14);
  drawRule(410, 4);

  // Main Central Belly Mandala Medallion Frieze (Y: 460 - 740)
  drawRule(460, 5);
  drawRule(472, 2);
  drawBand(480, 240, (cx, cy, uW) => {
    const radius = uW * 0.42;

    // Outer Mandala Ring
    ctx.strokeStyle = gold;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 8-Petal Rosette / Flower of Life
    for (let a = 0; a < 8; a++) {
      const angle = (a * Math.PI) / 4;
      const px = cx + Math.cos(angle) * (radius * 0.55);
      const py = cy + Math.sin(angle) * (radius * 0.55);

      ctx.fillStyle = materialType === 'glazed_blue' ? turquoise : gold;
      ctx.beginPath();
      ctx.arc(px, py, radius * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = goldDark;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Center Gold Core
    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = materialType === 'glazed_blue' ? '#0F2B48' : '#7F1D1D';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // Bump Map embossed core
    bumpCtx.fillStyle = '#FFFFFF';
    bumpCtx.beginPath();
    bumpCtx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
    bumpCtx.fill();
  }, 10);
  drawRule(730, 2);
  drawRule(742, 5);

  // Lower Waist Chevron & Diamond Frieze (Y: 790 - 870)
  drawRule(790, 3);
  drawBand(800, 60, (cx, cy, uW) => {
    ctx.strokeStyle = gold;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - uW * 0.5, cy + 25);
    ctx.lineTo(cx, cy - 25);
    ctx.lineTo(cx + uW * 0.5, cy + 25);
    ctx.stroke();

    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.strokeStyle = '#FFFFFF';
    bumpCtx.lineWidth = 3;
    bumpCtx.beginPath();
    bumpCtx.moveTo(cx - uW * 0.5, cy + 25);
    bumpCtx.lineTo(cx, cy - 25);
    bumpCtx.lineTo(cx + uW * 0.5, cy + 25);
    bumpCtx.stroke();
  }, 18);
  drawRule(870, 3);

  // Base Pedestal Stepped Relief (Y: 920 - 990)
  drawRule(920, 4);
  drawBand(925, 60, (cx, cy, uW) => {
    ctx.fillStyle = gold;
    ctx.fillRect(cx - uW * 0.35, cy - 18, uW * 0.7, 36);
    ctx.fillStyle = ivory;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.fillStyle = '#FFFFFF';
    bumpCtx.fillRect(cx - uW * 0.35, cy - 18, uW * 0.7, 36);
  }, 16);
  drawRule(990, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

  return { texture, bumpTexture };
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
    camera.position.z = 4.6;
    camera.position.y = 0.45;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for object
    const relicGroup = new THREE.Group();
    scene.add(relicGroup);

    // Create Classical Indian Craft Urn Geometry (Lathe profile)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, 0.0));
    points.push(new THREE.Vector2(0.52, 0.06));
    points.push(new THREE.Vector2(0.72, 0.28));
    points.push(new THREE.Vector2(0.92, 0.65));
    points.push(new THREE.Vector2(0.98, 0.95));
    points.push(new THREE.Vector2(0.82, 1.25));
    points.push(new THREE.Vector2(0.46, 1.48));
    points.push(new THREE.Vector2(0.38, 1.62));
    points.push(new THREE.Vector2(0.48, 1.72));
    points.push(new THREE.Vector2(0.45, 1.78));
    points.push(new THREE.Vector2(0.34, 1.78));

    const latheGeometry = new THREE.LatheGeometry(points, 64);

    // Procedural Textures
    const { texture, bumpTexture } = generateCraftTextures(materialType);

    // Material Shaders based on craft tradition
    let relicMaterial: THREE.Material;
    const goldRingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4af37),
      metalness: 0.92,
      roughness: 0.2,
    });

    if (materialType === 'glazed_blue') {
      // Jaipur Royal Blue Pottery with Glazed Luster & Gold Relief
      relicMaterial = new THREE.MeshPhysicalMaterial({
        map: texture || undefined,
        bumpMap: bumpTexture || undefined,
        bumpScale: 0.04,
        roughness: 0.18,
        metalness: 0.12,
        clearcoat: 0.95,
        clearcoatRoughness: 0.1,
        reflectivity: 0.85,
      });
    } else if (materialType === 'bronze') {
      // Bastar Dhokra Lost-Wax Bell Metal
      relicMaterial = new THREE.MeshStandardMaterial({
        map: texture || undefined,
        bumpMap: bumpTexture || undefined,
        bumpScale: 0.06,
        color: new THREE.Color(0xb88e36),
        roughness: 0.35,
        metalness: 0.88,
      });
    } else {
      // Kutch Earthen Fired Clay with White Lippan relief
      relicMaterial = new THREE.MeshStandardMaterial({
        map: texture || undefined,
        bumpMap: bumpTexture || undefined,
        bumpScale: 0.05,
        roughness: 0.72,
        metalness: 0.08,
      });
    }

    const urnMesh = new THREE.Mesh(latheGeometry, relicMaterial);
    urnMesh.position.y = -0.85;
    relicGroup.add(urnMesh);

    // 24k Gold Inlaid Relief Rings on Urn
    const neckRingGeo = new THREE.TorusGeometry(0.39, 0.02, 16, 48);
    const neckRingMesh = new THREE.Mesh(neckRingGeo, goldRingMaterial);
    neckRingMesh.rotation.x = Math.PI / 2;
    neckRingMesh.position.y = 0.76;
    relicGroup.add(neckRingMesh);

    const rimRingGeo = new THREE.TorusGeometry(0.47, 0.022, 16, 48);
    const rimRingMesh = new THREE.Mesh(rimRingGeo, goldRingMaterial);
    rimRingMesh.rotation.x = Math.PI / 2;
    rimRingMesh.position.y = 0.92;
    relicGroup.add(rimRingMesh);

    const waistRingGeo = new THREE.TorusGeometry(0.97, 0.018, 16, 64);
    const waistRingMesh = new THREE.Mesh(waistRingGeo, goldRingMaterial);
    waistRingMesh.rotation.x = Math.PI / 2;
    waistRingMesh.position.y = 0.1;
    relicGroup.add(waistRingMesh);

    // Concentric Celestial Base Ring with Dashed Geometry
    const ringGeo = new THREE.TorusGeometry(1.3, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.85;
    relicGroup.add(ringMesh);

    const outerRingGeo = new THREE.TorusGeometry(1.6, 0.012, 16, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0xc29b38, transparent: true, opacity: 0.3 });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    outerRingMesh.position.y = -0.85;
    relicGroup.add(outerRingMesh);

    // Floating Gold Mica Dust Particles System
    const particleCount = 90;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const y = -0.8 + Math.random() * 2.2;
      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = y;
      positions[i + 2] = Math.sin(theta) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    relicGroup.add(particles);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.0);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);

    const goldFillLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    goldFillLight.position.set(-3.5, 2.0, 2.0);
    scene.add(goldFillLight);

    const rimLight = new THREE.DirectionalLight(0x842a1c, 2.2);
    rimLight.position.set(0, -3.0, -3.0);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.6;
      mouseY = y * 0.9;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ambient slow majestic rotation with mouse influence
      relicGroup.rotation.y = elapsedTime * 0.35 + (mouseX - relicGroup.rotation.y) * 0.05;
      relicGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.06 + (mouseY - relicGroup.rotation.x) * 0.05;

      ringMesh.rotation.z = -elapsedTime * 0.25;
      outerRingMesh.rotation.z = elapsedTime * 0.15;
      particles.rotation.y = elapsedTime * 0.1;

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
      goldRingMaterial.dispose();
      neckRingGeo.dispose();
      rimRingGeo.dispose();
      waistRingGeo.dispose();
      ringGeo.dispose();
      outerRingGeo.dispose();
      ringMat.dispose();
      outerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (texture) texture.dispose();
      if (bumpTexture) bumpTexture.dispose();
      renderer.dispose();
    };
  }, [materialType]);

  return (
    <div className="relative w-full h-[320px] sm:h-[390px] flex items-center justify-center overflow-hidden rounded-xl">
      {/* Background Layer 1: Radiant Pulsing Cosmic Glow Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-[#8C3826]/25 to-[#0D9488]/20 blur-3xl animate-pulse-glow" />
      </div>

      {/* Background Layer 2: Rotating Sacred Geometry Sunburst Ring */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 sm:w-96 sm:h-96 text-[#D4AF37] animate-spin-slow-reverse"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="200" cy="200" r="180" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="150" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="120" />
          <polygon
            points="200,30 240,150 370,200 240,250 200,370 160,250 30,200 160,150"
            strokeDasharray="3 3"
          />
          <polygon
            points="200,60 230,160 340,200 230,240 200,340 170,240 60,200 170,160"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bottom Floating Relic Label */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#141312]/85 backdrop-blur-md border border-[#C29B38]/50 rounded-full text-[10px] tracking-widest text-[#EBE5DC] uppercase font-mono shadow-md flex items-center gap-1.5 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
        <span>
          {materialType === 'glazed_blue'
            ? 'Jaipur Cobalt & Gold Relief Urn'
            : materialType === 'bronze'
            ? 'Bastar Lost-Wax Bell Metal Urn'
            : 'Kutch Lippan Fired Clay Urn'}
        </span>
      </div>
    </div>
  );
}

