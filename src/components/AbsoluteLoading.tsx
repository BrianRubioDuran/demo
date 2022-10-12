import * as React from 'react';
import {colors, opaque} from '../theme';
import styled from 'styled-components/native';
import Text from './Text';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {ICommon} from '../types';
import {useTheme} from '../hooks';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  lottie: {width: 150, height: 150},
});

const animation = require('../assets/LoadingAbsolute.json');

const Wrapper = styled.View<ICommon>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props: ICommon) => props.background};
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

function LoadingAbsolute() {
  const theme = useTheme();
  const {i18n} = useTranslation();
  return (
    <Wrapper background={opaque(theme.common.background, 0.5)}>
      <LottieView
        style={styles.lottie}
        renderMode="HARDWARE"
        source={animation}
        autoPlay
        loop
      />
      <Text bold type="title" color={colors.main}>
        {i18n.t('common.loading')}
      </Text>
    </Wrapper>
  );
}

export default React.memo(LoadingAbsolute);
