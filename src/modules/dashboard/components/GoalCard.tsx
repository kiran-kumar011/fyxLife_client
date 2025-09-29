import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Goal, GoalStatus } from '../../../types/Dashboard';
import { statusBackground } from '../../../utils';

type GoalCardProps = {
  goal: Goal;
  status: GoalStatus;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
};
const GoalCard = ({ goal, status, onStart, onComplete }: GoalCardProps) => {
  return (
    <View style={[styles.goalCard, statusBackground(status)]}>
      <View style={styles.goalStatusWrapper}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <Text style={styles.goalStatus}>Status: {status}</Text>
      </View>

      <View style={styles.goalActions}>
        <TouchableOpacity
          style={[
            styles.smallBtn,
            status === 'in_progress' && styles.smallBtnActive,
          ]}
          onPress={() => onStart(goal._id)}>
          <Text style={styles.smallBtnText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.smallBtn,
            status === 'completed' && styles.smallBtnActive,
          ]}
          onPress={() => onComplete(goal._id)}>
          <Text style={styles.smallBtnText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  goalTitle: { fontSize: 15, fontWeight: '600' },
  goalStatus: { fontSize: 12, color: '#777', marginTop: 4 },
  goalActions: { marginLeft: 12, justifyContent: 'space-between' },
  smallBtn: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  smallBtnActive: { borderColor: '#1E90FF', backgroundColor: '#E8F3FF' },
  smallBtnText: { fontSize: 13, fontWeight: '700' },
  goalStatusWrapper: { flex: 1 },
});

export default GoalCard;
