import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/config/queryClient';
import SafeAreaWrapper from './src/components/SafeAreaWrapper';
import RootNavigator from './src/navigation/RootStack';
import { color } from './src/constants/design';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaWrapper>
        <StatusBar backgroundColor={color.bg} barStyle={'dark-content'} />
        <RootNavigator />
      </SafeAreaWrapper>
    </QueryClientProvider>
  );
}

export default App;
