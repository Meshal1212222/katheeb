/**
 * KATHEEB - Main JavaScript
 * الملف الرئيسي لموقع كثيب
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initProductOptions();
    initQuantityControls();
    initAccordions();
    initPaymentMethods();
    initFormValidation();
    initMobileMenu();
    initScrollEffects();
});

/**
 * Product Gallery - Image Switching
 */
function initProductGallery() {
    const thumbs = document.querySelectorAll('.gallery-thumbs .thumb, .thumb-item');
    const mainImage = document.getElementById('main-image');

    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                mainImage.src = img.src;
                thumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

/**
 * Product Options - Color & Size Selection
 */
function initProductOptions() {
    // Color options
    document.querySelectorAll('.color-btn, .color-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.color-options, .colors-list');
            if (parent) {
                parent.querySelectorAll('button, .color-option').forEach(b => b.classList.remove('selected', 'active'));
                this.classList.add('selected', 'active');
            }
        });
    });

    // Size options
    document.querySelectorAll('.size-btn, .size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.size-options, .sizes-list');
            if (parent) {
                parent.querySelectorAll('button, .size-option').forEach(b => b.classList.remove('selected', 'active'));
                this.classList.add('selected', 'active');
            }
        });
    });
}

/**
 * Quantity Controls
 */
function initQuantityControls() {
    document.querySelectorAll('.quantity-control, .qty-control').forEach(control => {
        const minusBtn = control.querySelector('.qty-minus, button:first-child');
        const plusBtn = control.querySelector('.qty-plus, button:last-child');
        const input = control.querySelector('input');

        if (!minusBtn || !plusBtn || !input) return;

        minusBtn.addEventListener('click', () => {
            const val = parseInt(input.value) - 1;
            if (val >= 1) {
                input.value = val;
                input.dispatchEvent(new Event('change'));
            }
        });

        plusBtn.addEventListener('click', () => {
            const max = parseInt(input.max) || 99;
            const val = parseInt(input.value) + 1;
            if (val <= max) {
                input.value = val;
                input.dispatchEvent(new Event('change'));
            }
        });
    });
}

/**
 * Accordion Sections
 */
function initAccordions() {
    document.querySelectorAll('.accordion-header, .accordion-toggle').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item, .accordion-section');
            if (!item) return;

            const isOpen = item.classList.contains('open', 'active');

            // Close all others (optional - remove if you want multiple open)
            const parent = item.parentElement;
            if (parent) {
                parent.querySelectorAll('.accordion-item, .accordion-section').forEach(i => {
                    i.classList.remove('open', 'active');
                });
            }

            // Toggle current
            if (!isOpen) {
                item.classList.add('open', 'active');
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
            // Remove selected from all
            document.querySelectorAll('.payment-option').forEach(o => {
                o.classList.remove('selected');
            });

            // Add selected to clicked
            this.classList.add('selected');

            // Check the radio if exists
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        let isValid = true;
        const errors = [];

        // Required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Phone validation (Saudi format)
        const phone = form.querySelector('#phone, [name="phone"]');
        if (phone && phone.value) {
            const phoneRegex = /^(05|5)[0-9]{8}$/;
            if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
                phone.classList.add('error');
                errors.push('يرجى إدخال رقم جوال صحيح (05xxxxxxxx)');
                isValid = false;
            }
        }

        // Email validation
        const email = form.querySelector('#email, [name="email"]');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                errors.push('يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();

            if (errors.length > 0) {
                showAlert(errors.join('<br>'), 'error');
            } else {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
            }

            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Remove error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-toggle, .mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav, .mobile-menu');
    const overlay = document.querySelector('.menu-overlay');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            document.body.classList.toggle('menu-open');
            if (overlay) overlay.classList.toggle('show');
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                document.body.classList.remove('menu-open');
                overlay.classList.remove('show');
            });
        }
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('.header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

/**
 * Show Alert/Modal
 */
function showAlert(message, type = 'info') {
    // Remove existing alert
    const existing = document.querySelector('.katheeb-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.className = `katheeb-alert katheeb-alert--${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">حسناً</button>
        </div>
    `;
    document.body.appendChild(alert);

    // Close on overlay click
    alert.addEventListener('click', (e) => {
        if (e.target === alert) alert.remove();
    });
}

// Add alert styles
const alertStyles = document.createElement('style');
alertStyles.textContent = `
    .katheeb-alert {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    }
    .katheeb-alert .alert-content {
        background: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
    }
    .katheeb-alert p {
        margin-bottom: 20px;
        line-height: 1.6;
    }
    .katheeb-alert button {
        background: var(--accent, #C9A96E);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
    }
    .katheeb-alert--error .alert-content { border-top: 4px solid #C41E3A; }
    .katheeb-alert--success .alert-content { border-top: 4px solid #2E7D32; }

    input.error, select.error, textarea.error {
        border-color: #C41E3A !important;
        background-color: rgba(196, 30, 58, 0.05);
    }
`;
document.head.appendChild(alertStyles);

// Export functions
window.showAlert = showAlert;
