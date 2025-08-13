import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET(request) {
  const result = await getProducts();
  
  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}