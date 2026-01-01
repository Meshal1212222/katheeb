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
