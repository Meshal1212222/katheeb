import Link from 'next/link';
import { getProducts, getCategories, formatProduct } from '@/lib/salla';
import ProductCard from '@/components/ProductCard';

// Header Component
function Header() {
  return (
    <>
      <div className="top-bar">
        شحن مجاني لجميع الطلبات فوق <span>500 ر.س</span> | توصيل سريع خلال 24 ساعة للرياض
      </div>
      <header className="header">
        <div className="header-main">
          <div className="header-right">
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>حسابي</span>
            </div>
          </div>

          <Link href="/" className="logo">
            <h1 style={{fontSize: '28px', fontWeight: '600', letterSpacing: '2px'}}>KATHEEB</h1>
          </Link>

          <div className="header-left">
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div className="header-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span className="count">0</span>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          <div className="nav-container">
            <Link href="/products?filter=new" className="nav-link">ما وصل حديثاً</Link>
            <Link href="/products?category=designers" className="nav-link">المصممون</Link>
            <Link href="/products?category=clothing" className="nav-link">ملابس</Link>
            <Link href="/products?category=shoes" className="nav-link">أحذية</Link>
            <Link href="/products?category=sneakers" className="nav-link">أحذية السنيكرز</Link>
            <Link href="/products?category=accessories" className="nav-link">اكسسوارات</Link>
            <Link href="/products?category=care" className="nav-link">مستحضرات العناية</Link>
            <Link href="/products?category=gifts" className="nav-link">الهدايا</Link>
            <Link href="/products?category=bags" className="nav-link">حقائب</Link>
            <Link href="/products?category=watches" className="nav-link">ساعات</Link>
            <Link href="/offers" className="nav-link sale">تخفيضات</Link>
          </div>
        </nav>
      </header>
    </>
  );
}

// Features Bar
function FeaturesBar() {
  return (
    <section className="features-bar">
      <div className="feature-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
        </svg>
        <span>شحن مجاني فوق 500 ر.س</span>
      </div>
      <div className="feature-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span>توصيل سريع خلال 3 ساعات</span>
      </div>
      <div className="feature-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
        <span>منتجات أصلية 100%</span>
      </div>
      <div className="feature-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <span>دفع آمن</span>
      </div>
    </section>
  );
}

// Categories Grid
function CategoriesGrid() {
  const categories = [
    { name: 'تسوقوا للنساء', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600', href: '/products?category=women' },
    { name: 'تسوقوا للرجال', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', href: '/products?category=men' },
    { name: 'تسوقوا للأطفال', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600', href: '/products?category=kids' },
  ];

  return (
    <section className="categories-section">
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <Link href={cat.href} key={index} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <span className="category-btn">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Products Section
function ProductsSection({ title, products }) {
  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <Link href="/products" className="view-all">عرض الكل</Link>
      </div>
      <div className="products-scroll">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </section>
  );
}

// Banner Section
function BannerSection() {
  return (
    <section className="banner-section">
      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400" alt="عروض حصرية" />
      <div className="banner-content">
        <h3 className="banner-title">أحذية السنيكرز التي يحتاجها كل رجل</h3>
        <p className="banner-desc">اكتشف معنا كل التصاميم الرائجة من موديلات السنيكرز العصرية والكلاسيكية</p>
        <Link href="/products?category=sneakers" className="banner-btn">تسوق الآن</Link>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>KATHEEB</h4>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8'}}>
            وجهتكم الأولى للأزياء الفاخرة في المملكة العربية السعودية
          </p>
        </div>
        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <Link href="/about">من نحن</Link>
          <Link href="/contact">تواصل معنا</Link>
          <Link href="/shipping">الشحن والتوصيل</Link>
          <Link href="/returns">الاستبدال والاسترجاع</Link>
        </div>
        <div className="footer-col">
          <h4>الأقسام</h4>
          <Link href="/products?category=men">للرجال</Link>
          <Link href="/products?category=women">للنساء</Link>
          <Link href="/products?category=kids">للأطفال</Link>
          <Link href="/offers">التخفيضات</Link>
        </div>
        <div className="footer-col">
          <h4>تواصل معنا</h4>
          <a href="mailto:support@katheeb.shop">support@katheeb.shop</a>
          <a href="tel:8001234567">8001234567</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 KATHEEB. جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

// Sample Products (fallback if API fails)
const sampleProducts = [
  { id: 1, brand: 'TOM FORD', name: 'نظارة شمسية أفياتور ذهبي', price: 1850, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' },
  { id: 2, brand: 'ROLEX', name: 'ساعة أويستر بربتشوال فضي', price: 45000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 3, brand: 'VALENTINO', name: 'حقيبة فالنتينو جلد أسود', price: 8500, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
  { id: 4, brand: 'DIOR', name: 'عطر سوفاج أو دو بارفان', price: 580, oldPrice: 725, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
  { id: 5, brand: 'GUCCI', name: 'حقيبة GG Marmont جلد أسود', price: 8500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
  { id: 6, brand: 'CARTIER', name: 'ساعة تانك فرانسيز ذهبي', price: 78000, image: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=400' },
];

// Main Page (Server Component)
export default async function Home() {
  let products = [];

  try {
    // Try to fetch products from Salla API
    const sallaProducts = await getProducts();
    products = sallaProducts.map(formatProduct);
  } catch (error) {
    console.log('Using sample products');
  }

  // Use sample products if no products from API
  if (products.length === 0) {
    products = sampleProducts;
  }

  return (
    <>
      <Header />
      <FeaturesBar />
      <CategoriesGrid />
      <ProductsSection title="أبرز التصاميم" products={products.slice(0, 6)} />
      <BannerSection />
      <ProductsSection title="الهدية المثالية" products={products.slice().reverse().slice(0, 6)} />
      <Footer />
    </>
  );
}
