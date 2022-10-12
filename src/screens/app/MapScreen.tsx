import * as React from 'react';
import {AnimatedScreenWrapper, ImageRoundButton} from '../../components';
import MapView, {Region} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../hooks';
import {getLocationPermission} from '../../utils';
import Geolocation from 'react-native-geolocation-service';
import styled from 'styled-components/native';
import {colors} from '../../theme';
import {BackIcon} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  position: absolute;
  z-index: 5;
  top: 0px;
  left: 15px;
`;

function MapScreen() {
  const [permission, setPermission] = React.useState<boolean>(false);
  const [region, setRegion] = React.useState<Region>();
  const theme = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    getLocationPermission().then(() => {
      Geolocation.getCurrentPosition(position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        });
      });

      setPermission(true);
      const id = Geolocation.watchPosition(
        position => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          });
        },
        undefined,
        {enableHighAccuracy: true, interval: 1000},
      );
      return () => {
        Geolocation.clearWatch(id);
      };
    });
  }, []);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
      {permission && region && (
        <MapView
          customMapStyle={theme.map}
          showsUserLocation
          style={styles.map}
          initialRegion={region}
          region={region}
          showsCompass={false}
          showsMyLocationButton={false}
        />
      )}
    </AnimatedScreenWrapper>
  );
}

export default React.memo(MapScreen);
