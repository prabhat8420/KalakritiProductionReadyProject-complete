export interface CraftTradition {
  id: string;
  name: string;
  slug: string;
  description: string;
  region: string;
  state_id?: string;
  heritage_origin?: string;
}

export interface StateCraft {
  id: string;
  name: string;
  slug: string;
  craft_count: number;
  famous_traditions: string[];
}
