import * as React from 'react';
import {
  AnimatedScreenWrapper,
  ImageRoundButton,
  ImageViewer,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {BackIcon} from '../../assets/icons';
import {colors} from '../../theme';

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  position: absolute;
  z-index: 5;
  top: 0px;
  left: 15px;
`;

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function BiometricsExample() {
  const navigation = useNavigation();

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
      <CenteredContainer>
        <ImageViewer
          images={[
            {
              url: 'https://estudioalfa.com/wp-content/uploads/2019/07/usar-react-native-crear-app.png',
            },
            {
              url: 'https://adrianalonso.es/wp-content/uploads/2018/01/vue.jpg',
            },
            {
              url: 'https://manticore-labs.com/wp-content/uploads/2019/02/typeorm.png',
            },
            {
              url: 'https://ubunlog.com/wp-content/uploads/2018/07/postgresql.jpeg',
            },
            {
              url: 'https://programaenlinea.net/wp-content/uploads/2016/05/node-js-logo.png',
            },
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/.NET_Logo.svg/2048px-.NET_Logo.svg.png',
            },
            {
              url: 'https://www.iperiusbackup.net/wp-content/uploads/2016/05/1768.sql_logo.png',
            },
            {
              url: 'https://200lab-blog.imgix.net/2021/07/1_h5UGPzaL1E4dIy_JWDrsAw.png',
            },
            {
              url: 'https://anthoncode.com/wp-content/uploads/2019/01/mysql-logo-png.png',
            },
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ionic_Logo.svg/1280px-Ionic_Logo.svg.png',
            },
            {
              url: 'https://anthoncode.com/wp-content/uploads/2019/01/angular-logo-png.png',
            },
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png',
            },
          ]}
        />
      </CenteredContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(BiometricsExample);
