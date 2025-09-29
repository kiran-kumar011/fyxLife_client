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

export type Pack = {
  id: string;
  title: string;
  goals: Goal[];
  updatedAt?: string;
};
