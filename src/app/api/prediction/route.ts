import { NextResponse } from 'next/server';

export async function GET() {
  // In a real environment, this would call a Python microservice or spawn a child process
  // For the current prototype phase, the model is not yet trained.
  
  return NextResponse.json({
    modelStatus: "NOT_TRAINED",
    prediction: null,
    probability: null,
    features: null,
    message: "Real ML prediction will appear after the selected model is trained and validated."
  });
}
