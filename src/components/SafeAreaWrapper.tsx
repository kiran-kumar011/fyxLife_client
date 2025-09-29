import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children?: React.ReactNode;
}

const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.flexBox}>
        <View style={styles.flexBox}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
