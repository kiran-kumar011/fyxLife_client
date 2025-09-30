import React, { useState, useCallback, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import storage from '../../../storage';
import { GoalStatus, Pack, Goal } from '../../../types/Dashboard';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { formattedDate, isoDate } from '../../../utils';
import GoalCard from '../components/GoalCard';
import PackCard from '../components/PackCard';
import {
  useGetPacks,
  useCreatePack,
  PackResponse,
  useUpdateGoal,
} from '../services/Dashboard.services';
import { useSelectedPackStore } from '../../../store/useSelectedPack';

const Dashboard = () => {
  const selectedDate = useSelectedPackStore(s => s.selectedDate);
  const selectPackForToday = useSelectedPackStore(s => s.selectPackForToday);
  const clearSelectedPack = useSelectedPackStore(s => s.clearSelectedPack);
  const rehydrated = useSelectedPackStore(s => s.rehydrated);
  const selectedPack = useSelectedPackStore(s => s.selectedPack);
  const updateGoal = useSelectedPackStore(s => s.updateGoal);

  const [activityLevel, setActivityLevel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useCreatePack();
  const { mutate: mutateUpdateGoal } = useUpdateGoal();
  const { data, isFetching } = useGetPacks({
    activityLevel,
  });

  useEffect(() => {
    if (rehydrated) {
      if (selectedDate !== isoDate()) {
        invokeFetchSuggestion();
      }
    }
  }, [rehydrated, selectedDate]);

  const invokeFetchSuggestion = async () => {
    clearSelectedPack();
    const user = await storage.get(STORAGE_KEYS.USER_INFO);
    console.log(user, 'user');
    setActivityLevel(user.activityLevel.toLowerCase());
  };
  const handleChoosePack = useCallback(async (pack: Pack) => {
    setLoading(true);
    postSelectedPack(pack);
  }, []);

  const postSelectedPack = async (pack: Pack) => {
    const deviceId = await DeviceInfo.getUniqueId();
    mutate(
      { deviceId, pack },
      {
        onSuccess: async (response: PackResponse) => {
          selectPackForToday(isoDate(), response?.pack);
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const postGoalUpdate = async (goalId: string, patch: any) => {
    const deviceId = await DeviceInfo.getUniqueId();
    mutateUpdateGoal(
      {
        goalId,
        data: { ...patch, deviceId },
      },
      {
        onSuccess: (data: any) => updateGoal(goalId, data),
        onError: e => console.error(e),
      },
    );
  };

  const handleStartGoal = useCallback(async (goalId: string) => {
    postGoalUpdate(goalId, { startTime: new Date().toISOString() });
  }, []);

  const handleCompleteGoal = useCallback(async (goalId: string) => {
    postGoalUpdate(goalId, { completedTime: new Date().toISOString() });
  }, []);

  if (isFetching || loading || !rehydrated) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedPack
            ? `Today's Goals — ${selectedPack.goals.length}`
            : 'Choose a Pack'}
        </Text>
        {selectedPack ? (
          <>
            <Text style={styles.subTitle}>{selectedPack.title}</Text>
            <Text>{formattedDate}</Text>
          </>
        ) : (
          <Text style={styles.subTitle}>
            Pick a balanced wellness pack to start
          </Text>
        )}
      </View>

      {!selectedPack ? (
        <FlatList
          data={data?.packs}
          keyExtractor={i => i._id}
          contentContainerStyle={styles.padding}
          renderItem={({ item }: { item: Pack }) => (
            <PackCard pack={item} onChoose={handleChoosePack} />
          )}
        />
      ) : (
        <FlatList
          data={selectedPack?.goals}
          keyExtractor={g => g?._id}
          contentContainerStyle={styles.padding}
          renderItem={({ item }: { item: Goal }) => (
            <GoalCard
              goal={item}
              onStart={handleStartGoal}
              onComplete={handleCompleteGoal}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  subTitle: { fontSize: 13, color: '#666', marginTop: 4 },
  progressRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: { fontSize: 16, fontWeight: '700' },
  progressTiny: { fontSize: 13, color: '#666' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#EEE' },
  swapBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  swapBtnDisabled: { borderColor: '#DDD', backgroundColor: '#F4F4F7' },
  swapBtnText: { color: '#1E90FF', fontWeight: '700' },
  swapBtnTextDisabled: { color: '#AAA' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  padding: { padding: 16 },
});

export default Dashboard;
