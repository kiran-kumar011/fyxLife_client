import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    // Check for both isSuccess state and that the ref is pointing to an element

    // .play(startFrame, endFrame) is available on the LottieView instance
    animationRef?.current.play(0);
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animationRef}
        // NOTE: The path must be valid. Ensure 'success.json' is in
        // a folder named 'animations' inside 'assets' relative to this file.
        source={require('../assets/animations/Loading.json')}
        autoPlay={false} // Control playback programmatically in useEffect
        loop={true} // Ensure it only plays once
        style={styles.lottie}
      />
    </View>
  );
};

// --- 3. Define Styles ---
const styles = StyleSheet.create({
  animationContainer: {
    width: 200, // Adjust size as needed
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default Loader;
