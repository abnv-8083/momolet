import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.png';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Set initial states explicitly
    gsap.set(logoRef.current, { opacity: 0, scale: 0.6 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(progressBarRef.current, { width: '0%' });

    tl
      // Logo pops in
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
      })
      // Tagline slides up
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, '-=0.3')
      // Progress bar fills
      .to(progressBarRef.current, {
        width: '100%',
        duration: 1.6,
        ease: 'power1.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      }, '-=0.1')
      // Hold briefly at 100%
      .to({}, { duration: 0.4 })
      // Logo pulses
      .to(logoRef.current, {
        scale: 1.08,
        duration: 0.25,
        ease: 'power2.in',
      })
      // Fade out entire loader
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#1a0a0e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,16,34,0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Logo image */}
      <div
        ref={logoRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <img
          src={logo}
          alt="MOMOLET"
          style={{
            width: '160px',
            height: '160px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 32px rgba(127,16,34,0.6))',
          }}
        />
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          color: '#f5f0e8',
          letterSpacing: '0.2em',
          lineHeight: 1,
        }}>
          MOMOLET
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          color: 'rgba(241,210,112,0.7)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Fresh · Bold · Magic
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '180px' }}>
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(245,240,232,0.1)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}>
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #7f1022, #f1d270)',
              borderRadius: '9999px',
            }}
          />
        </div>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          color: 'rgba(245,240,232,0.3)',
          letterSpacing: '0.1em',
        }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}
