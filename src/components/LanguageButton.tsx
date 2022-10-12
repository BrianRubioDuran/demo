import * as React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {ICommon} from '../types';
import CountryFlag from 'react-native-country-flag';
import {Neomorph} from 'react-native-neomorph-shadows';
import {colors} from '../theme';
import {StyleSheet} from 'react-native';
import {useTheme} from '../hooks';

const styles = StyleSheet.create({
  neo: {
    shadowOpacity: 0.3,
    borderRadius: 50,
    shadowRadius: 5,
    width: 130,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IProps {
  countryCode: string;
  text: string;
  selected: boolean;
  onPress: () => void;
}

interface IStyle extends ICommon {
  selected: boolean;
}

const Wrapper = styled.TouchableOpacity<IStyle>`
  background-color: ${(props: IStyle) => props.background};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  width: 130px;
  height: 49px;
  border-radius: 50px;
  border-width: 0.3px;
  border-color: ${colors.main};
`;

const HorizontalDivider = styled.View`
  width: 10px;
`;

const TempContent = styled.View<ICommon>`
  background-color: ${(props: ICommon) => props.background};
  margin: 0px 10px;
  border-radius: 50px;
`;

function LanguageButton({
  countryCode = 'mx',
  text = 'Español',
  selected = false,
  onPress,
}: IProps) {
  const theme = useTheme();

  if (selected) {
    return (
      <Neomorph
        darkShadowColor={colors.main}
        lightShadowColor={colors.main}
        style={{
          ...styles.neo,
          backgroundColor: theme.common.elevatedColor,
        }}>
        <Wrapper
          onPress={onPress}
          activeOpacity={0.5}
          selected
          background="transparent">
          <CountryFlag isoCode={countryCode} size={25} />
          <HorizontalDivider />
          <Text>{text}</Text>
        </Wrapper>
      </Neomorph>
    );
  }
  return (
    <TempContent background={theme.common.elevatedColor}>
      <Wrapper
        onPress={onPress}
        activeOpacity={0.5}
        selected
        background="transparent">
        <CountryFlag isoCode={countryCode} size={25} />
        <HorizontalDivider />
        <Text>{text}</Text>
      </Wrapper>
    </TempContent>
  );
}

export default React.memo(LanguageButton);
