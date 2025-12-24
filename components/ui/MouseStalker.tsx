'use client';

import { useEffect, useRef } from 'react';

// Particle configuration
const PARTICLE_COUNT = 3; // Particles generated per frame/event
const MAX_PARTICLES = 150;
const COLORS = [
    'rgba(255, 255, 255, 0.8)', // White
    'rgba(255, 255, 255, 0.6)', // White slightly transparent
    'rgba(255, 255, 255, 0.9)', // White
];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
    decay: number;
}

const MouseStalker = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const cursorRef = useRef({ x: -100, y: -100, radius: 20, color: 'rgba(255, 255, 255, 0.3)' }); // Interpolated cursor
    const mouseRef = useRef({ x: -100, y: -100 }); // Actual mouse position
    const hoverRef = useRef(false); // Hover state tracking
    const requestRef = useRef<number>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize(); // Initial size
        window.addEventListener('resize', handleResize);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;

            // Initialize cursor pos on first move if off-screen/unset
            if (cursorRef.current.x < 0) {
                cursorRef.current.x = mouseRef.current.x;
                cursorRef.current.y = mouseRef.current.y;
            }
        };

        // Hover detection
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                hoverRef.current = true;
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            hoverRef.current = false;
        };

        const createParticles = (x: number, y: number, count: number) => {
            for (let i = 0; i < count; i++) {
                if (particlesRef.current.length >= MAX_PARTICLES) {
                    particlesRef.current.shift(); // Remove oldest
                }
                particlesRef.current.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 2 + 1,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    life: 1.0,
                    decay: Math.random() * 0.02 + 0.01,
                });
            }
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Interpolate cursor position (LERP)
            // Factor 0.15 gives a nice smooth delayed follow effect
            const lerpFactor = 0.15;
            cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * lerpFactor;
            cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * lerpFactor;

            // Interpolate Radius and Color for Hover Effect
            const targetRadius = hoverRef.current ? 30 : 20; // 60px vs 40px diameter
            const radiusLerp = 0.1;
            cursorRef.current.radius += (targetRadius - cursorRef.current.radius) * radiusLerp;

            // Simplified Color Transition (White -> Cyber Blue)
            // Using rgba interpolation logic could be complex, switching based on state for simplicity or simple alpha fade

            let strokeColor = 'rgba(255, 255, 255, 0.3)';
            let lineWidth = 2.0;

            if (hoverRef.current) {
                strokeColor = 'rgba(255, 255, 255, 0.8)'; // White (brighter on hover)
                lineWidth = 3.0;
            }

            // Draw Custom Cursor (Circle)
            ctx.beginPath();
            ctx.arc(cursorRef.current.x, cursorRef.current.y, cursorRef.current.radius, 0, Math.PI * 2);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            // Generate particles from the CURSOR position, not mouse position
            // Only generate if cursor is on screen
            if (cursorRef.current.x > 0 && cursorRef.current.y > 0) {
                createParticles(cursorRef.current.x, cursorRef.current.y, PARTICLE_COUNT);
            }

            // Update and draw particles
            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Decay
                p.life -= p.decay;

                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1);
                    i--;
                    continue;
                }

                // Draw
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
        />
    );
};

export default MouseStalker;
