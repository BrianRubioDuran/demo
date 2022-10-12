import * as React from 'react';
import {StyleSheet} from 'react-native';
import {AnimatedScreenWrapper, Header, MenuItem} from '../../components';
import {FlatGrid} from 'react-native-super-grid';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';
import {useNavigation} from '@react-navigation/native';
import {TMenuItem} from '../../types';
import {
  ChartIcon,
  FingerprintIcon,
  ImageIcon,
  MapRouteIcon,
  MapsLogo,
  VideoIcon,
} from '../../assets/icons';

const menuItems: TMenuItem[] = [
  {
    color: '#11A9F3',
    text: 'Map component',
    icon: <MapsLogo width={70} height={70} />,
    screen: 'Map',
  },
  {
    color: '#920320',
    text: 'Background location',
    icon: <MapRouteIcon fill={'#920320'} width={70} height={70} />,
    screen: 'Location',
  },
  {
    color: '#738',
    text: 'Biometric unlock',
    icon: <FingerprintIcon fill={'#738'} width={70} height={70} />,
    screen: 'Biometric',
  },
  {
    color: '#6563ff',
    text: 'Image\nviewer',
    icon: <ImageIcon width={70} height={70} />,
    screen: 'ImageExample',
  },
  {
    color: '#4da64d',
    text: 'Chart\ncomponent',
    icon: <ChartIcon fill={'#4da64d'} width={70} height={70} />,
    screen: 'ChartsExample',
  },
  {
    color: '#fcba03',
    text: 'Video\ncomponent',
    icon: <VideoIcon fill={'#fcba03'} width={70} height={70} />,
    screen: 'VideoExample',
  },
];

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
    width: '100%',
  },
  contentContainer: {paddingBottom: 100},
});

function Home() {
  const navigation: any = useNavigation();
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
  } = useTourGuideController();

  const renderMenuItem = React.useCallback(
    (i: any) => {
      if (i.index === 0) {
        return (
          <TourGuideZone
            borderRadius={5}
            zone={3}
            maskOffset={5}
            shape="rectangle"
            text={'Funcionalidades'}>
            <MenuItem
              item={i.item}
              onPress={() => navigation.navigate(i.item.screen)}
            />
          </TourGuideZone>
        );
      }
      return (
        <MenuItem
          item={i.item}
          onPress={() => navigation.navigate(i.item.screen)}
        />
      );
    },
    [navigation],
  );

  React.useEffect(() => {
    if (canStart) {
      setTimeout(() => {
        start!();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStart]);

  const keyExtractor = React.useCallback((item: TMenuItem) => {
    return `${item.screen}-${item.color}`;
  }, []);

  return (
    <AnimatedScreenWrapper>
      <Header centered />
      <FlatGrid
        data={menuItems}
        style={styles.gridView}
        spacing={20}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderMenuItem}
        keyExtractor={keyExtractor}
      />
    </AnimatedScreenWrapper>
  );
}

export default React.memo(Home);
