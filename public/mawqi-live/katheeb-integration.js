/**
 * موقعي لايف - تكامل مع موقع كثيب
 * عرض المنتجات + توجيه مباشر لسلة للشراء
 */

(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    console.log('🚀 موقعي لايف: جاري تحميل المنتجات...');

    addStyles();

    try {
      const response = await fetch(`${API_BASE}/api/products?merchant_id=${MERCHANT_ID}`);
      const data = await response.json();

      if (data.data) {
        console.log(`✅ تم جلب ${data.data.length} منتج`);
        renderProducts(data.data);
      }
    } catch (error) {
      console.error('❌ خطأ:', error);
    }
  }

  function renderProducts(products) {
    const scrollContainer = document.querySelector('.products-scroll');
    const gridContainer = document.querySelector('.products-grid');

    if (scrollContainer) {
      scrollContainer.innerHTML = products.slice(0, 10).map(createProductCard).join('');
    }
    if (gridContainer) {
      gridContainer.innerHTML = products.map(createProductCard).join('');
    }
  }

  function createProductCard(product) {
    const price = product.sale_price?.amount || product.price?.amount || 0;
    const oldPrice = product.price?.amount;
    const hasDiscount = product.sale_price && oldPrice && product.sale_price.amount < oldPrice;
    const image = product.thumbnail || 'https://via.placeholder.com/300';
    const productUrl = product.urls?.customer || '#';

    return `
      <div class="product-card">
        <div class="product-image" onclick="window.open('${productUrl}', '_blank')">
          <img src="${image}" alt="${product.name}" loading="lazy">
          ${hasDiscount ? '<span class="product-badge sale">تخفيض</span>' : ''}
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">
            ${hasDiscount ? `<span class="old-price">${oldPrice.toFixed(2)} ر.س</span>` : ''}
            ${price.toFixed(2)} ر.س
          </div>
          <button class="buy-now-btn" onclick="window.open('${productUrl}', '_blank')">
            اشتري الآن
          </button>
        </div>
      </div>
    `;
  }

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* زر اشتري الآن */
      .buy-now-btn {
        width: 100%;
        padding: 10px 15px;
        margin-top: 10px;
        background: linear-gradient(135deg, #c9a227, #a8860a);
        color: #000;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
      }
      .buy-now-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(201, 162, 39, 0.4);
      }

      /* السعر القديم */
      .old-price {
        text-decoration: line-through;
        color: #888;
        font-size: 12px;
        margin-left: 8px;
      }
    `;
    document.head.appendChild(style);
  }
})();
