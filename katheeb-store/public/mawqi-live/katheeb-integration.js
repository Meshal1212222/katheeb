/**
 * موقعي لايف - تكامل مع موقع كثيب
 * Headless Commerce - سلة كـ Backend
 */

(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  // تشغيل مباشر
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  async function init() {
    console.log('🚀 موقعي لايف: جاري تحميل المنتجات...');

    try {
      const response = await fetch(`${API_BASE}/api/products?merchant_id=${MERCHANT_ID}`);
      const data = await response.json();

      if (data.data) {
        console.log(`✅ تم جلب ${data.data.length} منتج`);
        
        // حفظ المنتجات للاستخدام لاحقاً
        window.MAWQI_PRODUCTS = data.data;
        
        renderProducts(data.data);
      }
    } catch (error) {
      console.error('❌ خطأ:', error);
    }
  }

  function renderProducts(products) {
    const scrollContainer = document.querySelector('.products-scroll');

    if (scrollContainer) {
      scrollContainer.innerHTML = products.slice(0, 10).map(createProductCard).join('');
    }
  }

  function createProductCard(product) {
    const price = product.sale_price?.amount || product.price?.amount || 0;
    const image = product.thumbnail || 'https://via.placeholder.com/300';

    // الرابط يفتح صفحة المنتج على katheeb مو سلة
    return `
      <a class="product-card" href="/product/${product.id}">
        <div class="product-image">
          <img src="${image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${price.toFixed(2)} ر.س</div>
        </div>
      </a>
    `;
  }
})();
