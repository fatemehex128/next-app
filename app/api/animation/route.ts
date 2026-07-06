
// app/api/animation/route.ts
import { NextResponse } from 'next/server';

const SIMKL_API_KEY = process.env.SIMKL_API_KEY;
const SIMKL_BASE_URL = 'https://api.simkl.com/';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';

  if (!SIMKL_API_KEY) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // دریافت لیست انیمیشن‌های جدید برای کودکان
    // این یک نمونه است و باید endpoint دقیق رو از مستندات Simkl بررسی کنی
    const response = await fetch(
      `${SIMKL_BASE_URL}search/anime?genres=Kids&year=2026&api_key=${SIMKL_API_KEY}&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // کش کردن به مدت ۱ ساعت
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // فیلتر کردن و فرمت کردن داده‌ها
    const animations = data.map((item: any) => ({
      id: item.ids?.simkl || item.id,
      title: item.title,
      year: item.year,
      description: item.overview,
      rating: item.rating,
      poster: item.poster,
      genres: item.genres,
    }));

    return NextResponse.json({
      success: true,
      data: animations,
      total: animations.length,
    });

  } catch (error) {
    console.error('Error fetching animations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch animations' },
      { status: 500 }
    );
  }
}