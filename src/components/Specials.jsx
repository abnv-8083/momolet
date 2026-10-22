import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import steamedMomos from '../assets/steamed_momos.jpg';
import friedMomos from '../assets/fried_momos.jpg';
import signatureSoup from '../assets/signature_soup.jpg';

gsap.registerPlugin(ScrollTrigger);

const specials = [
  {
    id: 1,
    name: 'Steamed to Perfection',
    dish: 'Classic Steamed Momos',
    description: 'Hand-folded with love. Filled with bold spices. Served with smoky chutney that lingers.',
    image: steamedMomos,
    align: 'left',
    accent: '#f1d270',
    bg: '#2d0009',
    price: '₹89',
  },
  {
    id: 2,
    name: 'Golden & Irresistible',
    dish: 'Fried Momos',
    description: 'Crunchy on the outside. Juicy on the inside. The fried momo that started it all.',
    image: friedMomos,
    align: 'right',
    accent: '#f5f0e8',
    bg: '#4a0011',
    price: '₹99',
  },
  {
    id: 3,
    name: 'Soul in a Bowl',
    dish: 'Signature Soup',
    description: 'A slow-simmered broth that warms you from the inside. Every spoonful tells a story.',
    image: signatureSoup,
    align: 'left',
    accent: '#f1d270',
    bg: '#2d0009',
    price: '₹75',
  },
];

function SpecialItem({ item, index }) {
  const itemRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isLeft = item.align === 'left';

      // Image scale on scroll
      gsap.fromTo(imgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Text slide in from alternating directions
      gsap.from(textRef.current?.children || [], {
        x: isLeft ? -60 : 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Background color transition
      gsap.fromTo(itemRef.current,
        { backgroundColor: item.bg },
        {
          backgroundColor: index % 2 === 0 ? '#1a0a0e' : item.bg,
          ease: 'none',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [item, index]);

  const isLeft = item.align === 'left';

  return (
    <div
      ref={itemRef}
      style={{ padding: '96px 0', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: item.bg }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', direction: !isLeft ? 'rtl' : 'ltr' }}>

          {/* Image */}
          <div style={{ direction: 'ltr', position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ aspectRatio: '4/3' }}>
              <img
                ref={imgRef}
                src={item.image}
                alt={item.dish}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
            </div>
            {/* Price tag */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '8px 20px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="font-display" style={{ fontSize: '28px', color: item.accent }}>{item.price}</span>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: item.accent, opacity: 0.75 }}>
              Signature Special
            </p>
            <h3 className="font-display" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.01em', color: item.accent }}>
              {item.name.toUpperCase()}
            </h3>
            <p className="font-serif" style={{ fontSize: '20px', color: 'rgba(245,240,232,0.9)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {item.dish}
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'rgba(245,240,232,0.7)', lineHeight: 1.7 }}>
              {item.description}
            </p>
            <div style={{ paddingTop: '8px' }}>
              <a
                href="#menu"
                onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', letterSpacing: '0.05em', padding: '12px 28px', borderRadius: '9999px', border: `1px solid ${item.accent}`, color: item.accent, textDecoration: 'none', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span>Order Now</span>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${item.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Specials() {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="specials" className="overflow-hidden scroll-mt-20">
      {/* Section Header */}
      <div style={{ background: '#f5f0e8', padding: '80px 48px', textAlign: 'center', borderBottom: '1px solid rgba(45,0,9,0.1)' }}>
        <div ref={headingRef}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#7f1022', marginBottom: '16px' }}>
            Signature Specials
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#2d0009', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '0' }}>
            THE STARS<br />OF MOMOLET.
          </h2>
          <div style={{ height: '4px', width: '80px', background: '#7f1022', marginTop: '24px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '9999px' }} />
        </div>
      </div>

      {/* Special Items */}
      {specials.map((item, i) => (
        <SpecialItem key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}
