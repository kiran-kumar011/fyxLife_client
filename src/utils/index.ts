import { Pack, GoalsStatusMap, GoalStatus } from '../types/Dashboard';
export const todayKey = () => new Date().toISOString().split('T')[0];

export const formattedDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', // Monday
  day: 'numeric', // 30
  month: 'long', // September
  year: 'numeric', // 2025
});

export const buildInitialStatuses = (pack: Pack): GoalsStatusMap =>
  Object.fromEntries(pack.goals.map(g => [g.id, 'pending' as GoalStatus]));

export const statusBackground = (status: GoalStatus) => {
  switch (status) {
    case 'completed':
      return { backgroundColor: '#E6F7EA' };
    case 'in_progress':
      return { backgroundColor: '#FFF7E6' };
    default:
      return { backgroundColor: '#FFFFFF' };
  }
};
