export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 
  'https://kalakritiproductionreadyproject-complete-production.up.railway.app/api/v1'
).replace(/\/$/, '');

