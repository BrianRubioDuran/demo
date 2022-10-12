import * as React from 'react';
import styled from 'styled-components/native';
import {
  AnimatedContainer,
  AnimatedScreenWrapper,
  Button,
  ImageRoundButton,
  LanguageButton,
  Text,
} from '../../components';
import {colors} from '../../theme';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {Animated, StyleSheet} from 'react-native';
import {BackIcon} from '../../assets/icons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const ImageContainer = styled.View`
  flex: 0.6;
  background-color: #fff8f4;
`;

const SafeWrapper = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex: 0.5;
`;

const PaddingContainer = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const StaticContainer = styled.View`
  padding: 15px 20px;
  height: 120px;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotContainer: {
    top: 30,
    bottom: 10,
  },
});

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BackContainer = styled.View`
  padding-right: 10px;
`;

function Introduction() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [step, setStep] = React.useState<number>(0);
  const {i18n} = useTranslation();
  const navigation = useNavigation<any>();

  const nextStep = () => {
    Animated.timing(scrollX, {
      toValue: (step + 1) * 380,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setStep(step + 1);
  };

  const backStep = () => {
    Animated.timing(scrollX, {
      toValue: (step - 1) * 380,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setStep(step - 1);
  };

  const navigateToLogin = React.useCallback(async () => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <AnimatedScreenWrapper>
      <ImageContainer>
        {step === 0 && (
          <AnimatedContainer
            animation="bounceInLeft"
            unmountAnimation="bounceOutRight">
            <Image
              resizeMode="contain"
              source={require('../../assets/Intro1.png')}
            />
          </AnimatedContainer>
        )}
        {step === 1 && (
          <AnimatedContainer
            animation="bounceInLeft"
            unmountAnimation="bounceOutRight">
            <Image
              resizeMode="contain"
              source={require('../../assets/Intro3.png')}
            />
          </AnimatedContainer>
        )}
        {step === 2 && (
          <AnimatedContainer
            animation="bounceInLeft"
            unmountAnimation="bounceOutRight">
            <Image
              resizeMode="contain"
              source={require('../../assets/Intro2.png')}
            />
          </AnimatedContainer>
        )}
      </ImageContainer>
      <SafeWrapper>
        {step === 0 && (
          <AnimatedContainer
            height={100}
            animation="bounceInLeft"
            unmountAnimation="bounceOutRight">
            <PaddingContainer>
              <Text bold size={25}>
                {i18n.t('introduction.select')}
              </Text>
              <PaddingContainer>
                <Row>
                  <LanguageButton
                    onPress={() => i18n.changeLanguage('es')}
                    text={i18n.t('common.spanish')}
                    countryCode="mx"
                    selected={i18n.language === 'es'}
                  />
                  <LanguageButton
                    onPress={() => i18n.changeLanguage('en')}
                    text={i18n.t('common.english')}
                    countryCode="us"
                    selected={i18n.language === 'en'}
                  />
                </Row>
              </PaddingContainer>
            </PaddingContainer>
          </AnimatedContainer>
        )}
        {step === 1 && (
          <StaticContainer>
            <AnimatedContainer
              animation="bounceInLeft"
              unmountAnimation="bounceOutRight">
              <Text numberOfLines={10} bold size={15}>
                {i18n.t('introduction.part1')}
              </Text>
            </AnimatedContainer>
          </StaticContainer>
        )}
        {step === 2 && (
          <StaticContainer>
            <AnimatedContainer
              animation="bounceInLeft"
              unmountAnimation="bounceOutRight">
              <Text bold size={15}>
                {i18n.t('introduction.part2')}
              </Text>
            </AnimatedContainer>
          </StaticContainer>
        )}

        <PaddingContainer>
          <ExpandingDot
            data={[1, 2, 3]}
            expandingDotWidth={30}
            scrollX={scrollX}
            activeDotColor={colors.main}
            inActiveDotColor={colors.ghost}
            inActiveDotOpacity={0.6}
            dotStyle={styles.dot}
            containerStyle={styles.dotContainer}
          />
        </PaddingContainer>
        <PaddingContainer>
          {(step === 0 || step === 1) && (
            <AnimatedContainer animation="bounceInLeft">
              <Row>
                {step === 1 && (
                  <BackContainer>
                    <ImageRoundButton
                      onPress={backStep}
                      borderRadius={10}
                      icon={
                        <BackIcon width={15} height={15} fill={colors.white} />
                      }
                      size={50}
                      color={colors.secondary}
                    />
                  </BackContainer>
                )}
                <Button
                  onPress={nextStep}
                  width={200}
                  title={i18n.t('common.next')}
                  backgroundColor={colors.secondary}
                  textColor={colors.white}
                />
              </Row>
            </AnimatedContainer>
          )}
          {step === 2 && (
            <AnimatedContainer height={40} animation="bounceInLeft">
              <Row>
                <BackContainer>
                  <ImageRoundButton
                    onPress={backStep}
                    borderRadius={10}
                    icon={
                      <BackIcon width={15} height={15} fill={colors.white} />
                    }
                    size={50}
                    color={colors.secondary}
                  />
                </BackContainer>
                <Button
                  onPress={navigateToLogin}
                  width={200}
                  title={i18n.t('common.start')}
                  backgroundColor={colors.secondary}
                  textColor={colors.white}
                />
              </Row>
            </AnimatedContainer>
          )}
        </PaddingContainer>
      </SafeWrapper>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(Introduction);
