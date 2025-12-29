import { NextResponse } from 'next/server';

// In production, use a real database (Vercel KV, Supabase, etc.)
// For now, we'll log the tokens and store in memory
const merchantTokens = new Map();

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('=== Salla Webhook Received ===');
    console.log('Event:', body.event);
    console.log('Data:', JSON.stringify(body, null, 2));

    // Handle app authorization (when merchant installs the app)
    if (body.event === 'app.store.authorize') {
      const { merchant, data } = body;

      // Extract tokens
      const tokenData = {
        merchant_id: merchant,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        scope: data.scope,
        created_at: new Date().toISOString(),
      };

      // Generate API Key for the merchant
      const apiKey = `SK_${generateApiKey()}`;
      tokenData.api_key = apiKey;

      // Store token (in production, save to database)
      merchantTokens.set(merchant.toString(), tokenData);

      console.log('=== New Merchant Authorized ===');
      console.log('Merchant ID:', merchant);
      console.log('API Key:', apiKey);
      console.log('Access Token:', data.access_token?.substring(0, 20) + '...');

      return NextResponse.json({
        success: true,
        message: 'Merchant authorized successfully',
        api_key: apiKey,
      });
    }

    // Handle app uninstall
    if (body.event === 'app.store.revoke') {
      const { merchant } = body;
      merchantTokens.delete(merchant.toString());

      console.log('=== Merchant Revoked ===');
      console.log('Merchant ID:', merchant);

      return NextResponse.json({
        success: true,
        message: 'Merchant access revoked',
      });
    }

    // Handle other events
    return NextResponse.json({
      success: true,
      message: 'Event received',
      event: body.event,
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook', details: error.message },
      { status: 500 }
    );
  }
}

// Generate random API Key
function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Export merchant tokens for other API routes
export { merchantTokens };
