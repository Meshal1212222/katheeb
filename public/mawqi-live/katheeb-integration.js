/**
 * موقعي لايف - تكامل مع موقع كثيب
 * سلة تسوق محلية + ربط مع سلة كبوابة دفع
 */

(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';
  const SALLA_STORE_URL = 'https://katheeb.sa'; // رابط متجر سلة

  // ==================== سلة التسوق المحلية ====================
  const KatheebCart = {
    items: [],

    init() {
      const saved = localStorage.getItem('katheeb_cart');
      this.items = saved ? JSON.parse(saved) : [];
      this.updateCartBadge();
    },

    save() {
      localStorage.setItem('katheeb_cart', JSON.stringify(this.items));
      this.updateCartBadge();
    },

    addItem(product) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.sale_price?.amount || product.price?.amount || 0,
          image: product.thumbnail || 'https://via.placeholder.com/100',
          quantity: 1,
          salla_url: product.urls?.customer || '#'
        });
      }
      this.save();
      this.showNotification('تمت الإضافة للسلة');
      this.openDrawer();
    },

    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.save();
      this.renderDrawer();
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = quantity;
          this.save();
          this.renderDrawer();
        }
      }
    },

    getTotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clear() {
      this.items = [];
      this.save();
    },

    updateCartBadge() {
      const badge = document.querySelector('.cart-badge');
      const count = this.getCount();
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }
    },

    showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'katheeb-notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => notification.classList.add('show'), 10);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    },

    // ==================== واجهة السلة ====================
    openDrawer() {
      let drawer = document.getElementById('katheeb-cart-drawer');
      if (!drawer) {
        this.createDrawer();
        drawer = document.getElementById('katheeb-cart-drawer');
      }
      this.renderDrawer();
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeDrawer() {
      const drawer = document.getElementById('katheeb-cart-drawer');
      if (drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    },

    createDrawer() {
      const drawer = document.createElement('div');
      drawer.id = 'katheeb-cart-drawer';
      drawer.innerHTML = `
        <div class="cart-drawer-overlay" onclick="KatheebCart.closeDrawer()"></div>
        <div class="cart-drawer-content">
          <div class="cart-drawer-header">
            <h3>سلة التسوق</h3>
            <button class="cart-drawer-close" onclick="KatheebCart.closeDrawer()">✕</button>
          </div>
          <div class="cart-drawer-items" id="cart-drawer-items"></div>
          <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
        </div>
      `;
      document.body.appendChild(drawer);
    },

    renderDrawer() {
      const itemsContainer = document.getElementById('cart-drawer-items');
      const footerContainer = document.getElementById('cart-drawer-footer');

      if (!itemsContainer || !footerContainer) return;

      if (this.items.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-empty">
            <span class="cart-empty-icon">🛒</span>
            <p>السلة فارغة</p>
          </div>
        `;
        footerContainer.innerHTML = '';
        return;
      }

      itemsContainer.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price.toFixed(2)} ر.س</div>
            <div class="cart-item-quantity">
              <button onclick="KatheebCart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button onclick="KatheebCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="KatheebCart.removeItem('${item.id}')">🗑</button>
        </div>
      `).join('');

      footerContainer.innerHTML = `
        <div class="cart-total">
          <span>المجموع:</span>
          <span>${this.getTotal().toFixed(2)} ر.س</span>
        </div>
        <button class="cart-checkout-btn" onclick="KatheebCart.checkout()">
          إتمام الشراء
        </button>
      `;
    },

    // ==================== إتمام الشراء عبر سلة ====================
    checkout() {
      if (this.items.length === 0) {
        this.showNotification('السلة فارغة!');
        return;
      }

      // بناء رابط سلة مع المنتجات
      // الطريقة 1: فتح أول منتج في سلة (أبسط طريقة)
      const firstItem = this.items[0];
      window.open(firstItem.salla_url, '_blank');

      // ملاحظة: لإضافة كل المنتجات للسلة في سلة، تحتاج Salla API
      // يمكن تطوير هذا لاحقاً باستخدام Salla Cart API

      this.showNotification('جاري التحويل لإتمام الدفع...');
    }
  };

  // جعل السلة متاحة عالمياً
  window.KatheebCart = KatheebCart;

  // ==================== تهيئة التطبيق ====================
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    console.log('🚀 موقعي لايف: جاري تحميل المنتجات...');

    // تهيئة السلة
    KatheebCart.init();

    // إضافة الأنماط
    addStyles();

    // إضافة أيقونة السلة في الهيدر
    addCartIcon();

    try {
      const response = await fetch(`${API_BASE}/api/products?merchant_id=${MERCHANT_ID}`);
      const data = await response.json();

      if (data.data) {
        console.log(`✅ تم جلب ${data.data.length} منتج`);
        window.katheebProducts = data.data; // حفظ المنتجات للاستخدام لاحقاً
        renderProducts(data.data);
      }
    } catch (error) {
      console.error('❌ خطأ:', error);
    }
  }

  function addCartIcon() {
    const header = document.querySelector('header') || document.querySelector('.header');
    if (header && !document.querySelector('.katheeb-cart-icon')) {
      const cartIcon = document.createElement('div');
      cartIcon.className = 'katheeb-cart-icon';
      cartIcon.innerHTML = `
        <span class="cart-badge" style="display: none;">0</span>
        🛒
      `;
      cartIcon.onclick = () => KatheebCart.openDrawer();
      header.appendChild(cartIcon);
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
    const productData = JSON.stringify(product).replace(/'/g, "\\'").replace(/"/g, '&quot;');

    return `
      <div class="product-card">
        <div class="product-image" onclick="window.open('${product.urls?.customer || '#'}', '_blank')">
          <img src="${image}" alt="${product.name}" loading="lazy">
          ${hasDiscount ? '<span class="product-badge sale">تخفيض</span>' : ''}
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">
            ${hasDiscount ? `<span class="old-price">${oldPrice.toFixed(2)} ر.س</span>` : ''}
            ${price.toFixed(2)} ر.س
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
            أضف للسلة
          </button>
        </div>
      </div>
    `;
  }

  // دالة إضافة للسلة
  window.addToCart = function(productId) {
    const product = window.katheebProducts?.find(p => p.id === productId);
    if (product) {
      KatheebCart.addItem(product);
    }
  };

  // ==================== الأنماط ====================
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* أيقونة السلة */
      .katheeb-cart-icon {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background: #1a1a2e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: transform 0.3s;
      }
      .katheeb-cart-icon:hover {
        transform: scale(1.1);
      }
      .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #c9a227;
        color: #000;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* إشعار */
      .katheeb-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #1a1a2e;
        color: #fff;
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s;
        border: 1px solid #c9a227;
      }
      .katheeb-notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }

      /* درج السلة */
      #katheeb-cart-drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s;
      }
      #katheeb-cart-drawer.open {
        visibility: visible;
        opacity: 1;
      }
      .cart-drawer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
      }
      .cart-drawer-content {
        position: absolute;
        top: 0;
        right: -400px;
        width: 100%;
        max-width: 400px;
        height: 100%;
        background: #0f0f1a;
        display: flex;
        flex-direction: column;
        transition: right 0.3s;
      }
      #katheeb-cart-drawer.open .cart-drawer-content {
        right: 0;
      }
      .cart-drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #333;
      }
      .cart-drawer-header h3 {
        margin: 0;
        color: #c9a227;
      }
      .cart-drawer-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
      }
      .cart-drawer-items {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .cart-empty {
        text-align: center;
        padding: 50px 20px;
        color: #888;
      }
      .cart-empty-icon {
        font-size: 60px;
        display: block;
        margin-bottom: 20px;
      }
      .cart-item {
        display: flex;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px solid #222;
      }
      .cart-item-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }
      .cart-item-details {
        flex: 1;
      }
      .cart-item-name {
        color: #fff;
        margin-bottom: 5px;
        font-size: 14px;
      }
      .cart-item-price {
        color: #c9a227;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .cart-item-quantity button {
        width: 30px;
        height: 30px;
        border: 1px solid #444;
        background: #1a1a2e;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
      .cart-item-quantity button:hover {
        background: #c9a227;
        color: #000;
      }
      .cart-item-remove {
        background: none;
        border: none;
        color: #ff4444;
        cursor: pointer;
        font-size: 20px;
        padding: 10px;
      }
      .cart-drawer-footer {
        padding: 20px;
        border-top: 1px solid #333;
      }
      .cart-total {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 18px;
        margin-bottom: 15px;
      }
      .cart-checkout-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #c9a227, #a8860a);
        color: #000;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .cart-checkout-btn:hover {
        transform: scale(1.02);
      }

      /* زر أضف للسلة */
      .add-to-cart-btn {
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
      .add-to-cart-btn:hover {
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
