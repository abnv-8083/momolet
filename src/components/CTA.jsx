import { useEffect, useRef, useState } from 'react';
import { InstagramIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const decorRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content reveal
      gsap.from('.cta-content > *', {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Decorative food shapes
      gsap.from(decorRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Floating animation for decorative elements
      if (decorRef.current?.children) {
        Array.from(decorRef.current.children).forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -12 : 12,
            duration: 2 + i * 0.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-56 bg-[#2d0009] overflow-hidden scroll-mt-20 border-b border-[#f5f0e8]/10"
    >
      {/* Decorative food shapes */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        {/* Abstract circles and shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#7f1022]/30 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#f1d270]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-[#f1d270]/30" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#f5f0e8]/20" />
        <div className="absolute bottom-1/3 left-1/3 text-[#f1d270]/10 text-8xl font-display select-none">✦</div>
        <div className="absolute top-1/4 right-1/3 text-[#f5f0e8]/5 text-6xl font-display select-none">✦</div>
        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-display text-[22vw] text-[#7f1022]/10 whitespace-nowrap select-none leading-none">
            MOMOLET
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="cta-content"
        style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px', textAlign: 'center' }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(241,210,112,0.7)', marginBottom: '32px' }}>
          Don't keep your cravings waiting
        </p>

        <h2 className="font-display" style={{ fontSize: isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : 'clamp(3.5rem, 9vw, 8rem)', color: '#f5f0e8', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '40px' }}>
          YOUR<br />CRAVINGS<br />CALLED.
        </h2>

        <p className="font-serif" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: 'rgba(245,240,232,0.75)', fontStyle: 'italic', marginBottom: '56px', lineHeight: 1.5 }}>
          We think you know what to do.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '72px',
        }}>
          <a
            href="#menu"
            id="cta-explore-menu"
            onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary"
            style={{
              background: '#f1d270',
              color: '#2d0009',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              padding: '16px 40px',
              borderRadius: '9999px',
              fontSize: '15px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              width: isMobile ? '100%' : undefined,
              justifyContent: isMobile ? 'center' : undefined,
              display: isMobile ? 'flex' : undefined,
              alignItems: isMobile ? 'center' : undefined,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f1d270'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Explore Our Menu
          </a>
          <a
            href="https://www.instagram.com/momolet_official"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-instagram-link"
            style={{
              display: isMobile ? 'flex' : 'inline-flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : undefined,
              gap: '10px',
              border: '1px solid rgba(245,240,232,0.3)',
              color: '#f5f0e8',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              padding: '16px 40px',
              borderRadius: '9999px',
              fontSize: '15px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              width: isMobile ? '100%' : undefined,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.7)'; e.currentTarget.style.background = 'rgba(245,240,232,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.3)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <InstagramIcon size={18} />
            Follow MOMOLET
          </a>
        </div>

        {/* Outlet locations */}
        <div style={{ borderTop: '1px solid rgba(245,240,232,0.15)', paddingTop: '48px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(245,240,232,0.4)', marginBottom: '24px' }}>
            Find us at
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 32px' }}>
            {['Manjeri', 'Perinthalmanna', 'Nilambur', 'Kondotty (Coming Soon)'].map((loc, i) => (
              <span key={loc} style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: i === 3 ? 'rgba(241,210,112,0.6)' : 'rgba(245,240,232,0.7)', fontStyle: i === 3 ? 'italic' : 'normal' }}>
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
