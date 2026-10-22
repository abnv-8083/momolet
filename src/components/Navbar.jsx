import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { navLinks } from '../data';
import gsap from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linkRefs = useRef([]);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from(linkRefs.current.filter(Boolean), {
        opacity: 0,
        y: -10,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' });
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
          background: scrolled ? 'rgba(26,10,0,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(241,210,112,0.1)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '16px 20px' : '16px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3px', lineHeight: 1, textDecoration: 'none', flexShrink: 0 }}
            className="group"
          >
            <span className="font-display group-hover:text-[#f1d270] transition-colors duration-300"
              style={{ fontSize: isMobile ? '20px' : '26px', color: '#f5f0e8', letterSpacing: '0.12em' }}>
              MOMOLET
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', fontWeight: 500, textTransform: 'uppercase', color: 'rgba(241,210,112,0.6)' }}>
              Fresh · Bold · Magic
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1, justifyContent: 'center' }}
            className="hidden md:flex">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                ref={(el) => (linkRefs.current[i] = el)}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="nav-link"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'rgba(245,240,232,0.8)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.8)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}
            className="hidden md:flex">
            <a
              href="https://www.instagram.com/momolet_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow MOMOLET on Instagram"
              style={{ color: 'rgba(245,240,232,0.6)', transition: 'color 0.3s, transform 0.3s', display: 'flex' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f1d270'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="#menu"
              onClick={(e) => { e.preventDefault(); scrollTo('#menu'); }}
              className="btn-primary"
              style={{
                background: '#7f1022',
                color: '#f5f0e8',
                fontSize: '13px',
                fontWeight: 500,
                padding: '9px 20px',
                borderRadius: '9999px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'background 0.3s, transform 0.3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#a01022'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#7f1022'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Explore Menu
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ color: '#f5f0e8', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(45,0,9,0.98)', backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
          opacity: 0, transform: 'translateY(-20px)',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{ position: 'absolute', top: '24px', right: '24px', color: 'rgba(245,240,232,0.7)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <X size={28} />
        </button>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            className="font-display"
            style={{ fontSize: '36px', color: '#f5f0e8', textDecoration: 'none', letterSpacing: '0.2em', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f1d270'}
            onMouseLeave={e => e.currentTarget.style.color = '#f5f0e8'}
          >
            {link.label}
          </a>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
          <a
            href="https://www.instagram.com/momolet_official"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(245,240,232,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}
          >
            <InstagramIcon size={20} />
            <span style={{ fontSize: '14px', fontFamily: 'var(--font-sans)' }}>@momolet_official</span>
          </a>
        </div>

        <a
          href="#menu"
          onClick={(e) => { e.preventDefault(); scrollTo('#menu'); setMobileOpen(false); }}
          className="btn-primary"
          style={{
            background: '#7f1022', color: '#f5f0e8',
            fontSize: '16px', fontWeight: 500,
            padding: '14px 32px', borderRadius: '9999px',
            textDecoration: 'none', letterSpacing: '0.05em',
            marginTop: '8px', transition: 'background 0.3s',
          }}
        >
          Explore Menu
        </a>
      </div>
    </>
  );
}
