import { NextResponse } from 'next/server';
import { SEED_PRODUCTS } from '@/lib/catalog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const product = SEED_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}
