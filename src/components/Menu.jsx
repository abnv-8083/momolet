import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems, menuCategories } from '../data';

gsap.registerPlugin(ScrollTrigger);

function MenuCard({ item, index }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="food-card group relative bg-white/75 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#2d0009]/8 flex flex-col justify-between"
      data-menu-card
    >
      {/* Image */}
      <div className="card-img relative h-56 md:h-64 overflow-hidden">
        <img
          ref={imgRef}
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-[11px] font-sans font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm ${item.tagColor}`}>
            {item.tag}
          </span>
        </div>
        {/* Category label */}
        <div className="absolute top-4 right-4">
          <span className="text-[11px] font-sans font-medium px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1a0a0e]/80 uppercase tracking-wider shadow-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
            <h3 className="font-serif" style={{ fontWeight: 700, color: '#2d0009', fontSize: '18px', lineHeight: 1.3 }}>
              {item.name}
            </h3>
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#7f1022] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
              <ArrowUpRight size={15} className="text-[#f5f0e8]" />
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(26,10,14,0.65)', lineHeight: 1.6, marginBottom: '16px' }}>
            {item.description}
          </p>
        </div>
        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(45,0,9,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="font-display" style={{ fontSize: '28px', color: '#7f1022', letterSpacing: '0.02em' }}>{item.price}</span>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#7f1022', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'transform 0.3s' }} className="group-hover:translate-x-1">
            Order Now →
          </span>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-[#7f1022]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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

      // Filter tabs
      gsap.from(filterRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger
      gsap.from('[data-menu-card]', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-menu-card]');
    gsap.from(cards, {
      opacity: 0,
      y: 20,
      stagger: 0.07,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [activeCategory]);

  return (
    <section id="menu" ref={sectionRef} style={{ padding: isMobile ? '64px 0' : '112px 0', background: '#f5f0e8', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#7f1022', marginBottom: '16px' }}>
            Our Menu
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 'clamp(2.2rem, 8vw, 4rem)' : 'clamp(3.5rem, 7vw, 6rem)', color: '#2d0009', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '0' }}>
            CRAVINGS<br />DON'T WAIT.
          </h2>
          <div style={{ height: '4px', width: '80px', background: '#7f1022', marginTop: '24px', borderRadius: '9999px' }} />
        </div>

        {/* Category Filter */}
        <div
          ref={filterRef}
          className={isMobile ? 'mob-filter-scroll' : ''}
          style={isMobile ? { marginBottom: '56px' } : { display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '56px' }}
        >
          {menuCategories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => setActiveCategory(cat)}
              className="filter-tab"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 500,
                padding: '10px 24px',
                borderRadius: '9999px',
                border: activeCategory === cat ? '1px solid #7f1022' : '1px solid rgba(45,0,9,0.2)',
                background: activeCategory === cat ? '#7f1022' : 'rgba(255,255,255,0.4)',
                color: activeCategory === cat ? '#f5f0e8' : 'rgba(45,0,9,0.75)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '36px' }}
        >
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(26,10,14,0.45)', fontStyle: 'italic' }}>
            * Menu items and prices are for display purposes. Visit an outlet for full menu details.
          </p>
        </div>
      </div>
    </section>
  );
}
