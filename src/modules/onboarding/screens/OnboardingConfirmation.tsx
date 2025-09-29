import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { typography } from '../../../constants/design';
import { TButton, TText, TView } from '../../../ui';
import SuccessCheck from '../../../components/SuccessCheck';
import storage from '../../../storage';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { Text } from 'react-native';

const OnboardingConfirmation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const getUserInfo = async () => {
      const userData = await storage.get(STORAGE_KEYS.USER_INFO);
      setData(userData);
      setLoading(false);
    };
    getUserInfo();
  }, []);

  const handlePress = () => {
    storage.set(STORAGE_KEYS.IS_ONBOARDED, true);
  };
  if (loading) {
    <TText>Loading...</TText>;
  }
  return (
    <TView style={styles.container}>
      <Text style={styles.title}>{`Hi ${
        data?.fullName ?? ''
      }, your profile is ready🎉`}</Text>
      <SuccessCheck isSuccess />
      <TButton
        title="Go To Dashboard"
        style={styles.button}
        textStyle={styles.btnTxt}
        onPress={handlePress}
      />
    </TView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 34, textAlign: 'center', fontWeight: '700' },
  button: {
    position: 'absolute',
    bottom: '10%',
    width: '80%',
    paddingVertical: 15,
  },
  btnTxt: { fontSize: typography.title },
});

export default OnboardingConfirmation;
