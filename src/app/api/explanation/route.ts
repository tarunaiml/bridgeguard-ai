import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Call the Python ML backend
    const response = await fetch('http://127.0.0.1:5000/api/explain', {
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
      status: "NOT_TRAINED",
      message: "SHAP READY — WAITING FOR TRAINED MODEL (Python backend offline)",
      base_value: null,
      contributions: null,
      global_importance: null
    });
  }
}

