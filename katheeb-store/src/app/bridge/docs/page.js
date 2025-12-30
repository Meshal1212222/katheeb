'use client';

import { useState } from 'react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <a href="/bridge" style={styles.logo}>
          <span style={styles.logoIcon}>🌉</span>
          <span style={styles.logoText}>SallaBridge</span>
        </a>
        <span style={styles.docsTitle}>التوثيق</span>
      </header>

      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <nav>
            <h3 style={styles.sidebarTitle}>البداية</h3>
            <a
              href="#getting-started"
              style={activeSection === 'getting-started' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('getting-started')}
            >
              البدء السريع
            </a>
            <a
              href="#installation"
              style={activeSection === 'installation' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('installation')}
            >
              تثبيت التطبيق
            </a>
            <a
              href="#authentication"
              style={activeSection === 'authentication' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('authentication')}
            >
              المصادقة
            </a>

            <h3 style={styles.sidebarTitle}>الـ API</h3>
            <a
              href="#products"
              style={activeSection === 'products' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('products')}
            >
              المنتجات
            </a>
            <a
              href="#categories"
              style={activeSection === 'categories' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('categories')}
            >
              التصنيفات
            </a>
            <a
              href="#orders"
              style={activeSection === 'orders' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('orders')}
            >
              الطلبات
            </a>

            <h3 style={styles.sidebarTitle}>أمثلة</h3>
            <a
              href="#examples-js"
              style={activeSection === 'examples-js' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('examples-js')}
            >
              JavaScript
            </a>
            <a
              href="#examples-react"
              style={activeSection === 'examples-react' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('examples-react')}
            >
              React
            </a>
            <a
              href="#examples-php"
              style={activeSection === 'examples-php' ? styles.sidebarLinkActive : styles.sidebarLink}
              onClick={() => setActiveSection('examples-php')}
            >
              PHP
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Getting Started */}
          <section id="getting-started" style={styles.section}>
            <h1 style={styles.pageTitle}>البدء السريع</h1>
            <p style={styles.intro}>
              SallaBridge يتيح لك ربط موقعك الخارجي مع متجرك في سلة بثلاث خطوات بسيطة.
            </p>

            <div style={styles.stepsBox}>
              <div style={styles.stepItem}>
                <div style={styles.stepNum}>1</div>
                <div>
                  <h4 style={styles.stepTitle}>ثبّت التطبيق</h4>
                  <p style={styles.stepText}>من متجر تطبيقات سلة، ابحث عن "SallaBridge" واضغط تثبيت</p>
                </div>
              </div>
              <div style={styles.stepItem}>
                <div style={styles.stepNum}>2</div>
                <div>
                  <h4 style={styles.stepTitle}>احصل على API Key</h4>
                  <p style={styles.stepText}>بعد التثبيت، ستجد مفتاح API الخاص بك في إعدادات التطبيق</p>
                </div>
              </div>
              <div style={styles.stepItem}>
                <div style={styles.stepNum}>3</div>
                <div>
                  <h4 style={styles.stepTitle}>ابدأ الاستخدام</h4>
                  <p style={styles.stepText}>استخدم المفتاح في موقعك لجلب المنتجات والطلبات</p>
                </div>
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" style={styles.section}>
            <h2 style={styles.sectionTitle}>المصادقة</h2>
            <p style={styles.text}>
              جميع طلبات الـ API تتطلب مفتاح API صالح. أضف المفتاح في header الطلب:
            </p>
            <div style={styles.codeBox}>
              <div style={styles.codeHeader}>Headers</div>
              <pre style={styles.code}>
{`X-API-Key: SK_your_api_key_here`}
              </pre>
            </div>

            <div style={styles.alertBox}>
              <strong>⚠️ تنبيه:</strong> لا تشارك مفتاح API الخاص بك مع أي شخص. احتفظ به في متغيرات البيئة.
            </div>
          </section>

          {/* Products API */}
          <section id="products" style={styles.section}>
            <h2 style={styles.sectionTitle}>المنتجات</h2>

            <div style={styles.endpoint}>
              <div style={styles.endpointHeader}>
                <span style={styles.methodGet}>GET</span>
                <code style={styles.endpointUrl}>/v1/products</code>
              </div>
              <p style={styles.endpointDesc}>جلب جميع منتجات المتجر</p>

              <h4 style={styles.subTitle}>مثال الطلب:</h4>
              <div style={styles.codeBox}>
                <div style={styles.codeHeader}>cURL</div>
                <pre style={styles.code}>
{`curl -X GET "https://katheeb.vercel.app/api/v1/products" \\
  -H "X-API-Key: SK_your_api_key"`}
                </pre>
              </div>

              <h4 style={styles.subTitle}>مثال الاستجابة:</h4>
              <div style={styles.codeBox}>
                <div style={styles.codeHeader}>JSON</div>
                <pre style={styles.code}>
{`{
  "success": true,
  "count": 10,
  "products": [
    {
      "id": 12345,
      "name": "منتج تجريبي",
      "description": "وصف المنتج",
      "price": 199.99,
      "currency": "SAR",
      "sale_price": null,
      "image": "https://cdn.salla.sa/...",
      "images": ["..."],
      "category": "الأزياء",
      "in_stock": true,
      "quantity": 50,
      "sku": "SKU-001"
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div style={styles.endpoint}>
              <div style={styles.endpointHeader}>
                <span style={styles.methodGet}>GET</span>
                <code style={styles.endpointUrl}>/v1/products/:id</code>
              </div>
              <p style={styles.endpointDesc}>جلب منتج محدد بالـ ID</p>

              <h4 style={styles.subTitle}>Parameters:</h4>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Parameter</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}><code>id</code></td>
                    <td style={styles.td}>integer</td>
                    <td style={styles.td}>معرف المنتج</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Categories */}
          <section id="categories" style={styles.section}>
            <h2 style={styles.sectionTitle}>التصنيفات</h2>

            <div style={styles.endpoint}>
              <div style={styles.endpointHeader}>
                <span style={styles.methodGet}>GET</span>
                <code style={styles.endpointUrl}>/v1/categories</code>
              </div>
              <p style={styles.endpointDesc}>جلب جميع تصنيفات المتجر</p>
            </div>
          </section>

          {/* Orders */}
          <section id="orders" style={styles.section}>
            <h2 style={styles.sectionTitle}>الطلبات</h2>

            <div style={styles.endpoint}>
              <div style={styles.endpointHeader}>
                <span style={styles.methodPost}>POST</span>
                <code style={styles.endpointUrl}>/v1/orders</code>
              </div>
              <p style={styles.endpointDesc}>إنشاء طلب جديد</p>

              <h4 style={styles.subTitle}>Body Parameters:</h4>
              <div style={styles.codeBox}>
                <div style={styles.codeHeader}>JSON</div>
                <pre style={styles.code}>
{`{
  "customer": {
    "name": "اسم العميل",
    "email": "email@example.com",
    "phone": "0512345678"
  },
  "items": [
    {
      "product_id": 12345,
      "quantity": 2
    }
  ],
  "shipping_address": {
    "city": "الرياض",
    "address": "العنوان الكامل"
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* JavaScript Examples */}
          <section id="examples-js" style={styles.section}>
            <h2 style={styles.sectionTitle}>مثال JavaScript</h2>

            <div style={styles.codeBox}>
              <div style={styles.codeHeader}>JavaScript (Fetch)</div>
              <pre style={styles.code}>
{`// جلب المنتجات
async function getProducts() {
  const response = await fetch('https://katheeb.vercel.app/api/v1/products', {
    headers: {
      'X-API-Key': 'SK_your_api_key'
    }
  });

  const data = await response.json();
  return data.products;
}

// استخدام
getProducts().then(products => {
  products.forEach(product => {
    console.log(product.name, product.price);
  });
});`}
              </pre>
            </div>
          </section>

          {/* React Examples */}
          <section id="examples-react" style={styles.section}>
            <h2 style={styles.sectionTitle}>مثال React</h2>

            <div style={styles.codeBox}>
              <div style={styles.codeHeader}>React Component</div>
              <pre style={styles.code}>
{`import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://katheeb.vercel.app/api/v1/products', {
      headers: {
        'X-API-Key': process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data.products);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price} ر.س</p>
        </div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </section>

          {/* PHP Examples */}
          <section id="examples-php" style={styles.section}>
            <h2 style={styles.sectionTitle}>مثال PHP</h2>

            <div style={styles.codeBox}>
              <div style={styles.codeHeader}>PHP</div>
              <pre style={styles.code}>
{`<?php
// جلب المنتجات
function getProducts($apiKey) {
    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://katheeb.vercel.app/api/v1/products',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'X-API-Key: ' . $apiKey
        ]
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// استخدام
$apiKey = 'SK_your_api_key';
$data = getProducts($apiKey);

foreach ($data['products'] as $product) {
    echo $product['name'] . ' - ' . $product['price'] . ' ر.س';
}
?>`}
              </pre>
            </div>
          </section>

        </main>
      </div>
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
    alignItems: 'center',
    gap: '20px',
    padding: '15px 30px',
    borderBottom: '1px solid #222',
    position: 'sticky',
    top: 0,
    backgroundColor: '#0a0a0a',
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '24px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#C9A96E',
  },
  docsTitle: {
    color: '#666',
    fontSize: '14px',
    paddingRight: '20px',
    borderRight: '1px solid #333',
  },
  layout: {
    display: 'flex',
  },
  sidebar: {
    width: '250px',
    padding: '30px 20px',
    borderLeft: '1px solid #222',
    position: 'sticky',
    top: '60px',
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
  },
  sidebarTitle: {
    color: '#666',
    fontSize: '12px',
    textTransform: 'uppercase',
    marginTop: '25px',
    marginBottom: '10px',
  },
  sidebarLink: {
    display: 'block',
    color: '#999',
    textDecoration: 'none',
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    marginBottom: '2px',
  },
  sidebarLinkActive: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    marginBottom: '2px',
    backgroundColor: '#1a1a1a',
    borderRight: '2px solid #C9A96E',
  },
  main: {
    flex: 1,
    padding: '40px 60px',
    maxWidth: '900px',
  },
  section: {
    marginBottom: '60px',
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #222',
  },
  subTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#ccc',
  },
  intro: {
    fontSize: '18px',
    color: '#999',
    lineHeight: '1.7',
    marginBottom: '30px',
  },
  text: {
    color: '#ccc',
    lineHeight: '1.7',
    marginBottom: '20px',
  },
  stepsBox: {
    backgroundColor: '#111',
    borderRadius: '10px',
    padding: '30px',
  },
  stepItem: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    marginBottom: '25px',
  },
  stepNum: {
    width: '35px',
    height: '35px',
    backgroundColor: '#C9A96E',
    color: '#000',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  stepText: {
    color: '#999',
    fontSize: '14px',
  },
  codeBox: {
    backgroundColor: '#111',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  codeHeader: {
    backgroundColor: '#1a1a1a',
    padding: '10px 15px',
    fontSize: '12px',
    color: '#666',
    borderBottom: '1px solid #222',
  },
  code: {
    padding: '20px',
    margin: 0,
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#C9A96E',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  alertBox: {
    backgroundColor: '#332700',
    border: '1px solid #C9A96E',
    borderRadius: '8px',
    padding: '15px 20px',
    color: '#C9A96E',
    fontSize: '14px',
  },
  endpoint: {
    backgroundColor: '#111',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '25px',
  },
  endpointHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '10px',
    direction: 'ltr',
  },
  methodGet: {
    backgroundColor: '#22c55e',
    color: '#000',
    padding: '5px 12px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: '700',
  },
  methodPost: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: '700',
  },
  endpointUrl: {
    fontSize: '16px',
    color: '#fff',
  },
  endpointDesc: {
    color: '#999',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  th: {
    textAlign: 'right',
    padding: '10px',
    borderBottom: '1px solid #333',
    color: '#999',
    fontSize: '12px',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #222',
    fontSize: '14px',
  },
};
