(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';

  document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 موقعي لايف: جاري تحميل المنتجات...');
    try {
      const response = await fetch(API_BASE + '/api/products?merchant_id=' + MERCHANT_ID);
      const data = await response.json();
      if (data.data) {
        console.log('✅ تم جلب ' + data.data.length + ' منتج');
        var container = document.querySelector('.products-scroll') || document.querySelector('.products-grid');
        if (container) {
          container.innerHTML = data.data.map(function(p) {
            return '<div class="product-card"><div class="product-image"><img src="' + (p.thumbnail || '') + '"></div><div class="product-info"><div class="product-name">' + p.name + '</div><div class="product-price">' + (p.price?.amount || 0) + ' ر.س</div></div></div>';
          }).join('');
        }
      }
    } catch (e) { console.error('❌', e); }
  });
})();
