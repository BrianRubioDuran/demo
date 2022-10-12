import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {loadFonts} from 'react-native-dynamic-fonts';
import {SanFranciscoBold, SanFrancisco} from './src/assets/fonts';
import 'moment/min/locales';
import moment from 'moment';
import './i18n';
moment.locale('es');

loadFonts([
  {name: 'SanFranciscoBold', data: SanFranciscoBold, type: 'otf'},
  {name: 'SanFrancisco', data: SanFrancisco, type: 'ttf'},
]).then(function (names) {
  if (__DEV__) {
    console.log('Loaded all fonts successfully. Font names are: ', names);
  }
});

AppRegistry.registerComponent(appName, () => App);
