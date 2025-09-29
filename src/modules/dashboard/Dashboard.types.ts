export interface GoalTemplate {
  id: string; // template id, e.g. "g_ep_peak"
  title: string;
  type: 'exercise' | 'nutrition' | 'sleep' | 'mindfulness' | 'other';
  target?: string | null;
  reason?: string | null;
  icon?: string | null;
  isActive?: boolean;
}

// pack from template
export interface PackTemplate {
  id: string; // e.g. "pack_elite_performance"
  title: string;
  goals: GoalTemplate[];
}

// GET /api/packs response
export interface GetPacksResponse {
  activityLevel: string; // normalized key, e.g. "elite"
  total: number;
  limit: number;
  skip: number;
  packs: PackTemplate[];
}
