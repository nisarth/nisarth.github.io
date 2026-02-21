/* ============================================================
   NISARTH PATEL — THREE.JS BACKGROUND
   Animated particle field for hero section
   ============================================================ */

(function () {
    'use strict';

    function isMobile() {
        return (navigator.hardwareConcurrency < 4) ||
            /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    }

    function initThreeBackground() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        if (isMobile() || typeof THREE === 'undefined') {
            canvas.style.display = 'none';
            const fallback = document.querySelector('.bg-gradient-fallback');
            if (fallback) fallback.style.display = 'block';
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        camera.position.z = 80;

        // ── Particle System ──
        const PARTICLE_COUNT = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        const accentColor = new THREE.Color(0x00F5FF);
        const whiteColor = new THREE.Color(0xFFFFFF);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 120;
            positions[i3 + 2] = (Math.random() - 0.5) * 80;

            const mixFactor = Math.random();
            const particleColor = accentColor.clone().lerp(whiteColor, mixFactor);
            colors[i3] = particleColor.r;
            colors[i3 + 1] = particleColor.g;
            colors[i3 + 2] = particleColor.b;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // ── Geometric wireframe ──
        const torusGeo = new THREE.TorusGeometry(25, 8, 8, 32);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00F5FF,
            wireframe: true,
            opacity: 0.05,
            transparent: true,
        });
        const torus = new THREE.Mesh(torusGeo, wireMat);
        torus.position.set(50, -10, -30);
        scene.add(torus);

        const icoGeo = new THREE.IcosahedronGeometry(15, 1);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0x00F5FF,
            wireframe: true,
            opacity: 0.04,
            transparent: true,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        ico.position.set(-50, 10, -20);
        scene.add(ico);

        // ── Mouse interaction ──
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // ── Resize ──
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // ── Animation Loop ──
        let frame = 0;
        function animate() {
            requestAnimationFrame(animate);
            frame += 0.005;

            // Smooth mouse follow
            targetX += (mouseX - targetX) * 0.03;
            targetY += (mouseY - targetY) * 0.03;

            particles.rotation.y = frame * 0.05 + targetX * 0.3;
            particles.rotation.x = frame * 0.02 + targetY * 0.15;

            torus.rotation.x = frame * 0.4;
            torus.rotation.y = frame * 0.2;

            ico.rotation.x = frame * 0.3;
            ico.rotation.z = frame * 0.2;

            renderer.render(scene, camera);
        }

        animate();
    }

    // Wait until Three.js is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThreeBackground);
    } else {
        initThreeBackground();
    }

})();
