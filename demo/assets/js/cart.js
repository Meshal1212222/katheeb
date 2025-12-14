/**
 * KATHEEB - Shopping Cart System
 * نظام سلة التسوق لموقع كثيب
 */

class KatheebCart {
    constructor() {
        this.storageKey = 'katheeb_cart';
        this.wishlistKey = 'katheeb_wishlist';
        this.cart = this.loadCart();
        this.wishlist = this.loadWishlist();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    // ==================== CART METHODS ====================

    loadCart() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch {
            return [];
        }
    }

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        this.updateCartUI();
    }

    addToCart(product) {
        const existing = this.cart.find(item =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existing) {
            existing.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                size: product.size,
                color: product.color,
                quantity: product.quantity || 1
            });
        }

        this.saveCart();
        this.showToast('تمت الإضافة للسلة ✓');
        return true;
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.showToast('تم الحذف من السلة');
    }

    updateQuantity(index, quantity) {
        if (quantity < 1) {
            this.removeFromCart(index);
        } else {
            this.cart[index].quantity = quantity;
            this.saveCart();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // ==================== WISHLIST METHODS ====================

    loadWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.wishlistKey)) || [];
        } catch {
            return [];
        }
    }

    saveWishlist() {
        localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
        this.updateWishlistUI();
    }

    toggleWishlist(product) {
        const index = this.wishlist.findIndex(item => item.id === product.id);

        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showToast('تم الحذف من المفضلة');
            return false;
        } else {
            this.wishlist.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image
            });
            this.showToast('تمت الإضافة للمفضلة ♥');
            return true;
        }
    }

    isInWishlist(productId) {
        return this.wishlist.some(item => item.id === productId);
    }

    // ==================== UI UPDATES ====================

    updateCartUI() {
        // Update cart count badges
        document.querySelectorAll('.cart-count, #cart-count, .header-icon .count').forEach(el => {
            if (el.closest('.header-icon')?.querySelector('svg[viewBox="0 0 24 24"]')?.innerHTML.includes('M16 11V7')) {
                el.textContent = this.getCartCount();
            }
        });

        // Update cart sidebar/modal if exists
        this.renderCartItems();
    }

    updateWishlistUI() {
        document.querySelectorAll('.wishlist-count').forEach(el => {
            el.textContent = this.wishlist.length;
        });
    }

    renderCartItems() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <p>السلة فارغة</p>
                    <a href="index.html" class="btn-shop">تسوق الآن</a>
                </div>
            `;
            return;
        }

        cartContainer.innerHTML = this.cart.map((item, index) => `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-brand">${item.brand || ''}</div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-meta">
                        ${item.color ? `اللون: ${item.color}` : ''}
                        ${item.size ? ` | المقاس: ${item.size}` : ''}
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="katheebCart.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="katheebCart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">${this.formatPrice(item.price * item.quantity)}</div>
                    <button class="cart-item-remove" onclick="katheebCart.removeFromCart(${index})">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        // Update totals
        const subtotal = this.getCartTotal();
        const shipping = subtotal >= 500 ? 0 : 30;
        const tax = subtotal * 0.15;
        const total = subtotal + shipping + tax;

        document.querySelectorAll('.cart-subtotal').forEach(el => el.textContent = this.formatPrice(subtotal));
        document.querySelectorAll('.cart-shipping').forEach(el => {
            el.textContent = shipping === 0 ? 'مجاني ✨' : this.formatPrice(shipping);
            el.classList.toggle('free-shipping', shipping === 0);
        });
        document.querySelectorAll('.cart-tax').forEach(el => el.textContent = this.formatPrice(tax));
        document.querySelectorAll('.cart-total').forEach(el => el.textContent = this.formatPrice(total));
    }

    // ==================== EVENTS ====================

    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            const addBtn = e.target.closest('[data-add-cart]');
            if (addBtn) {
                e.preventDefault();
                const productData = JSON.parse(addBtn.dataset.addCart);
                this.addToCart(productData);
            }

            // Wishlist buttons
            const wishBtn = e.target.closest('[data-wishlist]');
            if (wishBtn) {
                e.preventDefault();
                e.stopPropagation();
                const productData = JSON.parse(wishBtn.dataset.wishlist);
                const isAdded = this.toggleWishlist(productData);

                const svg = wishBtn.querySelector('svg');
                if (svg) {
                    svg.style.fill = isAdded ? 'var(--red)' : 'none';
                    svg.style.stroke = isAdded ? 'var(--red)' : 'currentColor';
                }
            }
        });
    }

    // ==================== HELPERS ====================

    formatPrice(price) {
        return new Intl.NumberFormat('ar-SA').format(price) + ' ر.س';
    }

    showToast(message, type = 'success') {
        // Remove existing toast
        const existing = document.querySelector('.katheeb-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `katheeb-toast katheeb-toast--${type}`;
        toast.innerHTML = message;
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => toast.classList.add('show'));

        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .katheeb-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #222;
        color: white;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
    .katheeb-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    .katheeb-toast--success { background: #2E7D32; }
    .katheeb-toast--error { background: #C41E3A; }
    .katheeb-toast--info { background: #C9A96E; }
`;
document.head.appendChild(toastStyles);

// Initialize cart
const katheebCart = new KatheebCart();

// Export for global access
window.katheebCart = katheebCart;
