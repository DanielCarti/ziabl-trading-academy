import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Schedule of Bank of Russia Board of Directors key rate decision meetings
// (Bank of Russia holds exactly 8 scheduled meetings per year, ~every 6-7 weeks on Fridays at 13:30 MSK)
const CBR_RATE_SCHEDULE_MEETINGS = [
  '2024-02-16',
  '2024-03-22',
  '2024-04-26',
  '2024-06-07',
  '2024-07-26',
  '2024-09-13',
  '2024-10-25',
  '2024-12-20',
  '2025-02-14',
  '2025-03-21',
  '2025-04-25',
  '2025-06-06',
  '2025-07-25',
  '2025-09-12',
  '2025-10-24',
  '2025-12-19',
];

// In-memory cache for process lifecycle
let memoryCache: {
  rate: number;
  date: string;
  nextMeeting: string;
  lastCheckedAt: number;
  source: string;
} = {
  rate: 18.0,
  date: '2024-07-26',
  nextMeeting: '2024-09-13',
  lastCheckedAt: 0,
  source: 'cbr.ru',
};

// 12 hours check interval
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

function getNextScheduledMeeting(): string {
  const today = new Date().toISOString().split('T')[0];
  const next = CBR_RATE_SCHEDULE_MEETINGS.find((m) => m >= today);
  return next || '2025-10-24';
}

async function fetchLiveCbrRate(): Promise<{ rate: number; date: string; source: string } | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    // Primary Source: Official CBR API endpoint for Key Rate statistics
    const res = await fetch('https://www.cbr.ru/Queries/AjaxDataSource/112805', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'application/json, text/plain, */*',
      },
      signal: controller.signal,
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[data.length - 1];
        const parsedRate = parseFloat(latest.Rate || latest.KeyRate || latest.rate || '');
        if (!isNaN(parsedRate) && parsedRate > 0 && parsedRate < 100) {
          return {
            rate: parsedRate,
            date: latest.Date || latest.DT || new Date().toISOString().split('T')[0],
            source: 'cbr.ru (API)',
          };
        }
      }
    }
  } catch (err) {
    // Ignore timeout / network error and fallback to HTML parsing
  } finally {
    clearTimeout(timeoutId);
  }

  // Secondary Source: CBR homepage key rate headline
  try {
    const pageController = new AbortController();
    const pageTimeout = setTimeout(() => pageController.abort(), 4000);
    const pageRes = await fetch('https://www.cbr.ru/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      signal: pageController.signal,
    });
    clearTimeout(pageTimeout);

    if (pageRes.ok) {
      const html = await pageRes.text();
      const match = html.match(/Ключевая ставка[\s\S]*?(\d{1,2}[,\.]\d{1,2})\s*%/i);
      if (match && match[1]) {
        const parsedRate = parseFloat(match[1].replace(',', '.'));
        if (!isNaN(parsedRate) && parsedRate > 0) {
          return {
            rate: parsedRate,
            date: new Date().toISOString().split('T')[0],
            source: 'cbr.ru (Парсинг)',
          };
        }
      }
    }
  } catch (err) {
    // Fallback
  }

  return null;
}

export async function GET() {
  const now = Date.now();
  const nextMeeting = getNextScheduledMeeting();

  // If cache is fresh, return immediately without spamming the CBR server
  if (now - memoryCache.lastCheckedAt < CACHE_TTL_MS && memoryCache.lastCheckedAt !== 0) {
    return NextResponse.json({
      rate: memoryCache.rate,
      date: memoryCache.date,
      nextMeeting,
      status: 'cached',
      source: memoryCache.source,
      cachedUntil: new Date(memoryCache.lastCheckedAt + CACHE_TTL_MS).toISOString(),
    });
  }

  // Refresh rate politely in background
  const liveData = await fetchLiveCbrRate();
  if (liveData) {
    memoryCache = {
      rate: liveData.rate,
      date: liveData.date,
      nextMeeting,
      lastCheckedAt: now,
      source: liveData.source,
    };
  } else {
    // Keep previously known rate or current actual 18.0%
    memoryCache.lastCheckedAt = now;
    memoryCache.nextMeeting = nextMeeting;
  }

  return NextResponse.json({
    rate: memoryCache.rate,
    date: memoryCache.date,
    nextMeeting,
    status: liveData ? 'fresh' : 'fallback',
    source: memoryCache.source,
    cachedUntil: new Date(now + CACHE_TTL_MS).toISOString(),
  });
}
