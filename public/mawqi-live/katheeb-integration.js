/**
 * موقعي لايف - تكامل مع موقع كثيب
 * سلة تسوق محلية كاملة + بوابة دفع سلة
 */

(function() {
  const MERCHANT_ID = '371583637';
  const API_BASE = 'https://wepsitelive-production.up.railway.app';
  const SALLA_STORE_URL = 'https://katheeb.salla.sa'; // رابط متجر سلة

  // ==================== سلة التسوق المحلية ====================
  const KatheebCart = {
    items: [],

    init() {
      const saved = localStorage.getItem('katheeb_cart');
      this.items = saved ? JSON.parse(saved) : [];
      this.updateCartCount();
    },

    save() {
      localStorage.setItem('katheeb_cart', JSON.stringify(this.items));
      this.updateCartCount();
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
          salla_url: product.urls?.customer || '#',
          sku: product.sku || ''
        });
      }
      this.save();
      this.showNotification('تمت الإضافة للسلة ✓');
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
      this.renderDrawer();
    },

    updateCartCount() {
      const badges = document.querySelectorAll('.cart-count');
      const count = this.getCount();
      badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });
    },

    showNotification(message) {
      let notification = document.getElementById('katheeb-notification');
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'katheeb-notification';
        document.body.appendChild(notification);
      }
      notification.textContent = message;
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show'), 2500);
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
        <div class="drawer-overlay" onclick="KatheebCart.closeDrawer()"></div>
        <div class="drawer-panel">
          <div class="drawer-header">
            <h3>سلة التسوق</h3>
            <button class="drawer-close" onclick="KatheebCart.closeDrawer()">✕</button>
          </div>
          <div class="drawer-body" id="drawer-body"></div>
          <div class="drawer-footer" id="drawer-footer"></div>
        </div>
      `;
      document.body.appendChild(drawer);
    },

    renderDrawer() {
      const body = document.getElementById('drawer-body');
      const footer = document.getElementById('drawer-footer');
      if (!body || !footer) return;

      if (this.items.length === 0) {
        body.innerHTML = `
          <div class="empty-cart">
            <div class="empty-icon">🛒</div>
            <p>السلة فارغة</p>
            <button class="btn-shop" onclick="KatheebCart.closeDrawer()">تسوق الآن</button>
          </div>
        `;
        footer.innerHTML = '';
        return;
      }

      body.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price.toFixed(2)} ر.س</div>
            <div class="item-qty">
              <button onclick="KatheebCart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
              <span>${item.quantity}</span>
              <button onclick="KatheebCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="item-remove" onclick="KatheebCart.removeItem('${item.id}')">✕</button>
        </div>
      `).join('');

      footer.innerHTML = `
        <div class="cart-summary">
          <div class="summary-row">
            <span>عدد المنتجات</span>
            <span>${this.getCount()}</span>
          </div>
          <div class="summary-row total">
            <span>المجموع</span>
            <span>${this.getTotal().toFixed(2)} ر.س</span>
          </div>
        </div>
        <button class="btn-checkout" onclick="KatheebCart.checkout()">
          إتمام الشراء والدفع
        </button>
        <button class="btn-clear" onclick="KatheebCart.clear()">إفراغ السلة</button>
      `;
    },

    // ==================== الدفع عبر سلة ====================
    checkout() {
      if (this.items.length === 0) {
        this.showNotification('السلة فارغة!');
        return;
      }

      // طريقة 1: فتح صفحة السلة في متجر سلة مع المنتجات
      // نفتح أول منتج ثم المستخدم يضيف الباقي
      // هذه الطريقة الأبسط بدون API token

      // طريقة 2: إنشاء رابط سلة مع كل المنتجات (يحتاج Salla API)

      this.showNotification('جاري التحويل لبوابة الدفع...');

      // بناء رابط الدفع
      // إذا كان متجر سلة يدعم إضافة منتجات عبر الرابط:
      const checkoutUrl = this.buildCheckoutUrl();

      setTimeout(() => {
        window.open(checkoutUrl, '_blank');
      }, 500);
    },

    buildCheckoutUrl() {
      // الطريقة الأساسية: فتح صفحة المنتج الأول
      // لإضافة كل المنتجات تحتاج Salla Cart API

      if (this.items.length === 1) {
        return this.items[0].salla_url;
      }

      // إذا أكثر من منتج، نفتح صفحة المتجر الرئيسية
      // أو يمكن استخدام Salla API لإضافة المنتجات للسلة
      return this.items[0].salla_url;
    }
  };

  // جعل السلة متاحة عالمياً
  window.KatheebCart = KatheebCart;

  // ==================== تهيئة التطبيق ====================
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    console.log('🚀 كثيب: جاري تحميل المنتجات...');

    KatheebCart.init();
    addStyles();
    addCartButton();

    try {
      const response = await fetch(`${API_BASE}/api/products?merchant_id=${MERCHANT_ID}`);
      const data = await response.json();

      if (data.data) {
        console.log(`✅ تم جلب ${data.data.length} منتج`);
        window.katheebProducts = data.data;
        renderProducts(data.data);
      }
    } catch (error) {
      console.error('❌ خطأ:', error);
    }
  }

  function addCartButton() {
    // إضافة زر السلة العائم
    const cartBtn = document.createElement('div');
    cartBtn.className = 'floating-cart-btn';
    cartBtn.innerHTML = `
      <span class="cart-count" style="display: none;">0</span>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    `;
    cartBtn.onclick = () => KatheebCart.openDrawer();
    document.body.appendChild(cartBtn);
    KatheebCart.updateCartCount();
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
      <div class="product-card">
        <div class="product-image" onclick="window.open('${product.urls?.customer || '#'}', '_blank')">
          <img src="${image}" alt="${product.name}" loading="lazy">
          ${hasDiscount ? '<span class="product-badge">تخفيض</span>' : ''}
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">
            ${hasDiscount ? `<span class="old-price">${oldPrice.toFixed(2)} ر.س</span>` : ''}
            <span>${price.toFixed(2)} ر.س</span>
          </div>
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')">
            أضف للسلة
          </button>
        </div>
      </div>
    `;
  }

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
      /* زر السلة العائم */
      .floating-cart-btn {
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #c9a227, #a8860a);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(201, 162, 39, 0.4);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .floating-cart-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(201, 162, 39, 0.5);
      }
      .floating-cart-btn svg {
        width: 28px;
        height: 28px;
        color: #000;
      }
      .cart-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff4444;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* الإشعار */
      #katheeb-notification {
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(50px);
        background: #1a1a2e;
        color: #fff;
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 10001;
        opacity: 0;
        transition: all 0.3s;
        border: 2px solid #c9a227;
        font-weight: bold;
      }
      #katheeb-notification.show {
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
        z-index: 10000;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s;
      }
      #katheeb-cart-drawer.open {
        visibility: visible;
        opacity: 1;
      }
      .drawer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
      }
      .drawer-panel {
        position: absolute;
        top: 0;
        right: -420px;
        width: 100%;
        max-width: 420px;
        height: 100%;
        background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
        display: flex;
        flex-direction: column;
        transition: right 0.3s ease-out;
        box-shadow: -5px 0 30px rgba(0,0,0,0.5);
      }
      #katheeb-cart-drawer.open .drawer-panel {
        right: 0;
      }
      .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        border-bottom: 1px solid rgba(201, 162, 39, 0.3);
      }
      .drawer-header h3 {
        margin: 0;
        color: #c9a227;
        font-size: 22px;
      }
      .drawer-close {
        background: rgba(255,255,255,0.1);
        border: none;
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: background 0.3s;
      }
      .drawer-close:hover {
        background: rgba(255,68,68,0.3);
      }
      .drawer-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .drawer-footer {
        padding: 20px;
        border-top: 1px solid rgba(201, 162, 39, 0.3);
        background: rgba(0,0,0,0.3);
      }

      /* السلة الفارغة */
      .empty-cart {
        text-align: center;
        padding: 60px 20px;
        color: #888;
      }
      .empty-icon {
        font-size: 80px;
        margin-bottom: 20px;
        opacity: 0.5;
      }
      .empty-cart p {
        font-size: 18px;
        margin-bottom: 25px;
      }
      .btn-shop {
        background: linear-gradient(135deg, #c9a227, #a8860a);
        color: #000;
        border: none;
        padding: 12px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }

      /* عناصر السلة */
      .cart-item {
        display: flex;
        gap: 15px;
        padding: 20px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        position: relative;
      }
      .cart-item img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 10px;
      }
      .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .item-name {
        color: #fff;
        font-size: 15px;
        margin-bottom: 8px;
        line-height: 1.4;
      }
      .item-price {
        color: #c9a227;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 12px;
      }
      .item-qty {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .item-qty button {
        width: 32px;
        height: 32px;
        border: 1px solid rgba(201, 162, 39, 0.5);
        background: transparent;
        color: #c9a227;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.2s;
      }
      .item-qty button:hover {
        background: #c9a227;
        color: #000;
      }
      .item-qty span {
        color: #fff;
        font-size: 16px;
        min-width: 30px;
        text-align: center;
      }
      .item-remove {
        position: absolute;
        top: 20px;
        left: 0;
        background: none;
        border: none;
        color: #ff4444;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .item-remove:hover {
        opacity: 1;
      }

      /* ملخص السلة */
      .cart-summary {
        margin-bottom: 20px;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        color: #aaa;
        padding: 8px 0;
        font-size: 15px;
      }
      .summary-row.total {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 15px;
        margin-top: 10px;
      }
      .summary-row.total span:last-child {
        color: #c9a227;
      }

      /* أزرار */
      .btn-checkout {
        width: 100%;
        padding: 18px;
        background: linear-gradient(135deg, #c9a227, #a8860a);
        color: #000;
        border: none;
        border-radius: 12px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        margin-bottom: 10px;
      }
      .btn-checkout:hover {
        transform: scale(1.02);
        box-shadow: 0 5px 20px rgba(201, 162, 39, 0.4);
      }
      .btn-clear {
        width: 100%;
        padding: 12px;
        background: transparent;
        color: #888;
        border: 1px solid #444;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .btn-clear:hover {
        border-color: #ff4444;
        color: #ff4444;
      }

      /* زر أضف للسلة */
      .btn-add-cart {
        width: 100%;
        padding: 12px 15px;
        margin-top: 12px;
        background: linear-gradient(135deg, #c9a227, #a8860a);
        color: #000;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
      }
      .btn-add-cart:hover {
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

      /* التجاوب مع الجوال */
      @media (max-width: 480px) {
        .drawer-panel {
          max-width: 100%;
        }
        .floating-cart-btn {
          bottom: 20px;
          left: 20px;
          width: 55px;
          height: 55px;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();
