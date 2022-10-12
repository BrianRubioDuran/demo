import * as React from 'react';
import {
  AnimatedScreenWrapper,
  ScreenContentContainer,
  Text,
} from '../../components';
import styled from 'styled-components/native';
import {SoeviiLogo} from '../../assets/logos';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  touchable: {justifyContent: 'center', alignItems: 'center'},
});

const TextContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const PaddingContainer = styled.View`
  padding: 12px 20px;
`;

function Info() {
  const openPhone = React.useCallback(() => {
    Linking.openURL('tel:8180005928');
  }, []);

  const openEmail = React.useCallback(() => {
    Linking.openURL('mailto:hola@soevii.mx');
  }, []);

  const openGps = React.useCallback(() => {
    var scheme =
      Platform.OS === 'ios'
        ? 'http://maps.apple.com/?daddr=25.664747,-100.3190026'
        : 'https://www.google.com/maps/dir/?api=1&destination=25.664747,-100.3190026';

    Linking.openURL(scheme);
  }, []);

  return (
    <AnimatedScreenWrapper>
      <ScreenContentContainer>
        <TextContainer>
          <SoeviiLogo width={250} height={150} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchable}
            onPress={openGps}>
            <PaddingContainer>
              <Text bold color={colors.main} underlined>
                IZA Bussines Centers en Pabellón M
              </Text>
            </PaddingContainer>
            <PaddingContainer>
              <Text bold color={colors.main} underlined>
                Benito Juárez 1102-05, Centro
              </Text>
            </PaddingContainer>
            <PaddingContainer>
              <Text bold color={colors.main} underlined>
                Monterrey, Nuevo León, México
              </Text>
            </PaddingContainer>
          </TouchableOpacity>
          <PaddingContainer>
            <TouchableOpacity activeOpacity={0.8} onPress={openPhone}>
              <Text bold>
                Teléfono:{' '}
                <Text bold underlined color={colors.main}>
                  81-8000-5928
                </Text>
              </Text>
            </TouchableOpacity>
          </PaddingContainer>
          <PaddingContainer>
            <TouchableOpacity activeOpacity={0.8} onPress={openEmail}>
              <Text bold>
                Email:{' '}
                <Text bold underlined color={colors.main}>
                  hola@soevii.mx
                </Text>
              </Text>
            </TouchableOpacity>
          </PaddingContainer>
        </TextContainer>
      </ScreenContentContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(Info);
