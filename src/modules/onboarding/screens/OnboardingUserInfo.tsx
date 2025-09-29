import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../forms/schema';
import FormInput from '../components/FormInput';
import SelectButtons from '../components/SelectButton';
import { color, spacing, radius, typography } from '../../../constants/design';
import SCREENS from '../../../constants/screens';
import storage from '../../../storage';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { useDeviceId } from '../../../hooks/useDeviceId';

type FormData = {
  fullName: string;
  age: string;
  phone: string;
  gender: string;
  activityLevel: string;
  height?: string;
  weight?: string;
};

const genderOptions = ['Male', 'Female', 'Other'];
const activityOptions = [
  'Beginner',
  'Explorer',
  'Regular',
  'Committed',
  'Elite',
];

export default function OnboardingUserInfo({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      age: '',
      phone: '',
      gender: '',
      activityLevel: '',
      height: '',
      weight: '',
    },
  });
  const deviceId = useDeviceId();

  // refs so we can jump to next input
  const fullNameRef = useRef<TextInput | null>(null);
  const ageRef = useRef<TextInput | null>(null);
  const phoneRef = useRef<TextInput | null>(null);
  const heightRef = useRef<TextInput | null>(null);
  const weightRef = useRef<TextInput | null>(null);

  const onSubmit = useCallback(
    async (values: FormData) => {
      // normalize age/height/weight to numbers if needed here
      const payload = {
        ...values,
        age: values.age === '' ? undefined : Number(values.age),
        height: values.height === '' ? undefined : Number(values.height),
        weight: values.weight === '' ? undefined : Number(values.weight),
      };

      await storage.set(STORAGE_KEYS.USER_INFO, payload);
      navigation.replace(SCREENS.OnboardingConfirmation);
    },
    [navigation],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.screen}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 100 : 120}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Tell us a bit about yourself</Text>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Full name"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.fullName?.message ?? null}
            testID="fullName"
            ref={fullNameRef}
            returnKeyType="next"
            onSubmitEditing={() => ageRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Age"
            keyboardType="numeric"
            value={value !== '' && value !== undefined ? String(value) : ''}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            error={errors.age?.message ?? null}
            testID="age"
            ref={ageRef}
            returnKeyType="next"
            onSubmitEditing={() => heightRef.current?.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="height"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Height (cm)"
            keyboardType="numeric"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.height?.message ?? null}
            testID="height"
            ref={heightRef}
            returnKeyType="next"
            onSubmitEditing={() => weightRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={control}
        name="weight"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Weight (kg)"
            keyboardType="numeric"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.weight?.message ?? null}
            testID="weight"
            ref={weightRef}
            returnKeyType="done"
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Phone number"
            keyboardType="phone-pad"
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.phone?.message ?? null}
            testID="phone"
            ref={phoneRef}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={styles.formBlock}>
            <SelectButtons
              label="Gender"
              options={genderOptions}
              value={value ?? ''}
              onChange={onChange}
              testID="gender"
            />
            {fieldState.error ? (
              <Text style={styles.errorText}>{fieldState.error.message}</Text>
            ) : null}
          </View>
        )}
      />
      <Controller
        control={control}
        name="activityLevel"
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={styles.formBlock}>
            <SelectButtons
              label="Activity Level"
              options={activityOptions}
              value={value ?? ''}
              onChange={onChange}
              testID="activityLevel"
            />
            {fieldState.error ? (
              <Text style={styles.errorText}>{fieldState.error.message}</Text>
            ) : null}
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cta}
          onPress={handleSubmit(onSubmit)}
          testID="submit">
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: color.background,
    padding: spacing.md,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: color.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  footer: { marginTop: 24, marginBottom: spacing.lg },
  cta: {
    backgroundColor: color.primary,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: typography.body,
  },
  formBlock: {
    marginBottom: spacing.md,
  },
  errorText: {
    color: color.danger,
    fontSize: typography.caption,
    marginTop: 8,
  },
});
