'use client';

import Link from 'next/link';
import { useState } from 'react';

// Sample product data (will be replaced with Salla API)
const products = {
  1: { id: 1, brand: 'TOM FORD', name: 'نظارة شمسية أفياتور ذهبي', price: 1850, description: 'نظارة شمسية فاخرة من توم فورد بإطار ذهبي أنيق وعدسات عالية الجودة توفر حماية كاملة من أشعة الشمس.', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'] },
  2: { id: 2, brand: 'ROLEX', name: 'ساعة أويستر بربتشوال فضي', price: 45000, description: 'ساعة رولكس أويستر بربتشوال الكلاسيكية بتصميم فضي أنيق، مقاومة للماء ومصنوعة من أجود المواد.', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'] },
  3: { id: 3, brand: 'VALENTINO GARAVANI', name: 'حقيبة فالنتينو جلد أسود', price: 8500, description: 'حقيبة فالنتينو الفاخرة من الجلد الأسود الطبيعي مع تفاصيل ذهبية مميزة.', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'] },
};

export default function ProductPage({ params }) {
  const product = products[params.id] || products[1];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Header */}
      <div className="top-bar">
        شحن مجاني لجميع الطلبات فوق <span>500 ر.س</span>
      </div>
      <header className="header">
        <div className="header-main">
          <div className="header-right">
            <Link href="/" className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: 22, height: 22}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>الرئيسية</span>
            </Link>
          </div>
          <Link href="/" className="logo">
            <h1 style={{fontSize: '28px', fontWeight: '600', letterSpacing: '2px'}}>KATHEEB</h1>
          </Link>
          <div className="header-left">
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: 22, height: 22}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span className="count">0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{padding: '20px 40px', fontSize: '13px', color: '#666', maxWidth: '1400px', margin: '0 auto'}}>
        <Link href="/" style={{color: '#666'}}>الرئيسية</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <Link href="/products" style={{color: '#666'}}>المنتجات</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <span style={{color: '#222'}}>{product.name}</span>
      </div>

      {/* Product Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        padding: '20px 40px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Images */}
        <div>
          <div style={{
            aspectRatio: '1',
            background: '#F5F5F5',
            marginBottom: '15px',
            overflow: 'hidden'
          }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
          {product.images.length > 1 && (
            <div style={{display: 'flex', gap: '10px'}}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: selectedImage === idx ? '2px solid #C9A96E' : '1px solid #E5E5E5',
                    padding: 0,
                    cursor: 'pointer',
                    background: 'none'
                  }}
                >
                  <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{fontSize: '12px', color: '#999', letterSpacing: '2px', marginBottom: '10px'}}>
            {product.brand}
          </div>
          <h1 style={{fontSize: '28px', fontWeight: '500', marginBottom: '20px'}}>
            {product.name}
          </h1>
          <div style={{fontSize: '28px', fontWeight: '600', color: '#C9A96E', marginBottom: '30px'}}>
            {product.price.toLocaleString()} ر.س
          </div>

          <p style={{fontSize: '14px', color: '#666', lineHeight: '1.8', marginBottom: '30px'}}>
            {product.description}
          </p>

          {/* Quantity */}
          <div style={{marginBottom: '20px'}}>
            <label style={{fontSize: '13px', marginBottom: '10px', display: 'block'}}>الكمية</label>
            <div style={{display: 'flex', alignItems: 'center', gap: '0'}}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #E5E5E5',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >-</button>
              <input
                type="text"
                value={quantity}
                readOnly
                style={{
                  width: '60px',
                  height: '40px',
                  border: '1px solid #E5E5E5',
                  borderLeft: 'none',
                  borderRight: 'none',
                  textAlign: 'center',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #E5E5E5',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button style={{
            width: '100%',
            padding: '18px',
            background: '#222',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '15px',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#C9A96E'}
          onMouseOut={(e) => e.target.style.background = '#222'}
          >
            أضف إلى السلة
          </button>

          <button style={{
            width: '100%',
            padding: '18px',
            background: 'white',
            color: '#222',
            border: '1px solid #222',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {e.target.style.background = '#222'; e.target.style.color = 'white'}}
          onMouseOut={(e) => {e.target.style.background = 'white'; e.target.style.color = '#222'}}
          >
            اشتري الآن
          </button>

          {/* Features */}
          <div style={{marginTop: '40px', borderTop: '1px solid #E5E5E5', paddingTop: '30px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
              <svg fill="none" stroke="#C9A96E" viewBox="0 0 24 24" style={{width: 24, height: 24}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
              <span style={{fontSize: '13px', color: '#666'}}>شحن مجاني للطلبات فوق 500 ر.س</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
              <svg fill="none" stroke="#C9A96E" viewBox="0 0 24 24" style={{width: 24, height: 24}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span style={{fontSize: '13px', color: '#666'}}>استبدال واسترجاع خلال 14 يوم</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <svg fill="none" stroke="#C9A96E" viewBox="0 0 24 24" style={{width: 24, height: 24}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span style={{fontSize: '13px', color: '#666'}}>منتج أصلي 100% مع ضمان</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <h4>KATHEEB</h4>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8'}}>
              وجهتكم الأولى للأزياء الفاخرة
            </p>
          </div>
          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <Link href="/">الرئيسية</Link>
            <Link href="/products">المنتجات</Link>
            <Link href="/about">من نحن</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 KATHEEB. جميع الحقوق محفوظة
        </div>
      </footer>

      <style jsx>{`
        .top-bar { background: #222; color: white; text-align: center; padding: 10px 20px; font-size: 13px; }
        .top-bar span { color: #C9A96E; }
        .header { background: white; border-bottom: 1px solid #E5E5E5; }
        .header-main { display: flex; justify-content: space-between; align-items: center; padding: 18px 40px; max-width: 1400px; margin: 0 auto; }
        .header-right, .header-left { display: flex; align-items: center; gap: 22px; }
        .header-icon { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; }
        .header-icon:hover { color: #C9A96E; }
        .logo { position: absolute; left: 50%; transform: translateX(-50%); }
        .count { background: #222; color: white; font-size: 10px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .footer { background: #222; color: white; padding: 60px 40px 30px; }
        .footer-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .footer-col h4 { font-size: 14px; font-weight: 500; margin-bottom: 20px; }
        .footer-col a { display: block; font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 10px; }
        .footer-col a:hover { color: #C9A96E; }
        .footer-bottom { max-width: 1400px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 12px; color: rgba(255,255,255,0.5); }
        @media (max-width: 768px) {
          .header-main { padding: 15px 20px; }
          .footer-inner { grid-template-columns: 1fr; text-align: center; }
        }
      `}</style>
    </>
  );
}
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const API_BASE = 'https://wepsitelive-production.up.railway.app';
const MERCHANT_ID = '371583637';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  async function fetchProduct() {
    try {
      const response = await fetch(`${API_BASE}/api/product?merchant_id=${MERCHANT_ID}&product_id=${params.id}`);
      const data = await response.json();
      if (data.data) {
        setProduct(data.data);
        // جلب منتجات من نفس التصنيف
        fetchRelatedProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
    setLoading(false);
  }

  async function fetchRelatedProducts(currentProduct) {
    try {
      const response = await fetch(`${API_BASE}/api/products?merchant_id=${MERCHANT_ID}`);
      const data = await response.json();
      if (data.data) {
        // فلترة المنتجات من نفس التصنيف (باستثناء المنتج الحالي)
        const related = data.data
          .filter(p => p.id !== currentProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  if (loading) {
    return (
      <div style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <p>المنتج غير موجود</p>
      </div>
    );
  }

  const price = product.sale_price?.amount || product.price?.amount || 0;
  const image = product.thumbnail || product.image?.url || 'https://via.placeholder.com/800';

  return (
    <>
      <div className="top-bar">
        شحن مجاني لجميع الطلبات فوق <span>500 ر.س</span>
      </div>
      <header className="header">
        <div className="header-main">
          <div className="header-right">
            <Link href="/" className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: 22, height: 22}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>الرئيسية</span>
            </Link>
          </div>
          <Link href="/" className="logo">
            <h1 style={{fontSize: '28px', fontWeight: '600', letterSpacing: '2px'}}>KATHEEB</h1>
          </Link>
          <div className="header-left">
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: 22, height: 22}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span className="count">0</span>
            </div>
          </div>
        </div>
      </header>

      <div style={{padding: '20px 40px', fontSize: '13px', color: '#666', maxWidth: '1400px', margin: '0 auto'}}>
        <Link href="/" style={{color: '#666'}}>الرئيسية</Link>
        <span style={{margin: '0 10px'}}>/</span>
        <span style={{color: '#222'}}>{product.name}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        padding: '20px 40px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <div style={{
            aspectRatio: '1',
            background: '#F5F5F5',
            marginBottom: '15px',
            overflow: 'hidden'
          }}>
            <img
              src={image}
              alt={product.name}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
        </div>

        <div>
          {product.brand?.name && (
            <div style={{fontSize: '12px', color: '#999', letterSpacing: '2px', marginBottom: '10px'}}>
              {product.brand.name}
            </div>
          )}
          <h1 style={{fontSize: '28px', fontWeight: '500', marginBottom: '20px'}}>{product.name}</h1>
          <div style={{fontSize: '28px', fontWeight: '600', color: '#C9A96E', marginBottom: '30px'}}>
            {price.toFixed(2)} ر.س
          </div>
          
          {product.description && (
            <p style={{fontSize: '14px', color: '#666', lineHeight: '1.8', marginBottom: '30px'}}>
              {product.description.replace(/<[^>]*>/g, '')}
            </p>
          )}

          <div style={{marginBottom: '20px'}}>
            <label style={{fontSize: '13px', marginBottom: '10px', display: 'block'}}>الكمية</label>
            <div style={{display: 'flex', alignItems: 'center', gap: '0'}}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{width: '40px', height: '40px', border: '1px solid #E5E5E5', background: 'white', cursor: 'pointer', fontSize: '18px'}}
              >-</button>
              <input 
                type="text" 
                readOnly 
                value={quantity}
                style={{width: '60px', height: '40px', border: '1px solid #E5E5E5', borderLeft: 'none', borderRight: 'none', textAlign: 'center', fontSize: '14px'}}
              />
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{width: '40px', height: '40px', border: '1px solid #E5E5E5', background: 'white', cursor: 'pointer', fontSize: '18px'}}
              >+</button>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '18px',
            background: '#222',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '15px'
          }}>
            أضف إلى السلة
          </button>

          <button style={{
            width: '100%',
            padding: '18px',
            background: 'white',
            color: '#222',
            border: '1px solid #222',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            اشتري الآن
          </button>
        </div>
      </div>

      {/* منتجات ذات صلة */}
      {relatedProducts.length > 0 && (
        <div style={{padding: '40px', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid #E5E5E5'}}>
          <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '30px', textAlign: 'center'}}>
            منتجات قد تعجبك
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {relatedProducts.map(item => {
              const itemPrice = item.sale_price?.amount || item.price?.amount || 0;
              const itemImage = item.thumbnail || 'https://via.placeholder.com/300';
              return (
                <Link 
                  key={item.id} 
                  href={`/product/${item.id}`}
                  style={{textDecoration: 'none', color: 'inherit'}}
                >
                  <div style={{
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}>
                    <div style={{
                      aspectRatio: '1',
                      background: '#F5F5F5',
                      overflow: 'hidden',
                      marginBottom: '10px'
                    }}>
                      <img
                        src={itemImage}
                        alt={item.name}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    </div>
                    <div style={{padding: '10px 0'}}>
                      <div style={{fontSize: '13px', color: '#666', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {item.name}
                      </div>
                      <div style={{fontSize: '15px', fontWeight: '600', color: '#C9A96E'}}>
                        {itemPrice.toFixed(2)} ر.س
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <h4>KATHEEB</h4>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8'}}>وجهتكم الأولى للأزياء الفاخرة</p>
          </div>
        </div>
        <div className="footer-bottom">© 2025 KATHEEB. جميع الحقوق محفوظة</div>
      </footer>
    </>
  );
}
