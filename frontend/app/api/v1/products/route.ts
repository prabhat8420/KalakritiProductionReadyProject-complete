import { NextResponse } from 'next/server';
import { SEED_PRODUCTS } from '@/lib/catalog';

export async function GET() {
  return NextResponse.json(SEED_PRODUCTS);
}
