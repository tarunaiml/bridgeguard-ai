import { NextResponse } from 'next/server';

export async function GET() {
  // In a real environment, this would call the Python ml/explain.py module
  // For the current prototype phase, the model is not yet trained.
  
  return NextResponse.json({
    status: "NOT_TRAINED",
    message: "SHAP READY — WAITING FOR TRAINED MODEL",
    base_value: null,
    contributions: null,
    global_importance: null
  });
}
