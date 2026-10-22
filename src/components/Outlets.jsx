import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { outlets } from '../data';

gsap.registerPlugin(ScrollTrigger);

function OutletCard({ outlet, index }) {
  return (
    <div
      className={`outlet-card relative rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between shadow-xl transition-all duration-500 ${
        outlet.status === 'coming-soon'
          ? 'border-2 border-dashed border-[#7f1022]/50 bg-[#2d0009]/80'
          : 'border border-[#f5f0e8]/15 bg-[#2d0009]'
      }`}
      data-outlet-card
    >
      {/* Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={outlet.image}
          alt={`MOMOLET ${outlet.name} outlet`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d0009] via-[#2d0009]/40 to-transparent" />

        {/* Status badge */}
        {outlet.status === 'coming-soon' ? (
          <div className="coming-soon-badge absolute top-4 right-4 bg-[#f1d270] text-[#2d0009] text-[11px] font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
            Coming Soon
          </div>
        ) : (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-600/90 backdrop-blur-md text-white text-[11px] font-sans font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            Open
          </div>
        )}

        {/* Outlet number */}
        <div className="absolute bottom-3 left-5">
          <span className="font-display text-[#f1d270]/60 text-5xl leading-none">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, color: 'rgba(241,210,112,0.8)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
            {outlet.tagline}
          </p>
          <h3 className="font-display" style={{ fontSize: '28px', color: '#f5f0e8', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {outlet.name.toUpperCase()}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(245,240,232,0.65)', lineHeight: 1.6 }}>
            {outlet.description}
          </p>
        </div>

        <div>
          {/* Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '20px', marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid rgba(245,240,232,0.1)' }}>
            <MapPin size={14} style={{ color: '#f1d270', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(245,240,232,0.5)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {outlet.address}
            </span>
          </div>

          {/* Action */}
          {outlet.status === 'open' ? (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#f1d270', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
              onMouseLeave={e => e.currentTarget.style.color = '#f1d270'}
            >
              <span>Get Directions</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, color: 'rgba(241,210,112,0.6)' }}>
              <Clock size={13} />
              <span>Launching Soon — Stay Tuned</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Outlets() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger
      gsap.from('[data-outlet-card]', {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getGridCols = () => {
    if (isMobile) return '1fr';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(4, 1fr)';
  };

  return (
    <section id="outlets" ref={sectionRef} style={{ padding: isMobile ? '64px 0' : '112px 0', background: '#1a0a0e', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(241,210,112,0.7)', marginBottom: '16px' }}>
            Find Us
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(2.8rem, 6vw, 5.5rem)', color: '#f5f0e8', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            YOUR NEXT FAVOURITE<br />
            <span style={{ color: '#f1d270' }}>BITE IS CLOSER.</span>
          </h2>
          <div style={{ height: '4px', width: '80px', background: '#7f1022', marginTop: '24px', borderRadius: '9999px' }} />
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: getGridCols(), gap: '28px' }}
        >
          {outlets.map((outlet, i) => (
            <OutletCard key={outlet.id} outlet={outlet} index={i} />
          ))}
        </div>

        {/* Bottom decorative text */}
        <div style={{ marginTop: '96px', textAlign: 'center', overflow: 'hidden' }}>
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(245,240,232,0.05)', fontSize: '14vw', lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>
            MOMOLET
          </p>
        </div>
      </div>
    </section>
  );
}
