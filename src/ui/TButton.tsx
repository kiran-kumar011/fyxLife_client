import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { color, radius, spacing, typography } from '../constants/design';
import TText from './TText';

type ButtonVariant = 'primary' | 'ghost';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled,
}: {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}) {
  const v = variant === 'primary' ? styles.primary : styles.ghost;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, v, disabled && styles.disabled, style]}
      disabled={disabled}>
      <TText variant="body" style={[styles.label, textStyle]}>
        {title}
      </TText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: { backgroundColor: color.primary },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: color.border,
  },
  label: { color: '#fff', fontWeight: '600', fontSize: typography.body },
  disabled: { opacity: 0.5 },
});
