import * as React from 'react';
import {useTheme} from '../hooks';
import Text from './Text';
import styled from 'styled-components/native';
import ImageRoundButton from './ImageRoundButton';
import {BackIcon, MenuIcon, PlusIcon} from '../assets/icons';
import {useNavigation} from '@react-navigation/core';
import {colors} from '../theme';
import {SoeviiLogo} from '../assets/logos';
import {TourGuideZone} from 'rn-tourguide';
import {useTranslation} from 'react-i18next';

interface IProps {
  title?: string;
  showBackButton?: boolean;
  backgroundColor?: string;
  titleSize?: number;
  titleColor?: string;
  children?: React.ReactNode;
  onBackPressed?: () => void;
  rightButton?: boolean;
  onRightButtonPress?: () => void;
  centered?: boolean;
  showLogo?: boolean;
}

const SafeWrapper = styled.SafeAreaView`
  width: 100%;
`;

const Row = styled.View<IProps>`
  flex-direction: row;
  padding-top: 30px;
  padding-left: ${(props: IProps) => (props.centered ? 15 : 0)}px;
  padding-right: ${(props: IProps) => (props.centered ? 15 : 0)}px;
  align-items: center;
  justify-content: ${(props: IProps) =>
    props.centered ? 'space-between' : 'flex-start'};
`;

const PaddingContainer = styled.View<IProps>`
  ${(props: IProps) =>
    !props.centered &&
    `
    padding: 0px 0px 0px 20px;
  `}
`;

const Wrapper = styled.View<IProps>`
  width: 100%;
  padding-bottom: 20px;
`;

function Header({
  title = '',
  showBackButton = false,
  backgroundColor,
  titleSize = 22,
  children,
  titleColor = colors.main,
  rightButton = false,
  onBackPressed,
  onRightButtonPress,
  centered = false,
  showLogo = true,
}: IProps) {
  const theme = useTheme();
  const navigation: any = useNavigation();
  const {i18n} = useTranslation();

  const goBack = React.useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Wrapper backgroundColor={backgroundColor || theme.bottomTab}>
      <SafeWrapper>
        <Row centered={centered}>
          {!showBackButton && (
            <TourGuideZone
              zone={2}
              maskOffset={5}
              shape="circle"
              text={i18n.t('copilot.zone2')}>
              <PaddingContainer centered={centered}>
                <ImageRoundButton
                  icon={<MenuIcon width={30} height={30} fill={colors.main} />}
                  color={theme.bottomTab}
                  size={25}
                  onPress={onBackPressed ? onBackPressed : goBack}
                />
              </PaddingContainer>
            </TourGuideZone>
          )}
          {showBackButton && (
            <PaddingContainer centered={centered}>
              <ImageRoundButton
                icon={<BackIcon width={15} height={15} fill={colors.white} />}
                color={colors.main}
                size={35}
                onPress={() => navigation.goBack()}
              />
            </PaddingContainer>
          )}
          {showLogo && (
            <>
              <TourGuideZone
                zone={1}
                borderRadius={5}
                shape="rectangle"
                text={i18n.t('copilot.zone1')}>
                <PaddingContainer centered={centered}>
                  <SoeviiLogo width={120} height={50} />
                </PaddingContainer>
              </TourGuideZone>
              <PaddingContainer />
            </>
          )}
          {title !== '' && (
            <PaddingContainer centered={centered}>
              <Text color={titleColor} size={titleSize} bold>
                {title}
              </Text>
            </PaddingContainer>
          )}
          {rightButton && (
            <PaddingContainer centered={centered}>
              <ImageRoundButton
                icon={
                  <PlusIcon
                    width={15}
                    height={15}
                    fill={theme.common.textMediumEmphasis}
                  />
                }
                borderRadius={1}
                color={colors.main}
                size={40}
                onPress={onRightButtonPress}
              />
            </PaddingContainer>
          )}
        </Row>
        {children}
      </SafeWrapper>
    </Wrapper>
  );
}

export default React.memo(Header);
