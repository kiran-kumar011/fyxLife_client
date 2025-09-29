// api/packs.ts
import {
  useQuery,
  type UseQueryOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { apiService } from '../../../network';
import { useDeviceId } from '../../../hooks/useDeviceId';

export interface GoalTemplate {
  id: string;
  title: string;
  type: 'exercise' | 'nutrition' | 'sleep' | 'mindfulness' | 'other';
  target?: string | null;
  reason?: string | null;
  icon?: string | null;
  isActive?: boolean;
}

export type Pack = {
  id: string;
  title: string;
  goals: GoalTemplate[];
};
export interface PackTemplate {
  id: string;
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

export type CreatePackResponse = {
  success: boolean;
  data: {
    pack: Pack;
  };
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
  CreatePackResponse, // Success type
  Error, // Error type
  CreatePackRequest // Variables type
> {
  return useMutation({
    mutationFn: async (payload: CreatePackRequest) => {
      console.log(payload, 'payload');
      if (!payload.deviceId) {
        return;
      }
      const response = await apiService.post<CreatePackResponse>(
        '/packs/create',
        payload,
      );
      return response.data;
    },
  });
}
