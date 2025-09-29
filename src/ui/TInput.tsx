import { forwardRef } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { color, radius, spacing, typography } from '../constants/design';

export interface TInputProps extends TextInputProps {}

const TInput = forwardRef<TextInput, TInputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholderTextColor={color.subtleText}
      style={[styles.base, props.style]}
      {...props}
    />
  );
});
export default TInput;

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    backgroundColor: color.bg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    color: color.text,
  },
});
