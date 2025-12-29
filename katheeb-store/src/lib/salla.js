// Salla API Integration

const SALLA_API_URL = 'https://api.salla.dev/admin/v2';

// Get Access Token
async function getAccessToken() {
  const response = await fetch('https://accounts.salla.sa/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SALLA_CLIENT_ID,
      client_secret: process.env.SALLA_CLIENT_SECRET,
      scope: 'products.read orders.read orders.write customers.read',
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Fetch from Salla API
async function sallaFetch(endpoint, options = {}) {
  const token = await getAccessToken();

  const response = await fetch(`${SALLA_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return response.json();
}

// Get All Products
export async function getProducts() {
  try {
    const data = await sallaFetch('/products?per_page=50');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get Single Product
export async function getProduct(id) {
  try {
    const data = await sallaFetch(`/products/${id}`);
    return data.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Get Categories
export async function getCategories() {
  try {
    const data = await sallaFetch('/categories');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get Products by Category
export async function getProductsByCategory(categoryId) {
  try {
    const data = await sallaFetch(`/products?category_id=${categoryId}`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Create Order
export async function createOrder(orderData) {
  try {
    const data = await sallaFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return data.data || null;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

// Format product for display
export function formatProduct(product) {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand?.name || '',
    price: product.price?.amount || 0,
    oldPrice: product.sale_price?.amount || null,
    image: product.thumbnail || product.images?.[0]?.url || '',
    images: product.images?.map(img => img.url) || [],
    description: product.description || '',
    category: product.categories?.[0]?.name || '',
    inStock: product.quantity > 0,
    sku: product.sku || '',
  };
}
