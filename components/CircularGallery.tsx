"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import React, { useEffect, useRef } from "react";
import "./CircularGallery.css";

export interface GalleryItem {
  image: string;
  text?: string;
}

export interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

class Media {
  extra = 0;
  geometry: Plane;
  gl: Renderer["gl"];
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  bend: number;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  speed = 0;
  isBefore = false;
  isAfter = false;
  scale = 1;
  padding = 2;
  width = 0;
  widthTotal = 0;
  x = 0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    borderRadius = 0.06,
  }: {
    geometry: Plane;
    gl: Renderer["gl"];
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
    bend: number;
    borderRadius?: number;
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 3.5 + uTime) * 1.2 + cos(p.y * 1.8 + uTime) * 1.2) * (0.08 + uSpeed * 0.35);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          vec2 p = vUv - vec2(0.5);
          vec2 b = vec2(0.5) - vec2(uBorderRadius);
          float dist = roundedBoxSDF(p, b, uBorderRadius);
          float alpha = 1.0 - smoothstep(0.0, 0.005, dist);
          
          gl_FragColor = vec4(color.rgb, alpha * color.a);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 0 },
        uBorderRadius: { value: this.borderRadius },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
      },
      transparent: true,
    });
    const img = new Image();
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  update(
    scroll: { current: number; last: number },
    direction: "right" | "left"
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.max(0.01, Math.abs(this.bend));
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const sqrtTerm = Math.max(0, R * R - effectiveX * effectiveX);
      const arc = R - Math.sqrt(sqrtTerm);
      const asinVal = Math.min(0.999, Math.max(-0.999, effectiveX / R));

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(asinVal);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(asinVal);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.03;
    this.program.uniforms.uSpeed.value = Math.min(Math.abs(this.speed), 0.4);

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2 + this.padding * 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({
    screen,
    viewport,
  }: {
    screen?: { width: number; height: number };
    viewport?: { width: number; height: number };
  } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    if (!this.screen || !this.viewport) return;

    const isMobile = this.screen.width < 768;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * ((isMobile ? 1200 : 920) * this.scale)) / Math.max(1, this.screen.height);
    this.plane.scale.x =
      (this.viewport.width * ((isMobile ? 960 : 720) * this.scale)) / Math.max(1, this.screen.width);
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = isMobile ? 1.4 : 2.2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  container: HTMLDivElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: () => void;
  renderer!: Renderer;
  gl!: Renderer["gl"];
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  mediasImages!: GalleryItem[];
  medias!: Media[];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  isDown = false;
  start = 0;
  lastTouchX = 0;
  lastTouchTime = 0;
  touchVelocity = 0;
  raf = 0;
  resizeObserver?: ResizeObserver;
  boundOnResize!: () => void;
  boundOnWheel!: (e: WheelEvent) => void;
  boundOnTouchDown!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchMove!: (e: TouchEvent | MouseEvent) => void;
  boundOnTouchUp!: () => void;
  boundOnKeyDown!: (e: KeyboardEvent) => void;

  constructor(
    container: HTMLDivElement,
    {
      items,
      bend = 2.5,
      borderRadius = 0.06,
      scrollSpeed = 3,
      scrollEase = 0.06,
    }: {
      items: GalleryItem[];
      bend?: number;
      borderRadius?: number;
      scrollSpeed?: number;
      scrollEase?: number;
    }
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 180);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    this.renderer = new Renderer({
      alpha: true,
      antialias: !isMobile,
      dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, isMobile ? 1.5 : 2),
      powerPreference: "high-performance",
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    // Optimized tessellation: 10x20 segments provides smooth low-frequency bending with minimal vertex overhead
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 10,
      widthSegments: 20,
    });
  }

  createMedias(items: GalleryItem[], bend = 2.5, borderRadius = 0.06) {
    // Repeat items 4 times (16 items) for completely smooth, infinite wrapping without popping
    this.mediasImages = [...items, ...items, ...items, ...items];
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
      });
    });
  }

  onTouchDown(e: TouchEvent | MouseEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const touch = "touches" in e ? (e.touches[0] || (e as TouchEvent).changedTouches?.[0]) : null;
    const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
    this.start = clientX;
    this.lastTouchX = clientX;
    this.lastTouchTime = performance.now();
    this.touchVelocity = 0;

    // Attach active drag listeners to window only when drag begins (Item 2.2)
    if (!("touches" in e)) {
      window.addEventListener("mousemove", this.boundOnTouchMove);
      window.addEventListener("mouseup", this.boundOnTouchUp);
    }
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (!this.isDown) return;
    const touch = "touches" in e ? (e.touches[0] || (e as TouchEvent).changedTouches?.[0]) : null;
    const x = touch ? touch.clientX : (e as MouseEvent).clientX;
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

    // Reduced sensitivity for calm, controlled dragging on both mobile and desktop
    const dragSensitivity = isMobile ? this.scrollSpeed * 0.045 : this.scrollSpeed * 0.010;
    const distance = (this.start - x) * dragSensitivity;

    const now = performance.now();
    const dt = Math.max(1, now - (this.lastTouchTime || now));
    this.touchVelocity = (this.lastTouchX - x) / dt;
    this.lastTouchX = x;
    this.lastTouchTime = now;

    this.scroll.target = (this.scroll.position || 0) + distance;
  }

  onTouchUp() {
    if (!this.isDown) return;
    this.isDown = false;

    // Remove active drag listeners from window when drag completes (Item 2.2)
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);

    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

    // Controlled momentum glide on release
    if (Math.abs(this.touchVelocity) > 0.1) {
      const momentumMultiplier = isMobile ? 15 : 3;
      this.scroll.target += this.touchVelocity * this.scrollSpeed * momentumMultiplier;
    }

    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as unknown as { wheelDelta?: number }).wheelDelta || e.detail;
    if (Math.abs(delta) > 3) {
      // Gentle wheel scrolling
      this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.04;
      this.onCheckDebounce();
    }
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case "ArrowLeft":
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case "Home":
        e.preventDefault();
        this.scroll.target = 0;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    if (width <= 0) return;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    if (!this.container) return;
    const clientW = this.container.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 800);
    const clientH = this.container.clientHeight || 450;
    this.screen = {
      width: Math.max(10, clientW),
      height: Math.max(10, clientH),
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  isPaused = false;

  pause() {
    this.isPaused = true;
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    if (!this.raf) {
      this.update();
    }
  }

  update() {
    if (this.isPaused) return;
    // Dynamic ease: direct tracking when dragging, fluid glide on momentum
    const currentEase = this.isDown ? 0.18 : this.scroll.ease;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, currentEase);
    const direction = this.scroll.current >= this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("orientationchange", this.boundOnResize);
    
    // Attach initial mousedown & touchstart handlers to container
    this.container?.addEventListener("mousedown", this.boundOnTouchDown);
    this.container?.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundOnTouchUp);

    this.container?.addEventListener("wheel", this.boundOnWheel, { passive: true });
    this.container?.addEventListener("keydown", this.boundOnKeyDown);

    if (typeof ResizeObserver !== "undefined" && this.container) {
      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(this.container);
    }
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.cancelAnimationFrame(this.raf);
      window.removeEventListener("resize", this.boundOnResize);
      window.removeEventListener("orientationchange", this.boundOnResize);
      window.removeEventListener("mousemove", this.boundOnTouchMove);
      window.removeEventListener("mouseup", this.boundOnTouchUp);
      window.removeEventListener("touchmove", this.boundOnTouchMove);
      window.removeEventListener("touchend", this.boundOnTouchUp);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.container) {
      this.container.removeEventListener("mousedown", this.boundOnTouchDown);
      this.container.removeEventListener("touchstart", this.boundOnTouchDown);
      this.container.removeEventListener("wheel", this.boundOnWheel);
      this.container.removeEventListener("keydown", this.boundOnKeyDown);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 2.5,
  borderRadius = 0.06,
  scrollSpeed = 3.2,
  scrollEase = 0.06,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let app: App | null = null;

    app = new App(containerRef.current, {
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
    });

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!app) return;
          if (entry.isIntersecting) {
            app.resume();
          } else {
            app.pause();
          }
        },
        { threshold: 0.02, rootMargin: "150px 0px" }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (app) app.destroy();
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Interactive 3D image gallery. Drag or scroll to rotate."
    />
  );
}
