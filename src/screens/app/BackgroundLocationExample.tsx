import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';

import BackgroundGeolocation, {
  Location,
  Subscription,
} from 'react-native-background-geolocation';
import {BackIcon} from '../../assets/icons';
import {
  AnimatedScreenWrapper,
  Button,
  ImageRoundButton,
  ScreenContentContainer,
  Text,
} from '../../components';
import {colors} from '../../theme';
import styled from 'styled-components/native';
import {fastStorage} from '../../utils';
import {useTheme} from '../../hooks';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 70,
  },
});

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  z-index: 5;
  top: 0px;
  left: 15px;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.View<{color: string}>`
  border-width: 0.4px;
  border-color: ${(props: any) => props.color};
  justify-content: center;
  width: 50%;
  align-items: center;
  height: 50px;
`;

const TitleContainer = styled.View`
  width: 100%;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Example = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState<Location[]>([]);
  const navigation = useNavigation();
  const theme = useTheme();

  const getCache = React.useCallback(() => {
    const cache = fastStorage.getString('locations');
    if (cache === undefined) {
      return;
    }
    setLocation(JSON.parse(cache));
  }, []);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const clean = React.useCallback(() => {
    setLocation([]);
    fastStorage.delete('locations');
  }, []);

  React.useEffect(() => {
    getCache();
  }, [getCache]);

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(l => {
      const current = [...location];
      current.push(l);
      setLocation(current);
      fastStorage.set('locations', JSON.stringify(current));
    });

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      event => {
        console.assert(__DEV__, JSON.stringify(event));
      },
    );

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange(event => {
        console.assert(__DEV__, JSON.stringify(event));
      });

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange(event => {
        console.assert(__DEV__, JSON.stringify(event));
      });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      // url: 'http://yourserver.com/locations',
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
      // headers: {
      //   // <-- Optional HTTP headers
      //   'X-FOO': 'bar',
      // },
      // params: {
      //   // <-- Optional HTTP params
      //   auth_token: 'maybe_your_server_authenticates_via_token_YES?',
      // },
    }).then(state => {
      setEnabled(state.enabled);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, [location]);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
    }
  }, [enabled]);

  return (
    <AnimatedScreenWrapper>
      <BackButtonWrapper>
        <SafeView>
          <ImageRoundButton
            onPress={goBack}
            icon={<BackIcon width={15} height={15} fill={colors.white} />}
            color={colors.main}
          />
        </SafeView>
      </BackButtonWrapper>
      <TitleContainer>
        <Switch value={enabled} onValueChange={setEnabled} />
        <Button onPress={clean} width={100} title="Limpiar" height={40} />
      </TitleContainer>
      <View style={styles.main}>
        <ScreenContentContainer padding={0}>
          {location.map(i => {
            return (
              <Row key={i.uuid}>
                <Column color={theme.common.textHighEmphasis}>
                  <Text bold>{i.coords.latitude}</Text>
                </Column>
                <Column color={theme.common.textHighEmphasis}>
                  <Text bold>{i.coords.longitude}</Text>
                </Column>
              </Row>
            );
          })}
        </ScreenContentContainer>
      </View>
    </AnimatedScreenWrapper>
  );
};

export default React.memo(Example);
