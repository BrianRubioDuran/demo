import * as React from 'react';
import {AnimatedScreenWrapper, Button, Text, TextInput} from '../../components';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import {SoeviiLogo} from '../../assets/logos';
import {ICommon} from '../../types';
import {useTheme} from '../../hooks';
import {Neomorph} from 'react-native-neomorph-shadows';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../theme';
import {AuthState} from '../../store';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  neo: {
    shadowOpacity: 0.1,
    borderRadius: 50,
    shadowRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
  },
});

const ContentContainer = styled.View<ICommon>`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: ${(props: ICommon) => props.background};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const ImageContainer = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ICommon) => props.background};
`;

const VerticalDivider = styled.View`
  height: 30px;
`;

function Login() {
  const [, setUser] = React.useState<string>('');
  const [, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const theme = useTheme();
  const {i18n} = useTranslation();
  const navigation = useNavigation<any>();

  const login = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      AuthState.set({token: 'x'});
    }, 3000);
  }, []);

  return (
    <AnimatedScreenWrapper
      loading={loading}
      backgroundColor={theme.login.image}>
      <ImageContainer background={theme.login.image}>
        <Animatable.View
          duration={4000}
          animation="bounceIn"
          iterationCount="infinite"
          direction="alternate">
          <SoeviiLogo width={300} height={200} />
        </Animatable.View>
      </ImageContainer>
      <ContentContainer background={theme.login.content}>
        <Neomorph
          darkShadowColor={colors.main}
          lightShadowColor={colors.main}
          style={{
            ...styles.neo,
            backgroundColor: theme.common.elevatedColor,
          }}>
          <TextInput
            placeholder={i18n.t('login.email')}
            onChangeText={setUser}
          />
        </Neomorph>
        <VerticalDivider />
        <Neomorph
          darkShadowColor={colors.main}
          lightShadowColor={colors.main}
          style={{
            ...styles.neo,
            backgroundColor: theme.common.elevatedColor,
          }}>
          <TextInput
            placeholder={i18n.t('login.password')}
            onChangeText={setPassword}
          />
        </Neomorph>
        <VerticalDivider />
        <Button width={280} onPress={login} title={i18n.t('login.signIn')} />
        <VerticalDivider />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Register')}>
          <Text bold>
            <Text bold underlined color={colors.main}>
              {i18n.t('login.signUp')}
            </Text>
          </Text>
        </TouchableOpacity>
      </ContentContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(Login);
