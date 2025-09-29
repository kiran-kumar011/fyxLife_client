import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Welcome } from '../../../assets';
import SCREENS from '../../../constants/screens';
import { TView, TText, TImage, TButton } from '../../../ui';
import { width, height, color } from '../../../constants/design';

const OnboardingWelcome = () => {
  const navigation = useNavigation();
  return (
    <TView style={styles.container}>
      <TImage
        source={Welcome}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel="Company logo"
      />
      <TText variant="title">Track your Active Lifestyle</TText>
      <TText variant="caption">Find your way to the perfect body</TText>
      <TButton
        title="Get Started"
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.OnboardingUserInfo)}
      />
    </TView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.bg, alignItems: 'center' },
  image: { width: width, height: height * 0.7, zIndex: 1 },
  button: { marginTop: 20, paddingHorizontal: 40, paddingVertical: 15 },
});

export default OnboardingWelcome;
