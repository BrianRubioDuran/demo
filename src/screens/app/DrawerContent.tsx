import * as React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {useTheme} from '../../hooks';
import {ICommon} from '../../types';
import {SoeviiLogo} from '../../assets/logos';
import {colors} from '../../theme';
import {DrawerItem} from '../../components';
import {EventRegister} from 'react-native-event-listeners';
import {useTranslation} from 'react-i18next';
import {AppInfoState, AuthState} from '../../store';

const Wrapper = styled.SafeAreaView<ICommon>`
  flex: 1;
  background-color: ${(props: ICommon) => props.background};
`;

const ImageContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 0.5px;
  border-color: ${colors.ghost};
  padding: 10px 5px;
  min-height: 60px;
`;

const ScrollWrapper = styled.ScrollView``;

function DrawerContent({navigation}: DrawerContentComponentProps) {
  const theme = useTheme();
  const {i18n} = useTranslation();
  const appInfo = AppInfoState.useValue();

  const navigateToBottomStack = React.useCallback(
    (screen: string) => {
      return () => {
        setTimeout(() => {
          EventRegister.emit('onDrawerItemPress', screen);
        }, 200);
        navigation.closeDrawer();
      };
    },
    [navigation],
  );

  const logout = React.useCallback(() => {
    AuthState.reset();
  }, []);

  return (
    <Wrapper background={theme.bottomTab}>
      <ScrollWrapper>
        <ImageContainer>
          <SoeviiLogo width={200} height={200} />
        </ImageContainer>
        <DrawerItem
          onPress={navigateToBottomStack('Profile')}
          label={i18n.t('drawer.about')}
        />
        <DrawerItem onPress={logout} label={i18n.t('drawer.logout')} />
        <DrawerItem
          onPress={() => {}}
          label={i18n.t(`Soevii demo | ${appInfo.version || 'latest'}`)}
        />
      </ScrollWrapper>
    </Wrapper>
  );
}

export default React.memo(DrawerContent);
