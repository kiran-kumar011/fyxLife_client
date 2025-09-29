// src/components/SelectButtons.tsx
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { color, radius, spacing } from '../../../constants/design';

type Props = {
  label?: string;
  options: string[];
  value?: string | null;
  onChange: (val: string) => void;
  testID?: string;
};

const SelectButtons = React.memo(
  ({ label, options, value, onChange, testID }: Props) => {
    const handlePress = useCallback((val: string) => onChange(val), [onChange]);

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View style={styles.row}>
          {options.map(opt => {
            const active = value === opt;
            return (
              <TouchableOpacity
                key={opt}
                testID={`${testID ?? 'select'}-${opt}`}
                style={[styles.btn, active ? styles.btnActive : null]}
                onPress={() => handlePress(opt)}>
                <Text
                  style={[
                    styles.btnText,
                    active ? styles.btnTextActive : null,
                  ]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);

export default SelectButtons;

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: { marginBottom: 8, color: color.text, fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    marginRight: 8,
    marginBottom: 8,
  },
  btnActive: { backgroundColor: color.primary, borderColor: color.primary },
  btnText: { color: color.text },
  btnTextActive: { color: '#fff', fontWeight: '700' },
});
