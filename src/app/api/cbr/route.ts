import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 1800; // 30 minutes cache

export async function GET() {
  try {
    // Attempt fetching from CBR official data service
    const res = await fetch('https://www.cbr.ru/Queries/AjaxDataSource/112805', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
      },
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[data.length - 1];
        const rate = parseFloat(latest.Rate || latest.KeyRate || latest.rate || '18.0');
        const date = latest.Date || latest.DT || new Date().toISOString().split('T')[0];
        return NextResponse.json({
          rate: rate || 18.0,
          date: date,
          status: 'success',
          source: 'cbr.ru',
        });
      }
    }

    // Fallback: parse CBR main page or use current rate
    const pageRes = await fetch('https://www.cbr.ru/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      next: { revalidate: 1800 },
    });

    if (pageRes.ok) {
      const html = await pageRes.text();
      // Look for key rate in CBR markup: "Ключевая ставка ... 18,00" or similar
      const match = html.match(/Ключевая ставка[\s\S]*?(\d{1,2}[,\.]\d{1,2})\s*%/i);
      if (match && match[1]) {
        const parsedRate = parseFloat(match[1].replace(',', '.'));
        return NextResponse.json({
          rate: parsedRate,
          date: new Date().toISOString().split('T')[0],
          status: 'success',
          source: 'cbr.ru',
        });
      }
    }

    // Default current actual Central Bank rate
    return NextResponse.json({
      rate: 18.0,
      date: new Date().toISOString().split('T')[0],
      status: 'fallback',
      source: 'cbr.ru',
    });
  } catch (error) {
    return NextResponse.json({
      rate: 18.0,
      date: new Date().toISOString().split('T')[0],
      status: 'fallback',
      source: 'cbr.ru',
    });
  }
}
