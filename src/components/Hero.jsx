import { useEffect, useRef } from 'react';
import { MapPin, Star } from 'lucide-react';
import gsap from 'gsap';
import { heroSpread } from '../data';

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const decorRef = useRef(null);
  const locationsRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image reveal with clip-path
      tl.from(imageRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power4.out',
      })
      // Tag pill
      .from(tagRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.5,
      }, '-=0.4')
      // Headline: each word inner slides up from clipped container
      .from('.hw-inner', {
        yPercent: 110,
        stagger: 0.07,
        duration: 0.85,
        ease: 'power3.out',
      }, '-=0.3')
      // Supporting text
      .from(subRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.4')
      // Locations
      .from(locationsRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
      }, '-=0.4')
      // CTA buttons
      .from(ctaRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.3')
      // Badge
      .from(badgeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.3')
      // Decorative elements
      .from(decorRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.5)',
      }, '-=0.5');

    }, sectionRef);

    // Mouse parallax (desktop only)
    let animFrame;
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 12;
        gsap.to(imageRef.current, {
          x: xPos * 0.3,
          y: yPos * 0.3,
          duration: 1.2,
          ease: 'power2.out',
        });
        if (decorRef.current) {
          gsap.to(decorRef.current.children, {
            x: (i) => xPos * (0.5 + i * 0.2),
            y: (i) => yPos * (0.5 + i * 0.2),
            duration: 1.4,
            ease: 'power2.out',
            stagger: 0.05,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Two lines of headline
  const line1 = ['A', 'LITTLE', 'MOMO.'];
  const line2 = ['A', 'LOT', 'OF', 'MAGIC.'];

  const HeadlineLine = ({ words }) => (
    <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 md:gap-x-5 leading-[0.88]">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
        >
          {/* Inner: this is what GSAP animates */}
          <span className="hw-inner inline-block">
            {word}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: '#1a0a0e',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 'calc(50vh - 180px)',
      }}
    >
      {/* Background hero image */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      >
        <img
          src={heroSpread}
          alt="MOMOLET food spread — steamed momos, fried momos, cutlets and soup on a table"
          className="w-full h-full object-cover object-center"
          style={{ transform: 'scale(1.08)' }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0e]/75 via-[#1a0a0e]/45 to-[#1a0a0e]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a0e]/60 via-transparent to-[#1a0a0e]/30" />
      </div>

      {/* Decorative floating elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[8%] w-20 h-20 rounded-full border border-[#f1d270]/20 backdrop-blur-sm flex items-center justify-center">
          <Star size={16} className="text-[#f1d270]/50" />
        </div>
        <div className="absolute bottom-[25%] right-[15%] w-3 h-3 rounded-full bg-[#f1d270]/40" />
        <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-[#f5f0e8]/30" />
        <div className="absolute top-[20%] left-[12%] w-16 h-16 rounded-full border border-[#f5f0e8]/10" />
        <div className="absolute bottom-[40%] left-[8%] text-[#f1d270]/15 text-6xl font-display select-none">✦</div>
        <div className="absolute top-[60%] right-[5%] text-[#f5f0e8]/10 text-4xl font-display select-none">✦</div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}
      >
        <div style={{ maxWidth: '640px', paddingTop: '0px' }}>

          {/* Tag pill */}
          <div ref={tagRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(127,16,34,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(127,16,34,0.8)', borderRadius: '9999px', padding: '4px 14px', marginBottom: '28px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f1d270', flexShrink: 0 }} />
            <span style={{ color: 'rgba(245,240,232,0.9)', fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Manjeri • Perinthalmanna • Nilambur
            </span>
          </div>

          {/* Main Headline */}
          <div ref={headlineRef} style={{ marginBottom: '32px' }}>
            <h1
              className="font-display text-[#f5f0e8] tracking-tight space-y-0.5"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', lineHeight: 0.88 }}
            >
              <HeadlineLine words={line1} />
              <HeadlineLine words={line2} />
            </h1>
          </div>

          {/* Supporting text */}
          <p
            ref={subRef}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(245,240,232,0.85)', fontSize: '18px', maxWidth: '420px', marginBottom: '28px', lineHeight: 1.6 }}
          >
            Fresh flavours, bold bites, and moments worth sharing.
          </p>

          {/* Locations */}
          <div ref={locationsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
            {['Manjeri', 'Perinthalmanna', 'Nilambur'].map((loc) => (
              <span key={loc} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(245,240,232,0.8)', fontSize: '12px', fontFamily: 'var(--font-sans)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <MapPin size={11} style={{ color: '#f1d270', flexShrink: 0 }} />
                {loc}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToMenu}
              id="hero-explore-btn"
              className="btn-primary bg-[#7f1022] hover:bg-[#a01022] text-[#f5f0e8] font-sans font-medium px-7 sm:px-8 py-3 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-[#7f1022]/40"
            >
              Explore Our Menu
            </button>
            <button
              onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-discover-btn"
              className="border border-[#f5f0e8]/40 hover:border-[#f5f0e8]/80 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 font-sans font-medium px-7 sm:px-8 py-3 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm"
            >
              Discover MOMOLET
            </button>
          </div>
        </div>
      </div>

      {/* Rotating Badge */}
      <div
        ref={badgeRef}
        className="absolute right-6 bottom-20 md:right-14 md:bottom-24 w-20 h-20 md:w-28 md:h-28 hidden sm:flex items-center justify-center pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="badge-rotate absolute inset-0 w-full h-full">
          <path
            id="circle-path"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text style={{ fontSize: '11px', fill: '#f1d270', fontWeight: 'bold' }}>
            <textPath href="#circle-path" startOffset="0%">
              ✦ MADE WITH LOVE ✦ MOMOLET ✦ FRESH &amp; BOLD ✦
            </textPath>
          </text>
        </svg>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#7f1022] flex items-center justify-center shadow-lg border border-[#f1d270]/30">
          <span className="text-[#f1d270] text-lg md:text-xl">♥</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[#f5f0e8]/40 text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-[#f5f0e8]/25 flex items-start justify-center pt-1">
          <div className="scroll-dot w-1 h-1 rounded-full bg-[#f1d270]" />
        </div>
      </div>
    </section>
  );
}
