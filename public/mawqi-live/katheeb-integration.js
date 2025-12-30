/**
 * موقعي لايف - تكامل مع موقع كثيب
 */

(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    console.log('🚀 موقعي لايف: جاري تحميل المنتجات...');

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

    return `
      <div class="product-card" onclick="window.open('${product.urls?.customer || '#'}', '_blank')">
        <div class="product-image">
          <img src="${image}" alt="${product.name}" loading="lazy">
          ${hasDiscount ? '<span class="product-badge sale">تخفيض</span>' : ''}
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${price.toFixed(2)} ر.س</div>
        </div>
      </div>
    `;
  }
})();
