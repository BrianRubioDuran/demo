import * as React from 'react';
import {
  AnimatedScreenWrapper,
  Button,
  ImageRoundButton,
  Text,
} from '../../components';
import RNBiometrics from 'react-native-simple-biometrics';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {BackIcon} from '../../assets/icons';
import {colors} from '../../theme';
import {useTranslation} from 'react-i18next';
import {formatNumberToMoney} from '../../utils';

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  z-index: 5;
  position: absolute;
  top: 0px;
  left: 15px;
`;

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const VerticalDivider = styled.View`
  height: 40px;
`;

function BiometricsExample() {
  const [canSee, setCanSee] = React.useState<boolean>(false);
  const {i18n} = useTranslation();
  const navigation = useNavigation();

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const unlock = React.useCallback(async () => {
    const can = await RNBiometrics.canAuthenticate();
    if (can) {
      try {
        await RNBiometrics.requestBioAuth('prompt-title', 'prompt-message');
        setCanSee(true);
      } catch (error) {}
    }
  }, []);

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
        {canSee && (
          <Text size={40} bold underlined>
            ${formatNumberToMoney(12345)}
          </Text>
        )}
        {!canSee && (
          <Text bold size={40}>
            {i18n.t('biometrics.hidden')}
          </Text>
        )}
        <VerticalDivider />
        {!canSee && (
          <Button
            width={200}
            title={i18n.t('biometrics.show')}
            onPress={unlock}
          />
        )}
        {canSee && (
          <Button
            width={200}
            title={i18n.t('biometrics.hide')}
            onPress={() => setCanSee(false)}
          />
        )}
      </CenteredContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(BiometricsExample);
