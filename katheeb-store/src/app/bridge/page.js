'use client';

import { useState } from 'react';

export default function SallaBridgePage() {
  const [email, setEmail] = useState('');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🌉</span>
          <span style={styles.logoText}>SallaBridge</span>
        </div>
        <nav style={styles.nav}>
          <a href="#features" style={styles.navLink}>المميزات</a>
          <a href="#how-it-works" style={styles.navLink}>كيف يعمل</a>
          <a href="/bridge/docs" style={styles.navLink}>التوثيق</a>
          <a href="#pricing" style={styles.navLink}>الأسعار</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          اربط موقعك الخارجي مع <span style={styles.highlight}>سلة</span>
        </h1>
        <p style={styles.heroSubtitle}>
          صمم موقعك على أي منصة واربطه مع متجرك في سلة بسهولة تامة
        </p>
        <div style={styles.heroCta}>
          <a href="https://s.salla.sa/apps" style={styles.primaryBtn}>
            ثبّت التطبيق مجاناً
          </a>
          <a href="/bridge/docs" style={styles.secondaryBtn}>
            اقرأ التوثيق
          </a>
        </div>
        <div style={styles.heroCode}>
          <code style={styles.codeBlock}>
{`// جلب المنتجات من أي موقع
fetch('https://api.sallabridge.com/v1/products', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
})`}
          </code>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <h2 style={styles.sectionTitle}>لماذا SallaBridge؟</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎨</div>
            <h3 style={styles.featureTitle}>حرية التصميم</h3>
            <p style={styles.featureDesc}>صمم موقعك كما تريد على WordPress, React, أو أي منصة</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>سهولة الربط</h3>
            <p style={styles.featureDesc}>ثبّت التطبيق واحصل على API Key خلال دقائق</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔐</div>
            <h3 style={styles.featureTitle}>آمن وموثوق</h3>
            <p style={styles.featureDesc}>اتصال مشفر ومصادقة قوية لحماية بياناتك</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📦</div>
            <h3 style={styles.featureTitle}>مزامنة فورية</h3>
            <p style={styles.featureDesc}>المنتجات والطلبات تتزامن تلقائياً مع سلة</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💳</div>
            <h3 style={styles.featureTitle}>الدفع من سلة</h3>
            <p style={styles.featureDesc}>استخدم بوابات الدفع المفعلة في متجرك</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>إدارة موحدة</h3>
            <p style={styles.featureDesc}>أدر كل شيء من لوحة تحكم سلة المعتادة</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>كيف يعمل؟</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>ثبّت التطبيق</h3>
            <p style={styles.stepDesc}>من متجر تطبيقات سلة، ابحث عن SallaBridge وثبّته</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>احصل على API Key</h3>
            <p style={styles.stepDesc}>بعد التثبيت، ستحصل على مفتاح API خاص بمتجرك</p>
          </div>
          <div style={styles.stepArrow}>→</div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>اربط موقعك</h3>
            <p style={styles.stepDesc}>أضف المفتاح لموقعك وابدأ بجلب المنتجات</p>
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section style={styles.apiPreview}>
        <h2 style={styles.sectionTitle}>API سهل وقوي</h2>
        <div style={styles.apiGrid}>
          <div style={styles.apiEndpoint}>
            <div style={styles.apiMethod}>GET</div>
            <code>/v1/products</code>
            <span style={styles.apiDesc}>جلب جميع المنتجات</span>
          </div>
          <div style={styles.apiEndpoint}>
            <div style={styles.apiMethod}>GET</div>
            <code>/v1/products/:id</code>
            <span style={styles.apiDesc}>جلب منتج محدد</span>
          </div>
          <div style={styles.apiEndpoint}>
            <div style={styles.apiMethod}>GET</div>
            <code>/v1/categories</code>
            <span style={styles.apiDesc}>جلب التصنيفات</span>
          </div>
          <div style={styles.apiEndpoint}>
            <div style={styles.apiMethodPost}>POST</div>
            <code>/v1/orders</code>
            <span style={styles.apiDesc}>إنشاء طلب جديد</span>
          </div>
        </div>
        <a href="/bridge/docs" style={styles.docsLink}>
          اقرأ التوثيق الكامل ←
        </a>
      </section>

      {/* Pricing */}
      <section id="pricing" style={styles.pricing}>
        <h2 style={styles.sectionTitle}>الأسعار</h2>
        <div style={styles.pricingGrid}>
          <div style={styles.pricingCard}>
            <h3 style={styles.pricingName}>مجاني</h3>
            <div style={styles.pricingPrice}>0 <span>ر.س/شهر</span></div>
            <ul style={styles.pricingFeatures}>
              <li>✓ 100 طلب API يومياً</li>
              <li>✓ جلب المنتجات</li>
              <li>✓ دعم فني عبر البريد</li>
            </ul>
            <a href="#" style={styles.pricingBtn}>ابدأ مجاناً</a>
          </div>
          <div style={{...styles.pricingCard, ...styles.pricingCardPro}}>
            <div style={styles.pricingBadge}>الأكثر شعبية</div>
            <h3 style={styles.pricingName}>برو</h3>
            <div style={styles.pricingPrice}>99 <span>ر.س/شهر</span></div>
            <ul style={styles.pricingFeatures}>
              <li>✓ طلبات API غير محدودة</li>
              <li>✓ جميع الـ Endpoints</li>
              <li>✓ إنشاء الطلبات</li>
              <li>✓ Webhooks</li>
              <li>✓ دعم فني أولوية</li>
            </ul>
            <a href="#" style={{...styles.pricingBtn, ...styles.pricingBtnPro}}>اشترك الآن</a>
          </div>
          <div style={styles.pricingCard}>
            <h3 style={styles.pricingName}>مؤسسات</h3>
            <div style={styles.pricingPrice}>تواصل معنا</div>
            <ul style={styles.pricingFeatures}>
              <li>✓ كل مميزات برو</li>
              <li>✓ SLA مخصص</li>
              <li>✓ دعم فني 24/7</li>
              <li>✓ تخصيصات خاصة</li>
            </ul>
            <a href="#" style={styles.pricingBtn}>تواصل معنا</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <span style={styles.logoIcon}>🌉</span>
            <span style={styles.logoText}>SallaBridge</span>
          </div>
          <p style={styles.footerDesc}>
            اربط موقعك الخارجي مع سلة بسهولة
          </p>
          <div style={styles.footerLinks}>
            <a href="/bridge/docs" style={styles.footerLink}>التوثيق</a>
            <a href="#" style={styles.footerLink}>الشروط والأحكام</a>
            <a href="#" style={styles.footerLink}>سياسة الخصوصية</a>
            <a href="#" style={styles.footerLink}>تواصل معنا</a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2024 SallaBridge. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Readex Pro', sans-serif",
    backgroundColor: '#0a0a0a',
    color: '#fff',
    minHeight: '100vh',
    direction: 'rtl',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    borderBottom: '1px solid #222',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#C9A96E',
  },
  nav: {
    display: 'flex',
    gap: '30px',
  },
  navLink: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
  hero: {
    textAlign: 'center',
    padding: '100px 20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  highlight: {
    color: '#C9A96E',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#999',
    marginBottom: '40px',
  },
  heroCta: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  primaryBtn: {
    backgroundColor: '#C9A96E',
    color: '#000',
    padding: '15px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#C9A96E',
    padding: '15px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    border: '1px solid #C9A96E',
  },
  heroCode: {
    backgroundColor: '#111',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'left',
    direction: 'ltr',
  },
  codeBlock: {
    color: '#C9A96E',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
  },
  features: {
    padding: '80px 50px',
    backgroundColor: '#111',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '50px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  featureDesc: {
    color: '#999',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  howItWorks: {
    padding: '80px 50px',
  },
  steps: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  step: {
    textAlign: 'center',
    flex: 1,
  },
  stepNumber: {
    width: '50px',
    height: '50px',
    backgroundColor: '#C9A96E',
    color: '#000',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 auto 15px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  stepDesc: {
    color: '#999',
    fontSize: '14px',
  },
  stepArrow: {
    fontSize: '30px',
    color: '#C9A96E',
  },
  apiPreview: {
    padding: '80px 50px',
    backgroundColor: '#111',
    textAlign: 'center',
  },
  apiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto 30px',
  },
  apiEndpoint: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    direction: 'ltr',
  },
  apiMethod: {
    backgroundColor: '#22c55e',
    color: '#000',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: '700',
  },
  apiMethodPost: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: '700',
  },
  apiDesc: {
    color: '#999',
    fontSize: '12px',
    marginRight: 'auto',
  },
  docsLink: {
    color: '#C9A96E',
    textDecoration: 'none',
    fontSize: '16px',
  },
  pricing: {
    padding: '80px 50px',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  pricingCard: {
    backgroundColor: '#111',
    padding: '40px 30px',
    borderRadius: '15px',
    textAlign: 'center',
    position: 'relative',
  },
  pricingCardPro: {
    border: '2px solid #C9A96E',
    transform: 'scale(1.05)',
  },
  pricingBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#C9A96E',
    color: '#000',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  pricingName: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px',
  },
  pricingPrice: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#C9A96E',
    marginBottom: '30px',
  },
  pricingFeatures: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '30px',
    textAlign: 'right',
  },
  pricingBtn: {
    display: 'block',
    backgroundColor: '#222',
    color: '#fff',
    padding: '15px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
  },
  pricingBtnPro: {
    backgroundColor: '#C9A96E',
    color: '#000',
  },
  footer: {
    backgroundColor: '#111',
    padding: '50px',
    marginTop: '50px',
  },
  footerContent: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  footerDesc: {
    color: '#999',
    marginTop: '10px',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
  },
  footerLink: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
  },
  footerBottom: {
    borderTop: '1px solid #222',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
  },
};
