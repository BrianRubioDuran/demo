import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-lottie-splash-screen';
import {Platform, StyleSheet} from 'react-native';
import {AuthStack} from './src/screens/auth';
import {AppInfoState, AuthState} from './src/store';
import {AppStack} from './src/screens/app';
import {TourGuideProvider} from 'rn-tourguide';
import {CustomToolTip} from './src/components';
import {useTheme} from './src/hooks';
import {useTranslation} from 'react-i18next';
import CodePush from 'react-native-code-push';
import {version as packageVersion} from './package.json';
import RNInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

const Stack = createNativeStackNavigator();

function App() {
  const auth = AuthState.useValue();
  const theme = useTheme();
  const {i18n} = useTranslation();

  const getAppVersion = React.useCallback(async () => {
    const uniqueId = RNInfo.getUniqueId();
    const model = RNInfo.getDeviceId();
    const systemVersion = RNInfo.getSystemVersion();
    await CodePush.getUpdateMetadata().then(metadata => {
      AppInfoState.set({
        version: `${packageVersion}-${
          metadata && metadata.label ? metadata?.label : '0'
        }`,
        deviceId: uniqueId,
        deviceModel: model,
        deviceOs:
          Platform.OS === 'android'
            ? `Android ${systemVersion}`
            : `iOS ${systemVersion}`,
      });
    });
  }, []);

  React.useEffect(() => {
    getAppVersion();
  }, [getAppVersion]);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <TourGuideProvider
      androidStatusBarVisible
      wrapperStyle={{}}
      backdropColor={theme.common.textDisabled}
      tooltipComponent={CustomToolTip}
      labels={{
        finish: i18n.t('copilot.labels.finish'),
        next: i18n.t('copilot.labels.next'),
        previous: i18n.t('copilot.labels.previous'),
        skip: i18n.t('copilot.labels.skip'),
      }}>
      <GestureHandlerRootView style={styles.gesture}>
        <NavigationContainer>
          <Stack.Navigator>
            {!auth.token && (
              <Stack.Screen
                options={{headerShown: false}}
                name="Auth"
                component={AuthStack}
              />
            )}
            {auth.token && (
              <Stack.Screen
                options={{headerShown: false}}
                name="App"
                component={AppStack}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </TourGuideProvider>
  );
}

export default CodePush(App);
