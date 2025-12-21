/**
 * KATHEEB - Salla Theme JavaScript
 * كثيب - عنوان الفخامة
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initProductCards();
    initQuantityControls();
    initAccordions();
    initPaymentMethods();
    initFormValidation();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const menuBtn = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
    }
}

/**
 * Product Cards - Wishlist & Quick Add
 */
function initProductCards() {
    // Wishlist toggle
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const svg = this.querySelector('svg');
            const isFilled = svg.getAttribute('fill') !== 'none';

            if (isFilled) {
                svg.setAttribute('fill', 'none');
                svg.style.stroke = 'var(--text)';
            } else {
                svg.setAttribute('fill', 'var(--red)');
                svg.style.stroke = 'var(--red)';
            }
        });
    });
}

/**
 * Quantity Controls
 */
function initQuantityControls() {
    document.querySelectorAll('.quantity-control').forEach(control => {
        const minusBtn = control.querySelector('button:first-child');
        const plusBtn = control.querySelector('button:last-child');
        const input = control.querySelector('input');

        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                const val = parseInt(input.value) - 1;
                if (val >= 1) input.value = val;
                updateCartTotal();
            });

            plusBtn.addEventListener('click', () => {
                const val = parseInt(input.value) + 1;
                const max = parseInt(input.max) || 99;
                if (val <= max) input.value = val;
                updateCartTotal();
            });
        }
    });
}

/**
 * Accordion Toggles
 */
function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('open');

            // Close all others
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}

/**
 * Payment Method Selection
 */
function initPaymentMethods() {
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');

            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', function(e) {
        let isValid = true;
        const errors = [];

        // Phone validation (Saudi format)
        const phone = document.getElementById('phone');
        if (phone && !/^05[0-9]{8}$/.test(phone.value)) {
            errors.push('يرجى إدخال رقم جوال صحيح (05xxxxxxxx)');
            phone.classList.add('error');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            errors.push('يرجى إدخال بريد إلكتروني صحيح');
            email.classList.add('error');
            isValid = false;
        }

        // Required fields
        checkoutForm.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
            if (errors.length > 0) {
                alert(errors.join('\n'));
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة');
            }
        }
    });

    // Remove error class on input
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

/**
 * Update Cart Total (Demo)
 */
function updateCartTotal() {
    // This would be handled by Salla in production
    console.log('Cart updated');
}

/**
 * Image Gallery - Change Main Image
 */
function changeImage(src, thumb) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = src;
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        if (thumb) thumb.classList.add('active');
    }
}

/**
 * Select Product Option
 */
function selectOption(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

/**
 * Toggle Accordion
 */
function toggleAccordion(btn) {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

    // Toggle
    if (!wasOpen) {
        item.classList.add('open');
    }
}

/**
 * Smooth Scroll
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Format Price
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ar-SA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(price) + ' ر.س';
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export for global use
window.katheeb = {
    changeImage,
    selectOption,
    toggleAccordion,
    scrollToElement,
    formatPrice,
    showToast
};
