import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import MapScreen from './MapScreen';
import BackgroundLocationExample from './BackgroundLocationExample';
import BiometricsExample from './BiometricsExample';
import ImageExample from './ImageExample';
import ChartsExample from './ChartsExample';
import VideoExample from './VideoExample';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Map"
        component={MapScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Location"
        component={BackgroundLocationExample}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Biometric"
        component={BiometricsExample}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ImageExample"
        component={ImageExample}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChartsExample"
        component={ChartsExample}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VideoExample"
        component={VideoExample}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
