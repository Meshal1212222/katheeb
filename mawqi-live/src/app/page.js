'use client';

export default function HomePage() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">موقعي لايف</span>
        </div>
        <nav className="nav">
          <a href="#features">المميزات</a>
          <a href="#how-it-works">كيف يعمل</a>
          <a href="/docs">التوثيق</a>
          <a href="#pricing">الأسعار</a>
        </nav>
        <a href="https://s.salla.sa/apps" className="cta-btn">ثبّت التطبيق</a>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">🎉 جديد - اربط موقعك مع سلة</div>
        <h1 className="hero-title">
          صمم موقعك <span className="highlight">بحريتك</span>
          <br />
          واربطه مع <span className="highlight">سلة</span>
        </h1>
        <p className="hero-subtitle">
          استخدم أي منصة لتصميم موقعك (WordPress, React, Webflow) واربطه مع متجرك في سلة.
          <br />
          المنتجات والطلبات تتزامن تلقائياً!
        </p>
        <div className="hero-buttons">
          <a href="https://s.salla.sa/apps" className="btn-primary">
            ابدأ مجاناً
            <span className="btn-arrow">←</span>
          </a>
          <a href="/docs" className="btn-secondary">
            اقرأ التوثيق
          </a>
        </div>

        {/* Code Preview */}
        <div className="code-preview">
          <div className="code-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="filename">fetch-products.js</span>
          </div>
          <pre className="code-content">
{`// جلب المنتجات من سلة
const products = await fetch('https://api.mawqi.live/v1/products', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
}).then(res => res.json());

// عرض المنتجات في موقعك
products.forEach(product => {
  console.log(product.name, product.price);
});`}
          </pre>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">لماذا موقعي لايف؟</h2>
        <p className="section-subtitle">كل ما تحتاجه لربط موقعك الخارجي مع سلة</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>حرية التصميم</h3>
            <p>صمم موقعك على أي منصة تريد - WordPress, React, Vue, Webflow, أو حتى HTML</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>ربط سريع</h3>
            <p>ثبّت التطبيق واحصل على API Key خلال دقيقة واحدة فقط</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>مزامنة فورية</h3>
            <p>المنتجات والمخزون والأسعار تتزامن تلقائياً مع سلة</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>بوابات الدفع</h3>
            <p>استخدم نفس بوابات الدفع المفعلة في سلة - مدى، تمارا، تابي</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>إدارة الطلبات</h3>
            <p>الطلبات من موقعك تظهر مباشرة في لوحة تحكم سلة</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>آمن وموثوق</h3>
            <p>اتصال مشفر ومصادقة قوية لحماية بيانات متجرك</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">كيف يعمل؟</h2>
        <p className="section-subtitle">ثلاث خطوات فقط للربط</p>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>ثبّت التطبيق</h3>
              <p>من متجر تطبيقات سلة، ابحث عن "موقعي لايف" واضغط تثبيت</p>
            </div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>احصل على API Key</h3>
              <p>بعد التثبيت، ستحصل تلقائياً على مفتاح API خاص بمتجرك</p>
            </div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>اربط موقعك</h3>
              <p>أضف المفتاح في موقعك وابدأ بجلب المنتجات وإرسال الطلبات</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="api-section">
        <h2 className="section-title">API سهل وقوي</h2>
        <p className="section-subtitle">كل ما تحتاجه في endpoints بسيطة</p>

        <div className="api-endpoints">
          <div className="endpoint">
            <div className="endpoint-method get">GET</div>
            <code>/v1/products</code>
            <span>جلب جميع المنتجات</span>
          </div>
          <div className="endpoint">
            <div className="endpoint-method get">GET</div>
            <code>/v1/products/:id</code>
            <span>جلب منتج محدد</span>
          </div>
          <div className="endpoint">
            <div className="endpoint-method get">GET</div>
            <code>/v1/categories</code>
            <span>جلب التصنيفات</span>
          </div>
          <div className="endpoint">
            <div className="endpoint-method post">POST</div>
            <code>/v1/orders</code>
            <span>إنشاء طلب جديد</span>
          </div>
          <div className="endpoint">
            <div className="endpoint-method get">GET</div>
            <code>/v1/orders/:id</code>
            <span>حالة الطلب</span>
          </div>
        </div>

        <a href="/docs" className="docs-link">اقرأ التوثيق الكامل ←</a>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <h2 className="section-title">الأسعار</h2>
        <p className="section-subtitle">ابدأ مجاناً وطوّر حسب احتياجك</p>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>مجاني</h3>
            <div className="price">0 <span>ر.س/شهر</span></div>
            <ul>
              <li>✓ 100 طلب API يومياً</li>
              <li>✓ جلب المنتجات</li>
              <li>✓ جلب التصنيفات</li>
              <li>✓ دعم عبر البريد</li>
            </ul>
            <a href="#" className="pricing-btn">ابدأ مجاناً</a>
          </div>

          <div className="pricing-card featured">
            <div className="badge">الأكثر شعبية</div>
            <h3>برو</h3>
            <div className="price">99 <span>ر.س/شهر</span></div>
            <ul>
              <li>✓ طلبات API غير محدودة</li>
              <li>✓ جميع الـ Endpoints</li>
              <li>✓ إنشاء الطلبات</li>
              <li>✓ Webhooks</li>
              <li>✓ دعم فني أولوية</li>
            </ul>
            <a href="#" className="pricing-btn primary">اشترك الآن</a>
          </div>

          <div className="pricing-card">
            <h3>مؤسسات</h3>
            <div className="price">تواصل معنا</div>
            <ul>
              <li>✓ كل مميزات برو</li>
              <li>✓ SLA مخصص</li>
              <li>✓ دعم 24/7</li>
              <li>✓ تخصيصات خاصة</li>
            </ul>
            <a href="#" className="pricing-btn">تواصل معنا</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>جاهز تربط موقعك مع سلة؟</h2>
        <p>ابدأ الآن مجاناً وشوف الفرق</p>
        <a href="https://s.salla.sa/apps" className="btn-primary large">
          ثبّت التطبيق مجاناً
          <span className="btn-arrow">←</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">موقعي لايف</span>
            <p>اربط موقعك الخارجي مع سلة بسهولة</p>
          </div>
          <div className="footer-links">
            <h4>روابط سريعة</h4>
            <a href="/docs">التوثيق</a>
            <a href="#pricing">الأسعار</a>
            <a href="#">الدعم الفني</a>
          </div>
          <div className="footer-links">
            <h4>قانوني</h4>
            <a href="#">الشروط والأحكام</a>
            <a href="#">سياسة الخصوصية</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 موقعي لايف. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          border-bottom: 1px solid #1a1a1a;
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 28px;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav {
          display: flex;
          gap: 35px;
        }

        .nav a {
          color: #888;
          font-size: 14px;
          transition: color 0.3s;
        }

        .nav a:hover {
          color: #fff;
        }

        .cta-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 100px 20px 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.3);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          color: #667eea;
          margin-bottom: 30px;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 25px;
        }

        .highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #888;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 16px 35px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
        }

        .btn-primary.large {
          padding: 20px 45px;
          font-size: 18px;
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          padding: 16px 35px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          border: 1px solid #667eea;
          transition: background 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .btn-arrow {
          transition: transform 0.3s;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(-5px);
        }

        /* Code Preview */
        .code-preview {
          background: #111;
          border-radius: 15px;
          overflow: hidden;
          text-align: left;
          direction: ltr;
          border: 1px solid #222;
        }

        .code-header {
          background: #1a1a1a;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27ca3f; }

        .filename {
          margin-right: auto;
          color: #666;
          font-size: 13px;
        }

        .code-content {
          padding: 25px;
          font-size: 14px;
          line-height: 1.7;
          color: #a78bfa;
          overflow-x: auto;
        }

        /* Features */
        .features {
          padding: 100px 50px;
          background: #0d0d0d;
        }

        .section-title {
          font-size: 38px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 15px;
        }

        .section-subtitle {
          text-align: center;
          color: #888;
          font-size: 18px;
          margin-bottom: 60px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: #111;
          padding: 35px;
          border-radius: 15px;
          border: 1px solid #1a1a1a;
          transition: border-color 0.3s, transform 0.3s;
        }

        .feature-card:hover {
          border-color: #333;
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .feature-card p {
          color: #888;
          font-size: 14px;
          line-height: 1.7;
        }

        /* How it Works */
        .how-it-works {
          padding: 100px 50px;
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          max-width: 1000px;
          margin: 0 auto;
        }

        .step {
          text-align: center;
          flex: 1;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          margin: 0 auto 20px;
        }

        .step-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .step-content p {
          color: #888;
          font-size: 14px;
          max-width: 250px;
          margin: 0 auto;
        }

        .step-line {
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          margin-top: -40px;
        }

        /* API Section */
        .api-section {
          padding: 100px 50px;
          background: #0d0d0d;
        }

        .api-endpoints {
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .endpoint {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px 25px;
          background: #111;
          border-radius: 10px;
          margin-bottom: 12px;
          border: 1px solid #1a1a1a;
          direction: ltr;
        }

        .endpoint-method {
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 700;
        }

        .endpoint-method.get {
          background: #22c55e;
          color: #000;
        }

        .endpoint-method.post {
          background: #3b82f6;
          color: #fff;
        }

        .endpoint code {
          color: #fff;
          font-size: 14px;
        }

        .endpoint span {
          color: #666;
          font-size: 13px;
          margin-right: auto;
        }

        .docs-link {
          display: block;
          text-align: center;
          color: #667eea;
          font-size: 16px;
        }

        /* Pricing */
        .pricing {
          padding: 100px 50px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .pricing-card {
          background: #111;
          padding: 40px 30px;
          border-radius: 15px;
          text-align: center;
          border: 1px solid #1a1a1a;
          position: relative;
        }

        .pricing-card.featured {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 6px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .pricing-card h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .price {
          font-size: 42px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 30px;
        }

        .price span {
          font-size: 16px;
          color: #666;
          font-weight: 400;
        }

        .pricing-card ul {
          list-style: none;
          text-align: right;
          margin-bottom: 30px;
        }

        .pricing-card li {
          padding: 10px 0;
          color: #999;
          font-size: 14px;
          border-bottom: 1px solid #1a1a1a;
        }

        .pricing-btn {
          display: block;
          padding: 15px;
          border-radius: 10px;
          background: #1a1a1a;
          color: #fff;
          font-weight: 600;
          transition: background 0.3s;
        }

        .pricing-btn:hover {
          background: #222;
        }

        .pricing-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 100px 20px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }

        .cta-section h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .cta-section p {
          color: #888;
          font-size: 18px;
          margin-bottom: 30px;
        }

        /* Footer */
        .footer {
          background: #0a0a0a;
          border-top: 1px solid #1a1a1a;
          padding: 60px 50px 30px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 50px;
          max-width: 1000px;
          margin: 0 auto 40px;
        }

        .footer-brand p {
          color: #666;
          margin-top: 15px;
          font-size: 14px;
        }

        .footer-links h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #888;
        }

        .footer-links a {
          display: block;
          color: #666;
          font-size: 14px;
          margin-bottom: 12px;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #1a1a1a;
          color: #444;
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 15px 20px;
          }

          .nav {
            display: none;
          }

          .hero-title {
            font-size: 32px;
          }

          .features-grid,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .steps {
            flex-direction: column;
            gap: 30px;
          }

          .step-line {
            width: 2px;
            height: 50px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
