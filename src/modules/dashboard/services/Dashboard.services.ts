// api/packs.ts
import {
  useQuery,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { apiService } from '../../../network';

export interface GoalTemplate {
  _id: string;
  title: string;
  type: 'exercise' | 'nutrition' | 'sleep' | 'mindfulness' | 'other';
  target?: string | null;
  reason?: string | null;
  icon?: string | null;
  isActive?: boolean;
}

export type Pack = {
  _id: string;
  title: string;
  goals: GoalTemplate[];
};
export interface PackTemplate {
  _id: string;
  title: string;
  goals: GoalTemplate[];
}

export type CreatePackRequest = {
  deviceId: string;
  pack: Pack;
};

export interface GetPacksResponse {
  activityLevel: string;
  total: number;
  limit: number;
  skip: number;
  packs: PackTemplate[];
}

export type PackResponse = {
  pack: Pack;
};

export interface GetPacksRequest {
  activityLevel: string;
  limit?: number;
  skip?: number;
}

export async function getPacks(
  params: GetPacksRequest,
): Promise<GetPacksResponse> {
  if (!params.activityLevel) {
    throw new Error('activityLevel is required');
  }

  const response = await apiService.get(
    `/packs?activityLevel=${params.activityLevel}`,
  );
  return response.data as GetPacksResponse;
}

/**
 * useGetPacks (v5-compatible)
 * - options param purposely omits queryKey/queryFn so callers can't accidentally override them
 */
export function useGetPacks(params: GetPacksRequest) {
  const queryKey = [
    'packs',
    params.activityLevel?.toLowerCase() || 'unknown',
    params.limit ?? 100,
    params.skip ?? 0,
  ] as const;

  return useQuery<GetPacksResponse, Error>({
    queryKey,
    queryFn: () => getPacks(params),
    enabled: !!params.activityLevel,
  });
}

export function useCreatePack(): UseMutationResult<
  PackResponse, // Success type
  Error, // Error type
  CreatePackRequest // Variables type
> {
  return useMutation({
    mutationFn: async (payload: CreatePackRequest) => {
      if (!payload.deviceId) {
        return;
      }
      const response = await apiService.post<PackResponse>(
        '/packs/create',
        payload,
      );
      return response.data;
    },
  });
}

type UpdateGoalRequest = {
  startTime?: string;
  deviceId: string;
  completedTime?: string;
};

const updateGoal = async (goalId: string, data: UpdateGoalRequest) => {
  const response = await apiService.put(`/goals/${goalId}`, data);
  return response.data;
};

export const useUpdateGoal = () => {
  return useMutation({
    mutationFn: ({
      goalId,
      data,
    }: {
      goalId: string;
      data: UpdateGoalRequest;
    }) => updateGoal(goalId, data),
  });
};
