import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  
  return NextResponse.json({
    ticket_number: "KLK-REP-202608-52D84C",
    ai_damage_type: "Surface hairline fracture along rim & enamel chip",
    ai_severity: "Medium",
    ai_repairability_score: 0.88,
    ai_assessment_text: "Easily restorable. Traditional quartz-paste infill and turquoise re-glazing will restore full structural integrity.",
    matched_repair_partner: {
      name: "Jaipur Heritage Ceramic & Quartz Restoration Guild",
      rating: 4.95,
      service_region: "Rajasthan & North India"
    },
    status: "matched"
  }, { status: 201 });
}
