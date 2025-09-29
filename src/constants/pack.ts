import { Pack } from '../types/Dashboard';
export const PACKS: Pack[] = [
  {
    id: 'pack_morning_reset',
    title: 'Morning Reset 🌅',
    goals: [
      { id: 'g_m_stretch', title: '10 min stretch' },
      { id: 'g_m_breathe', title: '5 min breathing' },
      { id: 'g_m_water', title: 'Drink a glass of water' },
    ],
  },
  {
    id: 'pack_desk_warrior',
    title: 'Desk Warrior 💻',
    goals: [
      { id: 'g_d_neck', title: '5 min neck rolls' },
      { id: 'g_d_walk', title: '15 min walk' },
      { id: 'g_d_leg', title: '2 sets seated leg extensions' },
    ],
  },
  {
    id: 'pack_cardio_boost',
    title: 'Cardio Boost 🏃',
    goals: [
      { id: 'g_c_walk', title: '20 min walk' },
      { id: 'g_c_stairs', title: '10 min stairs' },
      { id: 'g_c_cool', title: '5 min cooldown stretch' },
    ],
  },
  {
    id: 'pack_mind_body',
    title: 'Mind & Body 🧘',
    goals: [
      { id: 'g_mb_meditate', title: '10 min meditation' },
      { id: 'g_mb_gratitude', title: 'Write 3 gratitude notes' },
      { id: 'g_mb_yoga', title: '10 min yoga flow' },
    ],
  },
];
