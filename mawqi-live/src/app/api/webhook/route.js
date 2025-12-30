import { NextResponse } from 'next/server';

// In production, use a real database (PostgreSQL, MongoDB, etc.)
// For demo, we log and return

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('=== موقعي لايف - Webhook Received ===');
    console.log('Event:', body.event);
    console.log('Merchant:', body.merchant);
    console.log('Time:', new Date().toISOString());

    // Handle app authorization
    if (body.event === 'app.store.authorize') {
      const { merchant, data } = body;

      // Generate unique API Key for merchant
      const apiKey = `ML_${generateApiKey()}`;

      // In production: Save to database
      // {
      //   merchant_id: merchant,
      //   api_key: apiKey,
      //   access_token: data.access_token,
      //   refresh_token: data.refresh_token,
      //   created_at: new Date()
      // }

      console.log('=== New Merchant Connected ===');
      console.log('Merchant ID:', merchant);
      console.log('API Key:', apiKey);

      return NextResponse.json({
        success: true,
        message: 'تم ربط المتجر بنجاح',
        api_key: apiKey,
      });
    }

    // Handle app uninstall
    if (body.event === 'app.store.revoke') {
      console.log('=== Merchant Disconnected ===');
      console.log('Merchant ID:', body.merchant);

      return NextResponse.json({
        success: true,
        message: 'تم إلغاء ربط المتجر',
      });
    }

    // Handle other events (orders, products updates, etc.)
    return NextResponse.json({
      success: true,
      event: body.event,
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'فشل معالجة الطلب', details: error.message },
      { status: 500 }
    );
  }
}

function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
