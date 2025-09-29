import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type BadgeProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const Badge = ({
  label,
  selected = false,
  onPress,
  style,
  textStyle,
  disabled = false,
}: BadgeProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        selected ? styles.selected : styles.unselected,
        style,
      ]}>
      <Text
        style={[
          styles.label,
          selected ? styles.selectedLabel : styles.unselectedLabel,
          textStyle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    margin: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,
  },
  unselected: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
  },
  selected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unselectedLabel: {
    color: '#333',
  },
  selectedLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default Badge;
