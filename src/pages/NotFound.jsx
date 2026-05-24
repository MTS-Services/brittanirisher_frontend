import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config';

/* ─────────────────────────────────────────────
   Petal data — each petal has random properties
   generated once on mount
   ───────────────────────────────────────────── */
const PETAL_SYMBOLS = ['✿', '❀', '✾', '❁', '⚘', '✽'];
function makePetals(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    symbol: PETAL_SYMBOLS[i % PETAL_SYMBOLS.length],
    left: 5 + Math.random() * 90,
    size: 11 + Math.random() * 10,
    dur: 5 + Math.random() * 5,
    delay: Math.random() * 8,
    rotate: 120 + Math.random() * 360,
    drift: -30 + Math.random() * 60,
    opacity: 0.35 + Math.random() * 0.45,
  }));
}

const PETALS = makePetals(18);

/* ─────────────────────────────────────────────
   Sparkle dots that orbit the 404 number
   ───────────────────────────────────────────── */
const SPARKLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  angle: i * 60,
  r: 64 + (i % 2) * 14,
  size: 3 + (i % 3),
  dur: 4 + i * 0.4,
}));

const NotFound = memo(() => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  /* trigger staggered CSS animations after mount */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  /* subtle grain canvas overlay */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    function drawGrain() {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 12;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(drawGrain);
    }
    drawGrain();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Page ── */
        .nf-page {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f5ede3;
          padding: 40px 16px;
          font-family: 'Raleway', sans-serif;
        }

        /* ── Grain overlay ── */
        .nf-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }

        /* ── Colour blobs ── */
        .nf-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(64px);
        }
        .nf-blob-1 {
          width: 340px; height: 340px;
          top: -80px; left: -80px;
          background: radial-gradient(circle, #e4c9ae 0%, transparent 70%);
          animation: blobDrift1 12s ease-in-out infinite alternate;
        }
        .nf-blob-2 {
          width: 400px; height: 400px;
          bottom: -100px; right: -80px;
          background: radial-gradient(circle, #cddbd0 0%, transparent 70%);
          animation: blobDrift2 15s ease-in-out infinite alternate;
        }
        .nf-blob-3 {
          width: 200px; height: 200px;
          top: 45%; left: 60%;
          background: radial-gradient(circle, #d9c5b4 0%, transparent 70%);
          animation: blobDrift3 9s ease-in-out infinite alternate;
          opacity: 0.6;
        }

        @keyframes blobDrift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 40px) scale(1.1); }
        }
        @keyframes blobDrift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-40px, -30px) scale(1.12); }
        }
        @keyframes blobDrift3 {
          from { transform: translate(0, 0); }
          to   { transform: translate(20px, -24px); }
        }

        /* ── Falling petals ── */
        .nf-petals {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }
        .nf-petal {
          position: absolute;
          top: -40px;
          animation: petalFall linear infinite;
          will-change: transform, opacity;
        }
        @keyframes petalFall {
          0%   { opacity: 0;    transform: translateY(-40px)  translateX(0px)   rotate(0deg)   scale(0.5); }
          8%   { opacity: 1; }
          85%  { opacity: 0.7; }
          100% { opacity: 0;    transform: translateY(110vh)  translateX(var(--drift)) rotate(var(--rotate)) scale(1.1); }
        }

        /* ── Main card ── */
        .nf-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 500px;
          background: rgba(255, 252, 248, 0.88);
          border: 1px solid rgba(196, 166, 136, 0.35);
          border-radius: 24px;
          padding: 52px 44px 48px;
          text-align: center;
          backdrop-filter: blur(16px) saturate(1.3);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.9) inset,
            0 24px 64px rgba(47, 36, 26, 0.1),
            0 4px 16px rgba(47, 36, 26, 0.06);

          /* card entrance */
          opacity: 0;
          transform: translateY(-56px) scale(0.96);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .nf-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* thin top shine */
        .nf-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(160deg, rgba(255,255,255,0.6) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Brand row ── */
        .nf-brand {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin-bottom: 28px;
          opacity: 0; transform: translateY(-20px);
          transition: opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease;
        }
        .nf-card.visible .nf-brand { opacity: 1; transform: translateY(0); }
        .nf-brand-line {
          flex: 1; max-width: 72px; height: 1px;
          background: linear-gradient(90deg, transparent, #c4a688 50%, transparent);
        }
        .nf-brand-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a07850;
          font-style: italic;
        }

        /* ── Error label ── */
        .nf-label {
          font-family: 'Raleway', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #9b8a7a;
          opacity: 0; transform: translateY(-16px);
          transition: opacity 0.55s 0.3s ease, transform 0.55s 0.3s ease;
        }
        .nf-card.visible .nf-label { opacity: 1; transform: translateY(0); }

        /* ── 404 number ── */
        .nf-number-wrap {
          position: relative;
          display: inline-block;
          margin: 10px 0 6px;
          opacity: 0; transform: translateY(-32px) scale(0.92);
          transition: opacity 0.75s 0.44s cubic-bezier(0.22,1,0.36,1),
                      transform 0.75s 0.44s cubic-bezier(0.22,1,0.36,1);
        }
        .nf-card.visible .nf-number-wrap { opacity: 1; transform: translateY(0) scale(1); }

        .nf-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 20vw, 108px);
          line-height: 1;
          color: #2f241a;
          letter-spacing: -4px;
          position: relative;
          z-index: 2;
        }
        .nf-number .accent {
          font-style: italic;
          color: #a07850;
          display: inline-block;
          animation: accentFloat 4s ease-in-out infinite;
        }
        @keyframes accentFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }

        /* ghost/shadow 404 */
        .nf-number-ghost {
          position: absolute;
          inset: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 20vw, 108px);
          line-height: 1;
          letter-spacing: -4px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(160, 120, 80, 0.15);
          transform: translate(6px, 8px);
          z-index: 1;
          pointer-events: none;
          font-style: italic;
          animation: ghostPulse 5s ease-in-out infinite;
        }
        @keyframes ghostPulse {
          0%,100% { opacity: 0.5; transform: translate(6px, 8px); }
          50%      { opacity: 1;   transform: translate(9px, 12px); }
        }

        /* orbiting sparkle dots */
        .nf-sparkles {
          position: absolute;
          inset: -20px;
          pointer-events: none;
          z-index: 3;
        }
        .nf-sparkle {
          position: absolute;
          border-radius: 50%;
          background: #c4a688;
          animation: orbitSparkle linear infinite;
          transform-origin: center center;
        }
        @keyframes orbitSparkle {
          from { transform: rotate(var(--start)) translateX(var(--r)) rotate(calc(-1 * var(--start))); opacity: 0.9; }
          50%  { opacity: 0.3; }
          to   { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--r)) rotate(calc(-1 * (var(--start) + 360deg))); opacity: 0.9; }
        }

        /* ── Heading ── */
        .nf-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 5vw, 26px);
          font-weight: 400;
          color: #2f241a;
          margin-top: 10px;
          opacity: 0; transform: translateY(-14px);
          transition: opacity 0.6s 0.6s ease, transform 0.6s 0.6s ease;
        }
        .nf-card.visible .nf-heading { opacity: 1; transform: translateY(0); }

        /* ── Sub ── */
        .nf-sub {
          font-size: 14px;
          line-height: 1.8;
          color: #6d6258;
          margin: 10px auto 0;
          max-width: 340px;
          font-weight: 400;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s 0.72s ease, transform 0.6s 0.72s ease;
        }
        .nf-card.visible .nf-sub { opacity: 1; transform: translateY(0); }

        /* ── Ornament divider ── */
        .nf-ornament {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 26px auto;
          opacity: 0; transform: scaleX(0.5);
          transition: opacity 0.55s 0.85s ease, transform 0.55s 0.85s ease;
        }
        .nf-card.visible .nf-ornament { opacity: 1; transform: scaleX(1); }
        .nf-ornament-line {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, #c4a688, transparent);
        }
        .nf-ornament-center {
          display: flex; align-items: center; gap: 6px;
          color: #c4a688; font-size: 14px; letter-spacing: 6px;
        }

        /* ── CTA Button ── */
        .nf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #2f241a;
          color: #f5ede3;
          border: none;
          border-radius: 100px;
          padding: 15px 36px;
          font-family: 'Raleway', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;

          opacity: 0; transform: translateY(16px);
          animation: none;
          transition:
            opacity 0.6s 1s ease,
            transform 0.6s 1s ease,
            box-shadow 0.25s ease;
        }
        .nf-card.visible .nf-btn {
          opacity: 1; transform: translateY(0);
          transition:
            opacity 0.6s 1s ease,
            transform 0.6s 1s ease,
            box-shadow 0.25s ease;
        }
        .nf-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .nf-btn:hover::before { transform: translateX(100%); }
        .nf-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(47,36,26,0.25);
        }
        .nf-btn:active { transform: translateY(-1px) scale(0.98); }

        .nf-btn-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
          font-size: 16px;
        }
        .nf-btn:hover .nf-btn-arrow { transform: translateX(5px); }

        /* ── Footer hint ── */
        .nf-hint {
          margin-top: 20px;
          font-size: 12px;
          color: #a89080;
          letter-spacing: 0.03em;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.5s 1.15s ease, transform 0.5s 1.15s ease;
        }
        .nf-card.visible .nf-hint { opacity: 1; transform: translateY(0); }
        .nf-hint a {
          color: #8b7a67;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .nf-hint a:hover { color: #a07850; }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .nf-card { padding: 38px 24px 36px; }
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .nf-petal,
          .nf-sparkle,
          .nf-blob,
          .accent,
          .nf-number-ghost { animation: none !important; }
          .nf-card,
          .nf-brand,
          .nf-label,
          .nf-number-wrap,
          .nf-heading,
          .nf-sub,
          .nf-ornament,
          .nf-btn,
          .nf-hint {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section className="nf-page">
        {/* grain */}
        <canvas ref={canvasRef} className="nf-grain" aria-hidden="true" />

        {/* blobs */}
        <div className="nf-blob nf-blob-1" aria-hidden="true" />
        <div className="nf-blob nf-blob-2" aria-hidden="true" />
        <div className="nf-blob nf-blob-3" aria-hidden="true" />

        {/* falling petals */}
        <div className="nf-petals" aria-hidden="true">
          {PETALS.map(p => (
            <div
              key={p.id}
              className="nf-petal"
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                color: `rgba(160,120,80,${p.opacity})`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                '--drift': `${p.drift}px`,
                '--rotate': `${p.rotate}deg`,
              }}
            >
              {p.symbol}
            </div>
          ))}
        </div>

        {/* card */}
        <div className={`nf-card${mounted ? ' visible' : ''}`} role="main">

          {/* brand */}
          <div className="nf-brand">
            <div className="nf-brand-line" />
            <span className="nf-brand-text">Vow &amp; Vendor</span>
            <div className="nf-brand-line" />
          </div>

          {/* label */}
          <p className="nf-label">Error</p>

          {/* 404 */}
          <div className="nf-number-wrap" aria-label="404">
            <div className="nf-number-ghost" aria-hidden="true">404</div>

            {/* orbiting sparkles */}
            <svg className="nf-sparkles" viewBox="0 0 200 120" aria-hidden="true">
              {SPARKLES.map(s => (
                <circle
                  key={s.id}
                  className="nf-sparkle"
                  cx="50%"
                  cy="50%"
                  r={s.size / 2}
                  style={{
                    '--start': `${s.angle}deg`,
                    '--r': `${s.r}px`,
                    animationDuration: `${s.dur}s`,
                    animationDelay: `${s.id * 0.5}s`,
                    transformOrigin: '50% 50%',
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    marginLeft: `-${s.size / 2}px`,
                    marginTop: `-${s.size / 2}px`,
                    top: '50%',
                    left: '50%',
                  }}
                />
              ))}
            </svg>

            <div className="nf-number">
              <span className="accent">4</span>
              0
              <span className="accent">4</span>
            </div>
          </div>

          {/* heading */}
          <h1 className="nf-heading">Page not found</h1>

          {/* sub */}
          <p className="nf-sub">
            The page you're looking for doesn't exist or may have been moved.
            Let's guide you back.
          </p>

          {/* ornament */}
          <div className="nf-ornament" aria-hidden="true">
            <div className="nf-ornament-line" />
            <div className="nf-ornament-center">
              <span>✦</span><span style={{ fontSize: 10 }}>✦</span><span>✦</span>
            </div>
            <div className="nf-ornament-line" />
          </div>

          {/* CTA */}
          <Link to={ROUTES.HOME} className="nf-btn">
            Back to Home
            <span className="nf-btn-arrow">→</span>
          </Link>

          {/* hint */}
          <p className="nf-hint">
            Need help?{' '}
            <Link to="/contact">Contact support</Link>
          </p>
        </div>
      </section>
    </>
  );
});

NotFound.displayName = 'NotFound';
export default NotFound;