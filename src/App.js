import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  Users,
  Truck,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  Building,
  User,
  CreditCard,
  Heart,
  Briefcase,
  Wrench,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  Eye,
  Download,
  Sun,
  Moon,
  LogOut,
  Home,
  FolderOpen,
  UserCircle
} from 'lucide-react';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzmgFbGJTaUar2d6nN1EJKM9DMZgLH8tUTjlI69M8tsMfgAyIUiZvq1q05StGxlCHw/exec';

const PDF_URLS = {
  w4: '/Form W-4 sign.pdf',
  w9: '/Form W-9 sign.pdf',
  msa: '/LYT MSA 2006 - v3.4.pdf'
};

const RATE_CARD_URL = 'https://docs.google.com/spreadsheets/d/10Py5x0vIUWPzKn1ZeTaIGyaEJonbz-0BHmSYV-20rB4/edit';

const colors = {
  oceanBlue: '#0077B6',
  teal: '#00B4D8',
  green: '#2E994B',
  coral: '#e85a4f',
  darkNavy: '#0d1b2a',
  darkBg: '#0a1628'
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
  };

  if (currentView === 'employee-onboarding') {
    return <EmployeeOnboarding onBack={() => navigate('portal-select')} darkMode={darkMode} />;
  }

  if (currentView === 'contractor-onboarding') {
    return <ContractorOnboarding onBack={() => navigate('portal-select')} darkMode={darkMode} />;
  }

  if (currentView === 'employee-login') {
    return <EmployeeLogin onLogin={(u) => { setUser(u); navigate('dashboard'); }} onBack={() => navigate('portal-select')} darkMode={darkMode} />;
  }

  if (currentView === 'dashboard' && user) {
    return <EmployeeDashboard user={user} onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  const bgColor = darkMode ? colors.darkBg : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const mutedColor = darkMode ? '#a0aec0' : '#666666';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: darkMode ? 'rgba(10, 22, 40, 0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('home')}>
            <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>LYT</div>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>LYT Communications</span>
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-menu">
            {['home', 'about', 'services', 'contact'].map(item => (
              <span key={item} onClick={() => navigate(item)} style={{ cursor: 'pointer', color: currentView === item ? colors.teal : mutedColor, fontWeight: currentView === item ? '600' : '400', transition: 'color 0.3s' }}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            ))}
            <button onClick={() => navigate('portal-select')} style={{ padding: '10px 24px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: '600' }}>
              Portal
            </button>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: mutedColor, padding: '8px' }}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: textColor }} className="mobile-menu-btn">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div style={{ padding: '20px', borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            {['home', 'about', 'services', 'contact'].map(item => (
              <div key={item} onClick={() => navigate(item)} style={{ padding: '15px 0', cursor: 'pointer', borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
            ))}
            <button onClick={() => navigate('portal-select')} style={{ width: '100%', marginTop: '15px', padding: '15px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: '600' }}>
              Portal
            </button>
          </div>
        )}
      </nav>

      <main style={{ paddingTop: '80px' }}>
        {currentView === 'home' && <HomePage navigate={navigate} darkMode={darkMode} colors={colors} cardBg={cardBg} mutedColor={mutedColor} />}
        {currentView === 'about' && <AboutPage darkMode={darkMode} colors={colors} cardBg={cardBg} mutedColor={mutedColor} />}
        {currentView === 'services' && <ServicesPage darkMode={darkMode} colors={colors} cardBg={cardBg} mutedColor={mutedColor} />}
        {currentView === 'contact' && <ContactPage darkMode={darkMode} colors={colors} cardBg={cardBg} mutedColor={mutedColor} />}
        {currentView === 'portal-select' && <PortalSelect navigate={navigate} darkMode={darkMode} colors={colors} cardBg={cardBg} mutedColor={mutedColor} />}
      </main>

      <footer style={{ backgroundColor: darkMode ? colors.darkNavy : '#1a1a2e', color: 'white', padding: '60px 20px 30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>LYT</div>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>LYT Communications</span>
              </div>
              <p style={{ color: '#a0aec0', lineHeight: '1.6' }}>Building the future of telecommunications infrastructure across the Greater Houston area.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px', color: colors.teal }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} /> 12130 State Highway 3, Webster, TX 77598</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} /> (281) 555-0199</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16} /> info@lytcomm.com</div>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px', color: colors.teal }}>Services</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#a0aec0' }}>
                <span>HDD Drilling</span>
                <span>Fiber Splicing</span>
                <span>Aerial Construction</span>
                <span>Underground Utilities</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'center', color: '#a0aec0' }}>
            <p>© 2026 LYT Communications, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function HomePage({ navigate, darkMode, colors, cardBg, mutedColor }) {
  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '15+', label: 'Years Experience' },
    { value: '50+', label: 'Team Members' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  const services = [
    { icon: <Truck size={32} />, title: 'HDD Drilling', desc: 'Horizontal directional drilling for minimal surface disruption' },
    { icon: <Wrench size={32} />, title: 'Fiber Splicing', desc: 'Precision fiber optic cable splicing and testing' },
    { icon: <Building size={32} />, title: 'Aerial Construction', desc: 'Overhead cable installation and maintenance' }
  ];

  return (
    <>
      <section style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px',
        background: darkMode ? `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.darkNavy} 100%)` : `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`
      }}>
        <div style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '30px', lineHeight: '1.2' }}>
            Building Tomorrow's
            <span style={{ background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Fiber Network</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: mutedColor, marginBottom: '40px', lineHeight: '1.6' }}>
            LYT Communications delivers expert fiber optic construction services across the Greater Houston area. From underground utilities to aerial installation, we build the infrastructure that connects communities.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('contact')} style={{ padding: '16px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Get Started <ChevronRight size={20} />
            </button>
            <button onClick={() => navigate('services')} style={{ padding: '16px 40px', background: 'transparent', color: colors.teal, border: `2px solid ${colors.teal}`, borderRadius: '30px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>
              Our Services
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: cardBg }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: '800', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                <div style={{ color: mutedColor, fontSize: '1.1rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px' }}>Our Core Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map((service, i) => (
              <div key={i} style={{ padding: '40px', backgroundColor: cardBg, borderRadius: '16px', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, transition: 'transform 0.3s, box-shadow 0.3s' }}>
                <div style={{ color: colors.teal, marginBottom: '20px' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ color: mutedColor, lineHeight: '1.6' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 20px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginBottom: '20px' }}>Ready to Build Together?</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '40px' }}>
            Join our network of skilled contractors or become part of the LYT team.
          </p>
          <button onClick={() => navigate('portal-select')} style={{ padding: '16px 50px', backgroundColor: 'white', color: colors.oceanBlue, border: 'none', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>
            Access Portal
          </button>
        </div>
      </section>
    </>
  );
}

function AboutPage({ darkMode, colors, cardBg, mutedColor }) {
  const values = [
    { icon: <Shield size={28} />, title: 'Safety First', desc: 'Zero compromise on workplace safety and compliance' },
    { icon: <Award size={28} />, title: 'Excellence', desc: 'Delivering quality that exceeds expectations' },
    { icon: <Users size={28} />, title: 'Teamwork', desc: 'Collaborative approach with clients and partners' },
    { icon: <Clock size={28} />, title: 'Reliability', desc: 'On-time delivery, every project, every time' }
  ];

  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center' }}>About LYT Communications</h1>
        <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px', marginBottom: '60px' }}>
          <h2 style={{ color: colors.teal, marginBottom: '20px' }}>Our Story</h2>
          <p style={{ color: mutedColor, lineHeight: '1.8', marginBottom: '20px' }}>
            Founded in Webster, Texas, LYT Communications has grown from a small team of dedicated professionals into a leading fiber optic construction company serving the Greater Houston area and beyond.
          </p>
          <p style={{ color: mutedColor, lineHeight: '1.8' }}>
            We specialize in horizontal directional drilling (HDD), fiber splicing, aerial construction, and comprehensive underground utility work. Our commitment to safety, quality, and client satisfaction drives everything we do.
          </p>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
          {values.map((value, i) => (
            <div key={i} style={{ padding: '30px', backgroundColor: cardBg, borderRadius: '12px', textAlign: 'center', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
              <div style={{ color: colors.teal, marginBottom: '15px' }}>{value.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{value.title}</h3>
              <p style={{ color: mutedColor, fontSize: '0.95rem' }}>{value.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px', marginTop: '60px' }}>
          <h2 style={{ color: colors.teal, marginBottom: '20px' }}>Headquarters</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: mutedColor }}>
            <MapPin size={24} color={colors.oceanBlue} />
            <div>
              <p style={{ fontWeight: '600', color: darkMode ? 'white' : '#1a1a2e' }}>12130 State Highway 3</p>
              <p>Webster, TX 77598</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ darkMode, colors, cardBg, mutedColor }) {
  const services = [
    { title: 'Horizontal Directional Drilling (HDD)', desc: 'Trenchless technology for installing underground utilities with minimal surface disruption.', features: ['Minimal surface disruption', 'Cost-effective for long runs', 'Environmentally friendly', 'Reduced restoration costs'] },
    { title: 'Fiber Optic Splicing', desc: 'Precision fusion splicing and mechanical splicing services for single-mode and multi-mode fiber.', features: ['Fusion splicing', 'Mechanical splicing', 'OTDR testing', 'Splice enclosures'] },
    { title: 'Aerial Construction', desc: 'Complete overhead cable installation including strand placement, lashing, and attachments.', features: ['Strand installation', 'Cable lashing', 'Pole attachments', 'NESC compliant'] },
    { title: 'Underground Construction', desc: 'Traditional open-cut trenching and conduit installation for fiber optic and utility infrastructure.', features: ['Conduit placement', 'Trenching', 'Boring', 'Restoration'] },
    { title: 'Testing & Quality Assurance', desc: 'Comprehensive fiber testing including OTDR, power meter, and visual fault location.', features: ['OTDR testing', 'Power meter testing', 'Visual inspection', 'Certification reports'] },
    { title: 'Project Management', desc: 'End-to-end project coordination from permitting to final acceptance.', features: ['Permitting support', 'Scheduling', 'Progress reporting', 'Client coordination'] }
  ];

  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>Our Services</h1>
        <p style={{ textAlign: 'center', color: mutedColor, marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
          Comprehensive fiber optic construction services delivered by experienced professionals.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {services.map((service, i) => (
            <div key={i} style={{ padding: '35px', backgroundColor: cardBg, borderRadius: '16px', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px', color: colors.teal }}>{service.title}</h3>
              <p style={{ color: mutedColor, lineHeight: '1.6', marginBottom: '20px' }}>{service.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.map((feature, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: mutedColor }}>
                    <CheckCircle size={16} color={colors.green} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage({ darkMode, colors, cardBg, mutedColor }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%', padding: '14px', borderRadius: '8px',
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
    backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
    color: darkMode ? 'white' : '#1a1a2e', fontSize: '1rem'
  };

  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', color: mutedColor, marginBottom: '60px' }}>
          Ready to discuss your next project? Get in touch with our team.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', color: colors.teal }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <MapPin size={24} color={colors.oceanBlue} />
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Address</p>
                  <p style={{ color: mutedColor }}>12130 State Highway 3<br />Webster, TX 77598</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Phone size={24} color={colors.oceanBlue} />
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Phone</p>
                  <p style={{ color: mutedColor }}>(281) 555-0199</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Mail size={24} color={colors.oceanBlue} />
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Email</p>
                  <p style={{ color: mutedColor }}>info@lytcomm.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <Clock size={24} color={colors.oceanBlue} />
                <div>
                  <p style={{ fontWeight: '600', marginBottom: '5px' }}>Hours</p>
                  <p style={{ color: mutedColor }}>Mon - Fri: 7:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={60} color={colors.green} style={{ marginBottom: '20px' }} />
                <h3 style={{ marginBottom: '15px' }}>Message Sent!</h3>
                <p style={{ color: mutedColor }}>We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '30px', color: colors.teal }}>Send a Message</h2>
                <div style={{ marginBottom: '20px' }}>
                  <input type="text" placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input type="email" placeholder="Email Address *" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <textarea placeholder="Your Message *" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{...inputStyle, resize: 'vertical'}} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortalSelect({ navigate, darkMode, colors, cardBg, mutedColor }) {
  const options = [
    { title: "I'm a New Employee", desc: 'Complete your onboarding paperwork including W-4, direct deposit, and safety acknowledgment.', icon: <User size={48} />, action: () => navigate('employee-onboarding'), color: colors.green },
    { title: "I'm a Contractor", desc: 'Register your company, complete MSA, W-9, insurance verification, and rate card acceptance.', icon: <Building size={48} />, action: () => navigate('contractor-onboarding'), color: colors.teal },
    { title: 'Existing Employee Login', desc: 'Access your dashboard, time clock, projects, and documents.', icon: <UserCircle size={48} />, action: () => navigate('employee-login'), color: colors.oceanBlue }
  ];

  return (
    <section style={{ padding: '80px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>LYT Portal</h1>
        <p style={{ textAlign: 'center', color: mutedColor, marginBottom: '50px' }}>Select an option to continue</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {options.map((option, i) => (
            <div key={i} onClick={option.action} style={{ padding: '40px 30px', backgroundColor: cardBg, borderRadius: '16px', border: '2px solid transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = option.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
              <div style={{ color: option.color, marginBottom: '20px' }}>{option.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>{option.title}</h3>
              <p style={{ color: mutedColor, lineHeight: '1.5' }}>{option.desc}</p>
              <div style={{ marginTop: '25px', color: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                Continue <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmployeeOnboarding({ onBack, darkMode }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', dateOfBirth: '', ssnLast4: '',
    bankName: '', routingNumber: '', accountNumber: '', accountType: 'checking',
    emergencyName: '', emergencyRelationship: '', emergencyPhone: '',
    safetyAcknowledged: false
  });
  const [documents, setDocuments] = useState({ w4: { signed: false, signedAt: null } });
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const totalSteps = 5;
  const bgColor = darkMode ? colors.darkBg : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa';
  const inputBg = darkMode ? 'rgba(255,255,255,0.08)' : 'white';
  const borderColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const signDocument = (docName) => setDocuments(prev => ({ ...prev, [docName]: { signed: true, signedAt: new Date().toISOString() } }));

  const canProceed = () => {
    switch(step) {
      case 1: return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2: return documents.w4.signed;
      case 3: return formData.bankName && formData.routingNumber && formData.accountNumber;
      case 4: return formData.emergencyName && formData.emergencyPhone;
      case 5: return formData.safetyAcknowledged;
      default: return false;
    }
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    setError(null);
    const payload = { type: 'employee', formData: { ...formData, accountLast4: formData.accountNumber.slice(-4) }, documents };
    try {
      const response = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.success) { setCompleted(true); } else { setError(result.error || 'Submission failed. Please try again.'); }
    } catch (err) {
      setError('Network error. Your data has been saved locally. Please contact HR.');
      localStorage.setItem('lyt_employee_onboarding_backup', JSON.stringify(payload));
    }
    setSubmitting(false);
  };

  const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${borderColor}`, backgroundColor: inputBg, color: textColor, fontSize: '1rem', marginBottom: '15px' };

  if (completed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <CheckCircle size={80} color={colors.green} style={{ marginBottom: '30px' }} />
          <h1 style={{ marginBottom: '20px' }}>Welcome to LYT!</h1>
          <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '30px' }}>Your onboarding is complete. Your documents have been securely saved. HR will be in touch with next steps.</p>
          <button onClick={onBack} style={{ padding: '14px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>Return to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
      <div style={{ padding: '20px', borderBottom: `1px solid ${borderColor}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: colors.teal, cursor: 'pointer', fontSize: '1rem' }}><ArrowLeft size={20} /> Back</button>
          <span style={{ fontWeight: '600' }}>Employee Onboarding</span>
          <span style={{ color: darkMode ? '#a0aec0' : '#666' }}>Step {step} of {totalSteps}</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[1,2,3,4,5].map(s => (<div key={s} style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: s <= step ? colors.green : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0') }} />))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.85rem', color: darkMode ? '#a0aec0' : '#666' }}>
          <span>Personal Info</span><span>W-4</span><span>Direct Deposit</span><span>Emergency</span><span>Safety</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        {error && (<div style={{ backgroundColor: 'rgba(232, 90, 79, 0.2)', border: `1px solid ${colors.coral}`, padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertCircle color={colors.coral} />{error}</div>)}

        {step === 1 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><User color={colors.teal} /> Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <input placeholder="First Name *" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} style={inputStyle} />
              <input placeholder="Middle Name" value={formData.middleName} onChange={(e) => updateField('middleName', e.target.value)} style={inputStyle} />
              <input placeholder="Last Name *" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <input type="email" placeholder="Email Address *" value={formData.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} />
              <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} style={inputStyle} />
            </div>
            <input placeholder="Street Address" value={formData.address} onChange={(e) => updateField('address', e.target.value)} style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
              <input placeholder="City" value={formData.city} onChange={(e) => updateField('city', e.target.value)} style={inputStyle} />
              <input placeholder="State" value={formData.state} onChange={(e) => updateField('state', e.target.value)} style={inputStyle} />
              <input placeholder="ZIP Code" value={formData.zip} onChange={(e) => updateField('zip', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: darkMode ? '#a0aec0' : '#666' }}>Date of Birth</label>
                <input type="date" value={formData.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: darkMode ? '#a0aec0' : '#666' }}>SSN (Last 4 digits)</label>
                <input type="password" maxLength={4} placeholder="****" value={formData.ssnLast4} onChange={(e) => updateField('ssnLast4', e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color={colors.teal} /> Form W-4 (Employee Withholding Certificate)</h2>
            <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '20px' }}>Review the W-4 form below and click "I Agree and Sign" to acknowledge.</p>
            <div style={{ border: `1px solid ${borderColor}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
              <iframe src={PDF_URLS.w4} style={{ width: '100%', height: '600px', border: 'none' }} title="Form W-4" />
            </div>
            {documents.w4.signed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.green, padding: '15px', backgroundColor: 'rgba(46, 153, 75, 0.1)', borderRadius: '8px' }}><CheckCircle /> Document signed on {new Date(documents.w4.signedAt).toLocaleString()}</div>
            ) : (
              <button onClick={() => signDocument('w4')} style={{ padding: '16px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={20} /> I Agree and Sign</button>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><CreditCard color={colors.teal} /> Direct Deposit Setup</h2>
            <input placeholder="Bank Name *" value={formData.bankName} onChange={(e) => updateField('bankName', e.target.value)} style={inputStyle} />
            <input placeholder="Routing Number (9 digits) *" value={formData.routingNumber} onChange={(e) => updateField('routingNumber', e.target.value)} style={inputStyle} />
            <input placeholder="Account Number *" value={formData.accountNumber} onChange={(e) => updateField('accountNumber', e.target.value)} style={inputStyle} />
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>Account Type</label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="accountType" value="checking" checked={formData.accountType === 'checking'} onChange={(e) => updateField('accountType', e.target.value)} />Checking</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="accountType" value="savings" checked={formData.accountType === 'savings'} onChange={(e) => updateField('accountType', e.target.value)} />Savings</label>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Heart color={colors.teal} /> Emergency Contact</h2>
            <input placeholder="Contact Name *" value={formData.emergencyName} onChange={(e) => updateField('emergencyName', e.target.value)} style={inputStyle} />
            <input placeholder="Relationship (e.g., Spouse, Parent)" value={formData.emergencyRelationship} onChange={(e) => updateField('emergencyRelationship', e.target.value)} style={inputStyle} />
            <input type="tel" placeholder="Phone Number *" value={formData.emergencyPhone} onChange={(e) => updateField('emergencyPhone', e.target.value)} style={inputStyle} />
          </div>
        )}

        {step === 5 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Shield color={colors.teal} /> Safety Acknowledgment</h2>
            <div style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'white', padding: '25px', borderRadius: '8px', marginBottom: '25px', border: `1px solid ${borderColor}` }}>
              <h3 style={{ marginBottom: '15px' }}>LYT Communications Safety Policy</h3>
              <ul style={{ color: darkMode ? '#a0aec0' : '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>I will follow all safety protocols and procedures at all times.</li>
                <li>I will wear required Personal Protective Equipment (PPE) when necessary.</li>
                <li>I will report all injuries, near-misses, and unsafe conditions immediately.</li>
                <li>I will complete all required safety training before beginning field work.</li>
                <li>I will not operate equipment I have not been trained on.</li>
                <li>I understand that safety violations may result in disciplinary action.</li>
              </ul>
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.safetyAcknowledged} onChange={(e) => updateField('safetyAcknowledged', e.target.checked)} style={{ marginTop: '4px', width: '20px', height: '20px' }} />
              <span>I have read, understand, and agree to comply with LYT Communications safety policies.</span>
            </label>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button onClick={() => setStep(step - 1)} disabled={step === 1} style={{ padding: '14px 30px', backgroundColor: step === 1 ? 'transparent' : cardBg, color: step === 1 ? 'transparent' : textColor, border: step === 1 ? 'none' : `1px solid ${borderColor}`, borderRadius: '8px', cursor: step === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowLeft size={20} /> Previous</button>
          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} disabled={!canProceed()} style={{ padding: '14px 30px', background: canProceed() ? `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})` : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0'), color: canProceed() ? 'white' : (darkMode ? '#666' : '#999'), border: 'none', borderRadius: '8px', cursor: canProceed() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>Next <ArrowRight size={20} /></button>
          ) : (
            <button onClick={submitOnboarding} disabled={!canProceed() || submitting} style={{ padding: '14px 40px', background: canProceed() ? `linear-gradient(135deg, ${colors.green}, #28a745)` : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0'), color: canProceed() ? 'white' : (darkMode ? '#666' : '#999'), border: 'none', borderRadius: '8px', cursor: canProceed() && !submitting ? 'pointer' : 'not-allowed', fontWeight: '600' }}>{submitting ? 'Submitting...' : 'Complete Onboarding'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ContractorOnboarding({ onBack, darkMode }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '', dba: '', entityType: '', ein: '',
    companyAddress: '', companyCity: '', companyState: '', companyZip: '',
    contactName: '', contactTitle: '', contactEmail: '', contactPhone: '',
    insuranceCarrier: '', policyNumber: '', insuranceExpiration: '', coiUploaded: false,
    fleet: [{ type: '', makeModel: '', year: '', vin: '' }],
    personnel: [{ name: '', role: '', phone: '', certifications: '' }],
    skills: {},
    rateCardAccepted: false,
    bankName: '', routingNumber: '', accountNumber: '', accountType: 'checking'
  });
  const [documents, setDocuments] = useState({ msa: { signed: false, signedAt: null }, w9: { signed: false, signedAt: null } });
  const [coiFile, setCoiFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  const totalSteps = 8;
  const bgColor = darkMode ? colors.darkBg : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa';
  const inputBg = darkMode ? 'rgba(255,255,255,0.08)' : 'white';
  const borderColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const updateSkill = (skill, value) => setFormData(prev => ({ ...prev, skills: { ...prev.skills, [skill]: value } }));
  const signDocument = (docName) => setDocuments(prev => ({ ...prev, [docName]: { signed: true, signedAt: new Date().toISOString() } }));

  const handleCoiUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoiFile({ name: file.name, mimeType: file.type, data: reader.result.split(',')[1] });
        updateField('coiUploaded', true);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFleetItem = () => setFormData(prev => ({ ...prev, fleet: [...prev.fleet, { type: '', makeModel: '', year: '', vin: '' }] }));
  const addPersonnel = () => setFormData(prev => ({ ...prev, personnel: [...prev.personnel, { name: '', role: '', phone: '', certifications: '' }] }));
  const updateFleet = (index, field, value) => { const newFleet = [...formData.fleet]; newFleet[index][field] = value; setFormData(prev => ({ ...prev, fleet: newFleet })); };
  const updatePersonnel = (index, field, value) => { const newPersonnel = [...formData.personnel]; newPersonnel[index][field] = value; setFormData(prev => ({ ...prev, personnel: newPersonnel })); };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.companyName && formData.contactName && formData.contactEmail;
      case 2: return documents.msa.signed;
      case 3: return documents.w9.signed;
      case 4: return formData.coiUploaded;
      case 5: return true;
      case 6: return Object.values(formData.skills).some(v => v);
      case 7: return formData.rateCardAccepted;
      case 8: return formData.bankName && formData.routingNumber && formData.accountNumber;
      default: return false;
    }
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    setError(null);
    const payload = { type: 'contractor', formData: { ...formData, accountLast4: formData.accountNumber.slice(-4) }, documents, coiFile };
    try {
      const response = await fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();
      if (result.success) { setCompleted(true); } else { setError(result.error || 'Submission failed. Please try again.'); }
    } catch (err) {
      setError('Network error. Your data has been saved locally. Please contact us.');
      localStorage.setItem('lyt_contractor_onboarding_backup', JSON.stringify(payload));
    }
    setSubmitting(false);
  };

  const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${borderColor}`, backgroundColor: inputBg, color: textColor, fontSize: '1rem', marginBottom: '15px' };

  if (completed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <CheckCircle size={80} color={colors.green} style={{ marginBottom: '30px' }} />
          <h1 style={{ marginBottom: '20px' }}>Registration Complete!</h1>
          <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '30px' }}>Your contractor registration is complete. We will review your information and be in touch within 2-3 business days.</p>
          <button onClick={onBack} style={{ padding: '14px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>Return to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
      <div style={{ padding: '20px', borderBottom: `1px solid ${borderColor}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: colors.teal, cursor: 'pointer', fontSize: '1rem' }}><ArrowLeft size={20} /> Back</button>
          <span style={{ fontWeight: '600' }}>Contractor Registration</span>
          <span style={{ color: darkMode ? '#a0aec0' : '#666' }}>Step {step} of {totalSteps}</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[1,2,3,4,5,6,7,8].map(s => (<div key={s} style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: s <= step ? colors.teal : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0') }} />))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        {error && (<div style={{ backgroundColor: 'rgba(232, 90, 79, 0.2)', border: `1px solid ${colors.coral}`, padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertCircle color={colors.coral} />{error}</div>)}

        {step === 1 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Building color={colors.teal} /> Company Information</h2>
            <input placeholder="Company Name *" value={formData.companyName} onChange={(e) => updateField('companyName', e.target.value)} style={inputStyle} />
            <input placeholder="DBA (if different)" value={formData.dba} onChange={(e) => updateField('dba', e.target.value)} style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <select value={formData.entityType} onChange={(e) => updateField('entityType', e.target.value)} style={inputStyle}>
                <option value="">Entity Type</option>
                <option value="LLC">LLC</option>
                <option value="Corporation">Corporation</option>
                <option value="Sole Proprietor">Sole Proprietor</option>
                <option value="Partnership">Partnership</option>
              </select>
              <input placeholder="EIN" value={formData.ein} onChange={(e) => updateField('ein', e.target.value)} style={inputStyle} />
            </div>
            <input placeholder="Company Address" value={formData.companyAddress} onChange={(e) => updateField('companyAddress', e.target.value)} style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
              <input placeholder="City" value={formData.companyCity} onChange={(e) => updateField('companyCity', e.target.value)} style={inputStyle} />
              <input placeholder="State" value={formData.companyState} onChange={(e) => updateField('companyState', e.target.value)} style={inputStyle} />
              <input placeholder="ZIP" value={formData.companyZip} onChange={(e) => updateField('companyZip', e.target.value)} style={inputStyle} />
            </div>
            <h3 style={{ marginTop: '30px', marginBottom: '20px', color: colors.teal }}>Primary Contact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <input placeholder="Contact Name *" value={formData.contactName} onChange={(e) => updateField('contactName', e.target.value)} style={inputStyle} />
              <input placeholder="Title" value={formData.contactTitle} onChange={(e) => updateField('contactTitle', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <input type="email" placeholder="Email *" value={formData.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} style={inputStyle} />
              <input type="tel" placeholder="Phone" value={formData.contactPhone} onChange={(e) => updateField('contactPhone', e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color={colors.teal} /> Master Subcontractor Agreement</h2>
            <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '20px' }}>Review the MSA below and click "I Agree and Sign" to acknowledge acceptance of all terms.</p>
            <div style={{ border: `1px solid ${borderColor}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
              <iframe src={PDF_URLS.msa} style={{ width: '100%', height: '600px', border: 'none' }} title="Master Subcontractor Agreement" />
            </div>
            {documents.msa.signed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.green, padding: '15px', backgroundColor: 'rgba(46, 153, 75, 0.1)', borderRadius: '8px' }}><CheckCircle /> MSA signed on {new Date(documents.msa.signedAt).toLocaleString()}</div>
            ) : (
              <button onClick={() => signDocument('msa')} style={{ padding: '16px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={20} /> I Agree and Sign</button>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText color={colors.teal} /> Form W-9 (Taxpayer Identification)</h2>
            <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '20px' }}>Review the W-9 form below and click "I Agree and Sign" to acknowledge.</p>
            <div style={{ border: `1px solid ${borderColor}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
              <iframe src={PDF_URLS.w9} style={{ width: '100%', height: '600px', border: 'none' }} title="Form W-9" />
            </div>
            {documents.w9.signed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.green, padding: '15px', backgroundColor: 'rgba(46, 153, 75, 0.1)', borderRadius: '8px' }}><CheckCircle /> W-9 signed on {new Date(documents.w9.signedAt).toLocaleString()}</div>
            ) : (
              <button onClick={() => signDocument('w9')} style={{ padding: '16px 40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={20} /> I Agree and Sign</button>
            )}
          </div>
        )}

        {step === 4 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Shield color={colors.teal} /> Insurance and Certificate of Insurance</h2>
            <input placeholder="Insurance Carrier" value={formData.insuranceCarrier} onChange={(e) => updateField('insuranceCarrier', e.target.value)} style={inputStyle} />
            <input placeholder="Policy Number" value={formData.policyNumber} onChange={(e) => updateField('policyNumber', e.target.value)} style={inputStyle} />
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: darkMode ? '#a0aec0' : '#666' }}>Expiration Date</label>
              <input type="date" value={formData.insuranceExpiration} onChange={(e) => updateField('insuranceExpiration', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ border: `2px dashed ${borderColor}`, borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '20px' }}>
              <Upload size={48} color={colors.teal} style={{ marginBottom: '15px' }} />
              <h3 style={{ marginBottom: '10px' }}>Upload Certificate of Insurance</h3>
              <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '20px' }}>PDF or image file (max 10MB)</p>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleCoiUpload} style={{ display: 'none' }} id="coi-upload" />
              <label htmlFor="coi-upload" style={{ padding: '12px 30px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', borderRadius: '8px', cursor: 'pointer', display: 'inline-block', fontWeight: '600' }}>Select File</label>
            </div>
            {coiFile && (<div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.green, padding: '15px', backgroundColor: 'rgba(46, 153, 75, 0.1)', borderRadius: '8px' }}><CheckCircle /> {coiFile.name} uploaded successfully</div>)}
          </div>
        )}

        {step === 5 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Truck color={colors.teal} /> Fleet and Personnel</h2>
            <h3 style={{ marginBottom: '20px' }}>Equipment / Vehicles</h3>
            {formData.fleet.map((item, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
                <input placeholder="Type (Truck, Drill, etc.)" value={item.type} onChange={(e) => updateFleet(index, 'type', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="Make/Model" value={item.makeModel} onChange={(e) => updateFleet(index, 'makeModel', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="Year" value={item.year} onChange={(e) => updateFleet(index, 'year', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="VIN/ID" value={item.vin} onChange={(e) => updateFleet(index, 'vin', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
              </div>
            ))}
            <button onClick={addFleetItem} style={{ background: 'none', border: `1px dashed ${borderColor}`, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', color: colors.teal, marginBottom: '40px' }}>+ Add Equipment</button>
            <h3 style={{ marginBottom: '20px' }}>Personnel</h3>
            {formData.personnel.map((person, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
                <input placeholder="Name" value={person.name} onChange={(e) => updatePersonnel(index, 'name', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="Role" value={person.role} onChange={(e) => updatePersonnel(index, 'role', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="Phone" value={person.phone} onChange={(e) => updatePersonnel(index, 'phone', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
                <input placeholder="Certifications" value={person.certifications} onChange={(e) => updatePersonnel(index, 'certifications', e.target.value)} style={{...inputStyle, marginBottom: 0}} />
              </div>
            ))}
            <button onClick={addPersonnel} style={{ background: 'none', border: `1px dashed ${borderColor}`, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', color: colors.teal }}>+ Add Personnel</button>
          </div>
        )}

        {step === 6 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Wrench color={colors.teal} /> Capabilities and Skills</h2>
            <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '25px' }}>Select all services your company can provide:</p>
            {[
              { key: 'hddDrilling', label: 'Horizontal Directional Drilling (HDD)' },
              { key: 'fiberSplicing', label: 'Fiber Optic Splicing' },
              { key: 'aerialConstruction', label: 'Aerial Construction' },
              { key: 'undergroundConstruction', label: 'Underground Construction' },
              { key: 'cableInstallation', label: 'Cable Installation' },
              { key: 'testing', label: 'Testing and Quality Assurance' },
              { key: 'restoration', label: 'Site Restoration' },
              { key: 'permitting', label: 'Permitting Support' }
            ].map(skill => (
              <label key={skill.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', backgroundColor: formData.skills[skill.key] ? 'rgba(0, 180, 216, 0.1)' : 'transparent', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', border: `1px solid ${formData.skills[skill.key] ? colors.teal : borderColor}` }}>
                <input type="checkbox" checked={formData.skills[skill.key] || false} onChange={(e) => updateSkill(skill.key, e.target.checked)} style={{ width: '20px', height: '20px' }} />
                {skill.label}
              </label>
            ))}
          </div>
        )}

        {step === 7 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><DollarSign color={colors.teal} /> Rate Card Acceptance</h2>
            <p style={{ color: darkMode ? '#a0aec0' : '#666', marginBottom: '20px' }}>Please review LYT Communications current rate card. Rates may vary by project.</p>
            <a href={RATE_CARD_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 25px', backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'white', border: `1px solid ${borderColor}`, borderRadius: '8px', color: colors.teal, textDecoration: 'none', fontWeight: '600', marginBottom: '30px' }}><Eye size={20} /> View Rate Card</a>
            <div style={{ backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : 'white', padding: '25px', borderRadius: '8px', marginBottom: '25px', border: `1px solid ${borderColor}` }}>
              <p style={{ lineHeight: '1.8' }}>By checking the box below, I acknowledge that I have reviewed LYT Communications rate card and understand that rates are project-specific and will be confirmed in each Statement of Work (SOW).</p>
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.rateCardAccepted} onChange={(e) => updateField('rateCardAccepted', e.target.checked)} style={{ marginTop: '4px', width: '20px', height: '20px' }} />
              <span>I have reviewed and accept the current rate card terms.</span>
            </label>
          </div>
        )}

        {step === 8 && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><CreditCard color={colors.teal} /> Banking / Payment Information</h2>
            <input placeholder="Bank Name *" value={formData.bankName} onChange={(e) => updateField('bankName', e.target.value)} style={inputStyle} />
            <input placeholder="Routing Number (9 digits) *" value={formData.routingNumber} onChange={(e) => updateField('routingNumber', e.target.value)} style={inputStyle} />
            <input placeholder="Account Number *" value={formData.accountNumber} onChange={(e) => updateField('accountNumber', e.target.value)} style={inputStyle} />
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>Account Type</label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="cAccountType" value="checking" checked={formData.accountType === 'checking'} onChange={(e) => updateField('accountType', e.target.value)} />Checking</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="radio" name="cAccountType" value="savings" checked={formData.accountType === 'savings'} onChange={(e) => updateField('accountType', e.target.value)} />Savings</label>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button onClick={() => setStep(step - 1)} disabled={step === 1} style={{ padding: '14px 30px', backgroundColor: step === 1 ? 'transparent' : cardBg, color: step === 1 ? 'transparent' : textColor, border: step === 1 ? 'none' : `1px solid ${borderColor}`, borderRadius: '8px', cursor: step === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowLeft size={20} /> Previous</button>
          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} disabled={!canProceed()} style={{ padding: '14px 30px', background: canProceed() ? `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})` : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0'), color: canProceed() ? 'white' : (darkMode ? '#666' : '#999'), border: 'none', borderRadius: '8px', cursor: canProceed() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>Next <ArrowRight size={20} /></button>
          ) : (
            <button onClick={submitOnboarding} disabled={!canProceed() || submitting} style={{ padding: '14px 40px', background: canProceed() ? `linear-gradient(135deg, ${colors.green}, #28a745)` : (darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0'), color: canProceed() ? 'white' : (darkMode ? '#666' : '#999'), border: 'none', borderRadius: '8px', cursor: canProceed() && !submitting ? 'pointer' : 'not-allowed', fontWeight: '600' }}>{submitting ? 'Submitting...' : 'Complete Registration'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmployeeLogin({ onLogin, onBack, darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const bgColor = darkMode ? colors.darkBg : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa';
  const inputBg = darkMode ? 'rgba(255,255,255,0.08)' : 'white';
  const borderColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  const users = [
    { email: 'matt@lytcomm.com', password: 'demo123', name: 'Matt Roy', role: 'admin' },
    { email: 'john@lytcomm.com', password: 'demo123', name: 'John Smith', role: 'supervisor' },
    { email: 'sarah@lytcomm.com', password: 'demo123', name: 'Sarah Johnson', role: 'employee' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { onLogin(user); } else { setError('Invalid email or password'); }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: colors.teal, cursor: 'pointer', marginBottom: '30px' }}><ArrowLeft size={20} /> Back to Portal</button>
        <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '60px', height: '60px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold', color: 'white', fontSize: '1.5rem' }}>LYT</div>
            <h2>Employee Login</h2>
          </div>
          {error && (<div style={{ backgroundColor: 'rgba(232, 90, 79, 0.2)', border: `1px solid ${colors.coral}`, padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>)}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${borderColor}`, backgroundColor: inputBg, color: textColor, fontSize: '1rem', marginBottom: '15px' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${borderColor}`, backgroundColor: inputBg, color: textColor, fontSize: '1rem', marginBottom: '25px' }} />
            <button type="submit" style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          </form>
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: darkMode ? 'rgba(0,0,0,0.2)' : '#e9ecef', borderRadius: '8px', fontSize: '0.9rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '10px' }}>Demo Accounts:</p>
            <p style={{ color: darkMode ? '#a0aec0' : '#666' }}>matt@lytcomm.com / demo123</p>
            <p style={{ color: darkMode ? '#a0aec0' : '#666' }}>john@lytcomm.com / demo123</p>
            <p style={{ color: darkMode ? '#a0aec0' : '#666' }}>sarah@lytcomm.com / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeDashboard({ user, onLogout, darkMode, setDarkMode }) {
  const [activePage, setActivePage] = useState('dashboard');

  const bgColor = darkMode ? colors.darkBg : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a1a2e';
  const sidebarBg = darkMode ? colors.darkNavy : '#f8f9fa';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#ffffff';
  const mutedColor = darkMode ? '#a0aec0' : '#666666';

  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'timeclock', icon: <Clock size={20} />, label: 'Time Clock' },
    { id: 'projects', icon: <Briefcase size={20} />, label: 'Projects' },
    { id: 'files', icon: <FolderOpen size={20} />, label: 'Files' },
    { id: 'team', icon: <Users size={20} />, label: 'Team' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
      <aside style={{ width: '250px', backgroundColor: sidebarBg, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${colors.oceanBlue}, ${colors.teal})`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>LYT</div>
          <span style={{ fontWeight: '600' }}>Employee Portal</span>
        </div>
        <nav style={{ flex: 1 }}>
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', marginBottom: '8px', backgroundColor: activePage === item.id ? `${colors.oceanBlue}20` : 'transparent', color: activePage === item.id ? colors.teal : mutedColor, border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' }}>{item.icon}{item.label}</button>
          ))}
        </nav>
        <div style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: colors.teal, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>{user.name.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user.name}</div>
              <div style={{ color: mutedColor, fontSize: '0.85rem', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ flex: 1, padding: '10px', backgroundColor: cardBg, border: 'none', borderRadius: '8px', cursor: 'pointer', color: mutedColor }}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button onClick={onLogout} style={{ flex: 1, padding: '10px', backgroundColor: cardBg, border: 'none', borderRadius: '8px', cursor: 'pointer', color: colors.coral }}><LogOut size={18} /></button>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ marginBottom: '5px' }}>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p style={{ color: mutedColor }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {activePage === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {[
                { label: 'Hours This Week', value: '32.5', color: colors.oceanBlue },
                { label: 'Active Projects', value: '3', color: colors.teal },
                { label: 'Pending Tasks', value: '7', color: colors.green },
                { label: 'PTO Balance', value: '12 days', color: colors.coral }
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: cardBg, padding: '25px', borderRadius: '12px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
                  <div style={{ color: mutedColor, marginBottom: '10px' }}>{stat.label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: cardBg, padding: '25px', borderRadius: '12px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
              <h3 style={{ marginBottom: '20px' }}>Recent Announcements</h3>
              {[
                { title: 'Safety Meeting Tomorrow', date: 'Jan 17', desc: 'Mandatory safety briefing at 7:00 AM' },
                { title: 'New Project Kickoff', date: 'Jan 15', desc: 'AT&T fiber expansion starting Monday' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '15px 0', borderBottom: i < 1 ? `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0'}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>{item.title}</span>
                    <span style={{ color: mutedColor, fontSize: '0.9rem' }}>{item.date}</span>
                  </div>
                  <p style={{ color: mutedColor }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === 'timeclock' && (
          <div style={{ backgroundColor: cardBg, padding: '40px', borderRadius: '16px', textAlign: 'center', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
            <Clock size={60} color={colors.teal} style={{ marginBottom: '20px' }} />
            <h2 style={{ marginBottom: '10px' }}>Time Clock</h2>
            <p style={{ color: mutedColor, marginBottom: '30px' }}>You are currently clocked out</p>
            <button style={{ padding: '20px 60px', background: `linear-gradient(135deg, ${colors.green}, #28a745)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem', fontWeight: '700', cursor: 'pointer' }}>Clock In</button>
          </div>
        )}

        {activePage === 'projects' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>My Projects</h2>
            {[
              { name: 'AT&T Fiber - Webster', status: 'In Progress', progress: 65 },
              { name: 'Comcast Expansion - Clear Lake', status: 'In Progress', progress: 30 },
              { name: 'Municipal Network - League City', status: 'Pending', progress: 0 }
            ].map((project, i) => (
              <div key={i} style={{ backgroundColor: cardBg, padding: '20px', borderRadius: '12px', marginBottom: '15px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600' }}>{project.name}</span>
                  <span style={{ color: project.status === 'In Progress' ? colors.green : colors.coral }}>{project.status}</span>
                </div>
                <div style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e0e0e0', borderRadius: '4px', height: '8px' }}>
                  <div style={{ width: `${project.progress}%`, backgroundColor: colors.teal, borderRadius: '4px', height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activePage === 'files' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Documents</h2>
            {['Employee Handbook', 'Safety Manual', 'W-4 Form', 'Direct Deposit Form'].map((file, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: cardBg, padding: '15px 20px', borderRadius: '8px', marginBottom: '10px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FileText color={colors.teal} />{file}</div>
                <Download size={20} color={mutedColor} style={{ cursor: 'pointer' }} />
              </div>
            ))}
          </div>
        )}

        {activePage === 'team' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Team Directory</h2>
            {[
              { name: 'Matt Roy', role: 'Owner', phone: '(281) 555-0100', email: 'matt@lytcomm.com' },
              { name: 'John Smith', role: 'Site Supervisor', phone: '(281) 555-0101', email: 'john@lytcomm.com' },
              { name: 'Sarah Johnson', role: 'Field Technician', phone: '(281) 555-0102', email: 'sarah@lytcomm.com' }
            ].map((member, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: cardBg, padding: '20px', borderRadius: '12px', marginBottom: '15px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e0e0e0' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: colors.teal, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>{member.name.split(' ').map(n => n[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>{member.name}</div>
                  <div style={{ color: mutedColor }}>{member.role}</div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href={`tel:${member.phone}`} style={{ color: colors.oceanBlue }}><Phone size={20} /></a>
                  <a href={`mailto:${member.email}`} style={{ color: colors.teal }}><Mail size={20} /></a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
