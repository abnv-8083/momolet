import { MapPin, Mail, Phone } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { navLinks } from '../data';

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#1a0a0e', borderTop: '1px solid rgba(245,240,232,0.1)' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="font-display" style={{ fontSize: '28px', color: '#f5f0e8', letterSpacing: '0.12em' }}>MOMOLET</span>
              <p style={{ fontSize: '10px', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', color: 'rgba(241,210,112,0.7)', textTransform: 'uppercase', marginTop: '6px' }}>
                Fresh • Bold • Magic
              </p>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(245,240,232,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
              Bringing bold flavours and happy moments to Kerala, one momo at a time.
            </p>
            <a
              href="https://www.instagram.com/momolet_official"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#f1d270', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
              onMouseLeave={e => e.currentTarget.style.color = '#f1d270'}
            >
              <InstagramIcon size={15} />
              @momolet_official
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(241,210,112,0.7)', marginBottom: '24px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="nav-link"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(245,240,232,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5f0e8'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.6)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Outlets */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(241,210,112,0.7)', marginBottom: '24px' }}>
              Our Outlets
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Manjeri', status: 'open' },
                { name: 'Perinthalmanna', status: 'open' },
                { name: 'Nilambur', status: 'open' },
                { name: 'Kondotty', status: 'soon' },
              ].map((outlet) => (
                <li key={outlet.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={13} style={{ color: '#f1d270', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(245,240,232,0.6)' }}>
                    {outlet.name}
                    {outlet.status === 'soon' && (
                      <span style={{ marginLeft: '8px', fontSize: '11px', color: 'rgba(241,210,112,0.6)', fontStyle: 'italic' }}>(soon)</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(241,210,112,0.7)', marginBottom: '24px' }}>
              Get In Touch
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(245,240,232,0.5)' }}>
                <Mail size={14} style={{ color: '#f1d270', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontStyle: 'italic' }}>Contact via Instagram DM</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <InstagramIcon size={14} style={{ color: '#f1d270', flexShrink: 0 }} />
                <a
                  href="https://www.instagram.com/momolet_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#f1d270', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                  @momolet_official
                </a>
              </li>
            </ul>
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(245,240,232,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(245,240,232,0.3)', lineHeight: 1.6 }}>
                For outlet-specific enquiries, please visit us in person or reach out via Instagram.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(245,240,232,0.3)' }}>
            © {new Date().getFullYear()} MOMOLET. All rights reserved. Made with ♥ in Kerala.
          </p>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(245,240,232,0.3)' }}>
            Crafted for the love of momos.
          </span>
        </div>
      </div>
    </footer>
  );
}
