import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const FLASK_URL = process.env.FLASK_API_URL || 'http://127.0.0.1:5000';
    const res = await fetch(`${FLASK_URL}/api/scenarios-coverage`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 'ERROR', message: 'Failed to connect to ML backend for scenarios coverage' },
      { status: 500 }
    );
  }
}
