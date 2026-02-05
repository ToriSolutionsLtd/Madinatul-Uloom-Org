/**
 * Prayer Times API Route
 * Proxies requests to UmmahAPI to avoid CORS issues
 */

import { NextRequest, NextResponse } from 'next/server';

const UMMAH_API_URL = 'https://www.ummahapi.com/api/prayer-times';

// Map calculation method IDs to UmmahAPI method names
const METHOD_MAP: Record<string, string> = {
  '1': 'MuslimWorldLeague',
  '2': 'ISNA',
  '3': 'MuslimWorldLeague',
  '4': 'UmmAlQura',
  '5': 'Egyptian',
  '7': 'Tehran',
  '8': 'Gulf',
  '9': 'Kuwait',
  '10': 'Qatar',
  '11': 'Singapore',
  '12': 'France',
  '13': 'Turkey',
  '14': 'Russia',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const methodId = searchParams.get('method') || '2';
  const juristic = searchParams.get('juristic') || '0';

  if (!latitude || !longitude) {
    return NextResponse.json({ error: 'Missing latitude or longitude' }, { status: 400 });
  }

  // Map method ID to UmmahAPI method name
  const method = METHOD_MAP[methodId] || 'ISNA';
  // Map juristic: 0=Shafi, 1=Hanafi
  const madhab = juristic === '1' ? 'Hanafi' : 'Shafi';

  const params = new URLSearchParams({
    lat: latitude,
    lng: longitude,
    method,
    madhab,
  });

  const url = `${UMMAH_API_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'MadinatulUloom/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('[Prayer Times API] Response not OK:', response.status);
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ error: data.message || 'API returned error' }, { status: 500 });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('[Prayer Times API] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch prayer times' }, { status: 500 });
  }
}
