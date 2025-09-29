import React, { useState, useCallback, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import storage from '../../../storage';
import {
  GoalStatus,
  Pack,
  GoalsStatusMap,
  Goal,
} from '../../../types/Dashboard';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { todayKey, buildInitialStatuses, formattedDate } from '../../../utils';
import GoalCard from '../components/GoalCard';
import PackCard from '../components/PackCard';
import { useGetPacks, useCreatePack } from '../services/Dashboard.services';

const Dashboard = () => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [goalStatuses, setGoalStatuses] = useState<GoalsStatusMap>({});
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate } = useCreatePack();
  const { data, isFetching } = useGetPacks({
    activityLevel,
  });

  useEffect(() => {
    console.log('dkjhgakjhdgkahjsd');
    checkPackSelected();
    // first the app should check if there is any packs selected for the
  }, []);

  const checkPackSelected = async () => {
    setLoading(true);
    // gets the packs added to local store and filters based on createdAt date.
    // if the pack exists then updates the state with the filtered pack or makes an API call to render the pack suggestion.
    // the API should also check whether there is any existing packs selected for the specific date if not then return the suggestion else return the pack selected

    console.log('packs');
    try {
      const user = await storage.get(STORAGE_KEYS.USER_INFO);
      const packs = await storage.get(STORAGE_KEYS.SELECTED_PACK);
      if (!packs) {
        // fetch new suggestion
        setActivityLevel(user.activityLevel.toLowerCase());
      } else {
        // filter the pack based on date and update the state
        for (let pack of packs) {
          const packCreatedDate = new Date(`${pack?.pack?.createdAt}`)
            .toISOString()
            .split('T')[0];

          if (packCreatedDate === todayKey()) {
            console.log('same');
            setSelectedPack(pack?.pack);
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChoosePack = useCallback(async (pack: Pack) => {
    setLoading(true);
    const initial = buildInitialStatuses(pack);
    setSelectedPack(pack);
    setGoalStatuses(initial);

    postSelectedPack(pack);
  }, []);

  const postSelectedPack = async (pack: Pack) => {
    const deviceId = await DeviceInfo.getUniqueId();
    mutate(
      { deviceId, pack },
      {
        onSuccess: async data => {
          console.log(data.data, 'response');
          console.log(JSON.stringify(data, null, 2));
          const storedPacks = await storage.get(STORAGE_KEYS.SELECTED_PACK);
          const existing: Pack[] = Array.isArray(storedPacks)
            ? storedPacks
            : [];
          storage.set(STORAGE_KEYS.SELECTED_PACK, [...existing, data]);
          setLoading(false);
        },
        onError: error => {
          console.log(error);
          setLoading(false);
        },
      },
    );
  };

  const handleStartGoal = useCallback(
    async (goalId: string) => {
      if (!selectedPack) {
        return;
      }
      const next = { ...goalStatuses, [goalId]: 'in_progress' as GoalStatus };
      setGoalStatuses(next);
    },
    [goalStatuses, selectedPack],
  );

  const handleCompleteGoal = useCallback(
    async (goalId: string) => {
      if (!selectedPack) {
        return;
      }
      const next = { ...goalStatuses, [goalId]: 'completed' as GoalStatus };
      setGoalStatuses(next);
    },
    [goalStatuses, selectedPack],
  );

  if (isFetching || loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(data?.packs, 'selected pack');
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={selectedPack?.goals}
            keyExtractor={g => g?._id}
            contentContainerStyle={styles.padding}
            renderItem={({ item }: { item: Goal }) => (
              <GoalCard
                goal={item}
                status={goalStatuses[item?._id] ?? 'pending'}
                onStart={handleStartGoal}
                onComplete={handleCompleteGoal}
              />
            )}
          />
        </View>
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
