import { NextResponse } from 'next/server';

const SALLA_API_URL = 'https://api.salla.dev/admin/v2';

// In production: Get merchant's access token from database using API key
async function getMerchantToken(apiKey) {
  // Demo: Use env variable
  // Production: Query database for merchant's access_token
  return process.env.SALLA_ACCESS_TOKEN || null;
}

export async function GET(request) {
  try {
    // Get API Key from header
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'مفتاح API مطلوب',
          message: 'أضف X-API-Key في headers الطلب'
        },
        { status: 401 }
      );
    }

    // Validate API Key format
    if (!apiKey.startsWith('ML_')) {
      return NextResponse.json(
        {
          success: false,
          error: 'مفتاح API غير صالح',
          message: 'تأكد من صحة المفتاح'
        },
        { status: 401 }
      );
    }

    // Get merchant's access token
    const accessToken = await getMerchantToken(apiKey);

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'المتجر غير موجود',
          message: 'تأكد من تثبيت التطبيق على متجرك'
        },
        { status: 404 }
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
        {
          success: false,
          error: 'فشل جلب المنتجات',
          details: data
        },
        { status: response.status }
      );
    }

    // Format products
    const products = (data.data || []).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price?.amount || 0,
      currency: product.price?.currency || 'SAR',
      sale_price: product.sale_price?.amount || null,
      image: product.thumbnail || product.images?.[0]?.url || '',
      images: product.images?.map(img => img.url) || [],
      category: product.categories?.[0]?.name || '',
      in_stock: product.quantity > 0,
      quantity: product.quantity || 0,
      sku: product.sku || '',
      url: product.url || '',
    }));

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
      {
        success: false,
        error: 'خطأ في الخادم',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Handle CORS
export async function OPTIONS(request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-API-Key, Content-Type',
    },
  });
}
