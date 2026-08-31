import { NextResponse } from 'next/server';

const TRADITIONS = [
  {
    id: '1',
    name: 'Madhubani Painting',
    region: 'Mithila, Bihar',
    heritage_origin: 'Mithila Kingdom (8th Century BCE)',
    description: 'Ancient geometrical and nature-inspired paintings traditionally made using twigs, brushes, and natural vegetable dyes on treated cloth and handmade paper.'
  },
  {
    id: '2',
    name: 'Jaipur Blue Pottery',
    region: 'Jaipur, Rajasthan',
    heritage_origin: 'Turko-Persian origins adopted in 19th Century Jaipur',
    description: 'A unique style of glazed pottery using quartz powder and Egyptian paste rather than traditional clay, famed for cobalt blue floral motifs.'
  },
  {
    id: '3',
    name: 'Dhokra Bell Metal',
    region: 'Bastar, Chhattisgarh / Odisha',
    heritage_origin: 'Indus Valley Civilization (Mohenjo-daro Dancing Girl tradition)',
    description: 'Non-ferrous metal casting using the ancient lost-wax technique, known for rustic tribal motifs and timeless primitive minimalism.'
  }
];

export async function GET() {
  return NextResponse.json(TRADITIONS);
}
