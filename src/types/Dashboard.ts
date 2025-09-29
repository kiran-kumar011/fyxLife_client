export type GoalStatus = 'pending' | 'in_progress' | 'completed';

export interface Goal {
  _id: string;
  title: string;
}

export interface Pack {
  _id: string;
  title: string;
  goals: Goal[];
}

export type GoalsStatusMap = Record<string, GoalStatus>;
