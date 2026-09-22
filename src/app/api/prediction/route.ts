import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Call the Python ML backend
    const FLASK_URL = process.env.FLASK_API_URL || 'http://127.0.0.1:5000';
    const response = await fetch(`${FLASK_URL}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error('ML backend not running');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Graceful fallback if Python server is not running
    return NextResponse.json({
      modelStatus: "NOT_TRAINED",
      prediction: null,
      probability: null,
      features: null,
      message: "Real ML prediction will appear after the selected model is trained and validated."
    });
  }
}

