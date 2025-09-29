// src/components/FormInput.tsx
import React from 'react';
import { View, StyleSheet, TextInputProps } from 'react-native';
import { color, spacing, radius } from '../../../constants/design';
import { TText, TInput } from '../../../ui';

type Props = TextInputProps & {
  label?: string;
  error?: string | undefined;
  testID?: string;
};

const FormInput = React.memo(({ label, error, testID, ...rest }: Props) => {
  return (
    <View style={styles.wrapper}>
      {label ? <TText style={styles.label}>{label}</TText> : null}
      <TInput
        testID={testID}
        {...rest}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={color.subtext}
      />
      {error ? (
        <TText variant="caption" style={styles.error}>
          {error}
        </TText>
      ) : null}
    </View>
  );
});

export default FormInput;

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: { marginBottom: 6, color: color.text, fontWeight: '600' },
  input: {
    height: 52,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 12,
    backgroundColor: color.background,
    color: color.text,
  },
  inputError: { borderColor: color.danger },
  error: { color: color.danger, marginTop: 6 },
});
