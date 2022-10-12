import * as React from 'react';
import {HomeIcon, PersonIcon} from '../../assets/icons';
import {colors} from '../../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomFabBar} from '../../components/rn-wave-bottom-bar';
import {useTheme} from '../../hooks';
import {StyleSheet} from 'react-native';
import {TourGuideZone} from 'rn-tourguide';
import HomeStack from './HomeStack';
import {EventRegister} from 'react-native-event-listeners';
import {useNavigation} from '@react-navigation/native';
import Info from './Info';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  focused: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const Tab = createBottomTabNavigator();

function MyTabs() {
  const theme = useTheme();
  const navigation: any = useNavigation();
  const {i18n} = useTranslation();

  // This method gets fired when you press some button on the drawer.
  React.useEffect(() => {
    const listener: any = EventRegister.addEventListener(
      'onDrawerItemPress',
      screen => {
        navigation.jumpTo(screen);
      },
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarAllowFontScaling: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.main,
        tabBarActiveBackgroundColor: theme.bottomTab,
        tabBarInactiveTintColor: theme.common.textDisabled,
        tabBarInactiveBackgroundColor: 'red',
      }}
      tabBar={props => (
        <BottomFabBar
          mode={'default'}
          focusedButtonStyle={styles.focused}
          bottomBarContainerStyle={styles.bottomBar}
          {...props}
        />
      )}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: i18n.t('tabs.home'),
          tabBarIcon: ({focused}: any) => (
            <TourGuideZone
              zone={4}
              maskOffset={20}
              shape="circle"
              isTourGuide
              text={'Menú'}>
              <HomeIcon
                fill={focused ? colors.white : colors.ghost}
                width={25}
                height={25}
              />
            </TourGuideZone>
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: i18n.t('tabs.profile'),
          headerShown: false,
          tabBarIcon: ({focused}: any) => (
            <PersonIcon
              fill={focused ? colors.white : colors.ghost}
              width={25}
              height={25}
            />
          ),
        }}
        component={Info}
      />
    </Tab.Navigator>
  );
}

export default React.memo(MyTabs);
