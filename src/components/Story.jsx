import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { kitchenPassion, restaurantInterior } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const bgImageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text line reveals
      gsap.from('.story-line', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Foreground image mask reveal
      gsap.from(imageRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Background image parallax
      gsap.to(bgImageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Foreground image parallax (slower)
      gsap.to(imageRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Badge entrance
      gsap.from('.passion-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.passion-badge',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Decorative elements stagger
      gsap.from('.story-decor', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeItems = 'FRESH FLAVOURS • HAPPY MOMENTS • MOMOLET • BOLD BITES • MADE WITH LOVE • FRESH FLAVOURS • HAPPY MOMENTS • MOMOLET • BOLD BITES • MADE WITH LOVE •';

  return (
    <section id="story" ref={sectionRef} className="bg-[#2d0009] overflow-hidden scroll-mt-20">

      {/* Marquee */}
      <div className="bg-[#7f1022] py-5 md:py-6 border-y border-[#f1d270]/20 overflow-hidden shadow-inner">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl text-[#f1d270] tracking-widest px-6 whitespace-nowrap">
              {marqueeItems}
            </span>
          ))}
        </div>
      </div>

      {/* Main Story Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '64px 20px' : '112px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : '80px',
          alignItems: 'center',
        }}>

          {/* Images - Left with offset padding to prevent edge collision */}
          <div
            className="relative"
            style={isMobile
              ? { paddingBottom: '48px', paddingRight: '24px' }
              : { paddingBottom: undefined, paddingRight: undefined }}
          >
            {/* Use className for non-mobile, inline override for mobile */}
            <div
              className={isMobile ? '' : 'pb-12 sm:pb-16 pr-8 sm:pr-12 lg:pr-14'}
              style={{ position: 'relative' }}
            >
              {/* Background image (behind) */}
              <div
                ref={bgImageRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={restaurantInterior}
                  alt="MOMOLET restaurant interior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d0009]/70 via-transparent to-transparent" />
              </div>

              {/* Foreground image (overlapping) */}
              <div
                ref={imageRef}
                className="absolute w-2/3 rounded-3xl overflow-hidden shadow-2xl border-4 md:border-6 border-[#2d0009]"
                style={{
                  clipPath: 'inset(0 0 0 0)',
                  bottom: isMobile ? '-20px' : undefined,
                  right: isMobile ? '-12px' : undefined,
                }}
              >
                <img
                  src={kitchenPassion}
                  alt="Chef crafting momos with passion"
                  className={isMobile ? '' : '-bottom-6 -right-4 sm:-bottom-8 sm:-right-8'}
                  loading="lazy"
                  style={{ aspectRatio: '3/4', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Passion badge */}
              <div
                className="passion-badge absolute bg-[#f1d270] rounded-full flex items-center justify-center shadow-2xl border-2 border-[#7f1022]/30"
                style={isMobile
                  ? { top: '-10px', left: '-10px', width: '72px', height: '72px' }
                  : { top: '-20px', left: '-20px', width: '80px', height: '80px' }}
              >
                <svg viewBox="0 0 80 80" className="badge-rotate absolute inset-0 w-full h-full">
                  <path
                    id="story-badge-path"
                    d="M 40,40 m -27,0 a 27,27 0 1,1 54,0 a 27,27 0 1,1 -54,0"
                    fill="none"
                  />
                  <text style={{ fontSize: '8px', fill: '#7f1022', fontWeight: 'bold' }}>
                    <textPath href="#story-badge-path" startOffset="0%">
                      ✦ MADE WITH PASSION ✦ MOMOLET ✦
                    </textPath>
                  </text>
                </svg>
                <span className="text-[#7f1022] text-2xl sm:text-3xl">♥</span>
              </div>

              {/* Decorative elements */}
              <div className="story-decor absolute top-1/2 left-0 -translate-x-full pr-6 hidden lg:block">
                <div className="w-px h-28 bg-gradient-to-b from-transparent via-[#f1d270]/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text - Right */}
          <div ref={textRef} style={{ paddingLeft: isMobile ? '0' : '16px' }}>
            <p className="story-line font-sans" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(241,210,112,0.7)', marginBottom: '20px' }}>
              Our Philosophy
            </p>

            <h2 className="font-display" style={{ fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(2.8rem, 5vw, 4.5rem)', color: '#f5f0e8', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '40px' }}>
              <span className="story-line" style={{ display: 'block' }}>GOOD FOOD.</span>
              <span className="story-line" style={{ display: 'block', color: '#f1d270' }}>GREAT MOODS.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <p className="story-line font-serif" style={{ fontSize: '17px', color: 'rgba(245,240,232,0.85)', lineHeight: 1.7 }}>
                At MOMOLET, every bite brings people together. We combine bold flavours, carefully prepared food, and a passion for serving moments that matter.
              </p>
              <p className="story-line font-sans" style={{ fontSize: '14px', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7 }}>
                From hand-folded steamed momos to golden crispy cutlets and soul-warming soups — everything we make is crafted with intention. Our kitchens are full of flavour, laughter, and the kind of care that you can actually taste.
              </p>
              <p className="story-line font-sans" style={{ fontSize: '14px', color: 'rgba(245,240,232,0.65)', lineHeight: 1.7 }}>
                We started as a dream in Manjeri. Today, MOMOLET is a community — a gathering point for anyone who believes that good food creates great memories.
              </p>
            </div>

            {/* Stats */}
            <div className="story-line" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '32px 0', margin: '8px 0 32px', borderTop: '1px solid rgba(245,240,232,0.15)', borderBottom: '1px solid rgba(245,240,232,0.15)' }}>
              {[
                { number: '3+', label: 'Outlets' },
                { number: '50+', label: 'Menu Items' },
                { number: '∞', label: 'Happy Bites' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display" style={{ fontSize: isMobile ? '32px' : '48px', color: '#f1d270', marginBottom: '8px', lineHeight: 1 }}>{stat.number}</div>
                  <div className="font-sans" style={{ fontSize: '11px', color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="story-line" style={{ marginTop: '8px' }}>
              <a
                href="#menu"
                onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: '9999px', border: '1px solid #f1d270', color: '#f1d270', textDecoration: 'none', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f1d270'; e.currentTarget.style.color = '#2d0009'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f1d270'; }}
              >
                <span>Explore Our Menu</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
