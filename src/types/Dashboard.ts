export enum GoalStatusEnum {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export type GoalStatus = 'pending' | 'in_progress' | 'completed';

export type Goal = {
  _id: string;
  title: string;
  type?: string;
  target?: string;
  reason?: string;
  icon?: string;
  isActive?: boolean;
  startTime?: string | null;
  completedTime?: string | null;
  createdAt?: string | null;
};

export interface Pack {
  _id: string;
  title: string;
  goals: Goal[];
}

export type GoalsStatusMap = Record<string, GoalStatusEnum>;
