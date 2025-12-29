import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://accounts.salla.sa/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.SALLA_CLIENT_ID,
        client_secret: process.env.SALLA_CLIENT_SECRET,
        code: code,
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://katheeb.vercel.app'}/api/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error, details: tokenData }, { status: 400 });
    }

    // Return the tokens to display (in production, save these securely)
    return new NextResponse(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>تم الربط بنجاح!</title>
        <style>
          body { font-family: 'Readex Pro', sans-serif; background: #111; color: #fff; padding: 40px; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; padding: 30px; border-radius: 10px; }
          h1 { color: #C9A96E; }
          .token-box { background: #222; padding: 15px; border-radius: 5px; word-break: break-all; margin: 10px 0; font-size: 12px; }
          .label { color: #C9A96E; font-weight: bold; margin-top: 20px; }
          .success { color: #4CAF50; }
          .warning { color: #ff9800; margin-top: 20px; padding: 15px; background: #332700; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="success">✅ تم الربط بنجاح!</h1>
          <p>تم ربط التطبيق بمتجرك بنجاح. احفظ هذه البيانات:</p>

          <div class="label">Access Token:</div>
          <div class="token-box">${tokenData.access_token}</div>

          <div class="label">Refresh Token:</div>
          <div class="token-box">${tokenData.refresh_token || 'N/A'}</div>

          <div class="label">Expires In:</div>
          <div class="token-box">${tokenData.expires_in} ثانية</div>

          <div class="warning">
            ⚠️ <strong>مهم:</strong> انسخ الـ Access Token وأرسله لي عشان أضيفه للموقع
          </div>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to exchange code', details: err.message }, { status: 500 });
  }
}
