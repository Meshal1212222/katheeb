import { NextResponse } from 'next/server';

// Salla API URL
const SALLA_API_URL = 'https://api.salla.dev/admin/v2';

// In production, get this from database
// For demo, we'll use environment variable
async function getMerchantToken(apiKey) {
  // Demo: return the token from env
  // Production: lookup apiKey in database and return merchant's access_token
  if (process.env.SALLA_ACCESS_TOKEN) {
    return process.env.SALLA_ACCESS_TOKEN;
  }
  return null;
}

export async function GET(request) {
  try {
    // Get API Key from header
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key required. Add X-API-Key header.' },
        { status: 401 }
      );
    }

    // Get merchant's access token
    const accessToken = await getMerchantToken(apiKey);

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Invalid API Key or merchant not found.' },
        { status: 401 }
      );
    }

    // Fetch products from Salla
    const response = await fetch(`${SALLA_API_URL}/products?per_page=50`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch products from Salla', details: data },
        { status: response.status }
      );
    }

    // Format products for easy use
    const products = (data.data || []).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price?.amount || 0,
      currency: product.price?.currency || 'SAR',
      sale_price: product.sale_price?.amount || null,
      image: product.thumbnail || product.images?.[0]?.url || '',
      images: product.images?.map(img => img.url) || [],
      category: product.categories?.[0]?.name || '',
      in_stock: product.quantity > 0,
      quantity: product.quantity,
      sku: product.sku || '',
      url: product.url || '',
    }));

    // Add CORS headers for external access
    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products: products,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'X-API-Key, Content-Type',
        },
      }
    );

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-API-Key, Content-Type',
    },
  });
}
