import { useEffect, useRef } from 'react';
import { InstagramIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItems } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Gallery items stagger reveal
      gsap.from('[data-gallery-item]', {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.7,
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

  return (
    <section id="gallery" ref={sectionRef} style={{ padding: '112px 0', background: '#f5f0e8', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#7f1022', marginBottom: '16px' }}>
              Social Gallery
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#2d0009', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              A LITTLE TASTE<br />OF MOMOLET.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/momolet_official"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', color: 'rgba(45,0,9,0.8)', textDecoration: 'none', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)', padding: '10px 20px', borderRadius: '9999px', border: '1px solid rgba(45,0,9,0.1)', transition: 'color 0.3s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#7f1022'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(45,0,9,0.8)'}
          >
            <InstagramIcon size={18} />
            <span>Follow @momolet_official</span>
            <span>→</span>
          </a>
        </div>

        {/* Masonry-inspired grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', gridTemplateRows: 'auto' }}
        >
          {galleryItems.map((item, i) => {
            const spanStyle = item.span === 'tall'
              ? { gridRow: 'span 2' }
              : item.span === 'wide'
              ? { gridColumn: 'span 2' }
              : {};

            return (
              <div
                key={item.id}
                data-gallery-item
                className="gallery-item group"
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.5s, transform 0.5s',
                  aspectRatio: item.span === 'wide' ? '16/9' : item.span === 'tall' ? undefined : '1/1',
                  minHeight: item.span === 'tall' ? '320px' : undefined,
                  ...spanStyle,
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                />
                {/* Instagram overlay */}
                <div className="gallery-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(127,16,34,0.75)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                    <InstagramIcon size={30} style={{ color: '#f5f0e8' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#f5f0e8', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>View on Instagram</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <a
            href="https://www.instagram.com/momolet_official"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(135deg, #7f1022, #4a0011)', color: '#f5f0e8', fontFamily: 'var(--font-sans)', fontWeight: 600, padding: '16px 36px', borderRadius: '9999px', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', transition: 'box-shadow 0.3s, transform 0.3s', boxShadow: '0 4px 20px rgba(127,16,34,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(127,16,34,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(127,16,34,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <InstagramIcon size={20} />
            Follow MOMOLET on Instagram
          </a>
          <p style={{ marginTop: '24px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(26,10,14,0.4)', fontStyle: 'italic' }}>
            Images are representational. Visit our Instagram for actual MOMOLET content.
          </p>
        </div>
      </div>
    </section>
  );
}
