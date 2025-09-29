import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Pack } from '../../../types/Dashboard';

const PackCard = ({
  pack,
  onChoose,
}: {
  pack: Pack;
  onChoose: (p: Pack) => void;
}) => {
  return (
    <View style={styles.packCard}>
      <Text style={styles.packTitle}>{pack.title}</Text>
      <View style={{ marginTop: 8 }}>
        {pack.goals.map(g => (
          <Text key={g.id} style={styles.packGoal}>
            • {g.title}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={styles.chooseBtn}
        onPress={() =>
          Alert.alert(
            `Choose "${pack.title}"?`,
            'This will set these 3 goals as your active daily goals.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Choose Pack', onPress: () => onChoose(pack) },
            ],
          )
        }>
        <Text style={styles.chooseBtnText}>Choose this pack</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  packCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  packTitle: { fontSize: 16, fontWeight: '600' },
  packGoal: { fontSize: 14, color: '#444', marginTop: 6 },
  chooseBtn: {
    marginTop: 12,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  chooseBtnText: { color: '#fff', fontWeight: '700' },
});

export default PackCard;
