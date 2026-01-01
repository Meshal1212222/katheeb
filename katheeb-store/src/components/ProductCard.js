'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.KatheebCart) {
      window.KatheebCart.addItem({
        id: product.id,
        name: product.name,
        price: { amount: product.price },
        thumbnail: product.image || product.thumbnail,
        urls: { customer: `/product/${product.id}` }
      });
    }
  };

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
          {product.oldPrice && (
            <span className="product-badge sale">تخفيض</span>
          )}
          <div className="product-wishlist">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
        </div>
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">
            {product.price?.toLocaleString()} ر.س
            {product.oldPrice && <span className="old">{product.oldPrice?.toLocaleString()} ر.س</span>}
          </div>
        </div>
      </Link>
      <button className="btn-add-cart" onClick={handleAddToCart}>
        أضف للسلة
      </button>
    </div>
  );
}
