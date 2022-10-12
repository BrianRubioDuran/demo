import {PermissionsAndroid, Platform} from 'react-native';

const requestLocationPermission = async () => {
  return new Promise<boolean>(async resolve => {
    if (Platform.OS === 'ios') {
      resolve(true);
      return; // Prevent warning on ios
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    }
    // default
    resolve(false);
  });
};

export default requestLocationPermission;
