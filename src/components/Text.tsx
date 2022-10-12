import * as React from 'react';
import styled from 'styled-components/native';
import {TextStyle, LayoutChangeEvent} from 'react-native';
import {useTheme} from '../hooks';
import {fonts} from '../theme';

interface IProps {
  size?: number;
  style?: TextStyle;
  children?: string | React.ReactNode[] | React.ReactNode;
  color?: string;
  type?: 'normal' | 'title' | 'mini';
  emphasis?: 'high' | 'low';
  bold?: boolean;
  numberOfLines?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  underlined?: boolean;
  onPress?: () => void;
  justified?: boolean;
}

interface ITextProps {
  size?: number;
  color?: string;
  bold?: boolean;
  underlined?: boolean;
  justified?: boolean;
}

const Text = styled.Text<ITextProps>`
  font-size: ${(props: ITextProps): number => props.size || 14}px;
  color: ${(props: ITextProps): string => props.color || '#000'};
  font-family: ${(props: ITextProps) =>
    props.bold ? fonts.bold : fonts.regular};
  font-weight: ${(props: ITextProps) => (props.bold ? 800 : 400)};
  text-decoration-color: ${(props: ITextProps): string =>
    props.color || '#000'};
  text-decoration-line: ${(props: ITextProps): string =>
    props.underlined ? 'underline' : 'none'};
  text-align: ${(props: ITextProps) => (props.justified ? 'justify' : 'auto')};
`;

const Title = styled.Text<ITextProps>`
  font-size: 22px;
  color: ${(props: ITextProps): string => props.color || '#000'};
  font-family: ${(props: ITextProps) =>
    props.bold ? fonts.bold : fonts.regular};
  font-weight: ${(props: ITextProps) => (props.bold ? 800 : 400)};
  text-decoration-color: ${(props: ITextProps): string =>
    props.color || '#000'};
  text-decoration-line: ${(props: ITextProps): string =>
    props.underlined ? 'underline' : 'none'};
  text-align: ${(props: ITextProps) => (props.justified ? 'justify' : 'auto')};
`;

const Mini = styled.Text<ITextProps>`
  font-size: 10px;
  color: ${(props: ITextProps): string => props.color || '#000'};
  font-family: ${(props: ITextProps) =>
    props.bold ? fonts.bold : fonts.regular};
  font-weight: ${(props: ITextProps) => (props.bold ? 800 : 400)};
  text-decoration-color: ${(props: ITextProps): string =>
    props.color || '#000'};
  text-decoration-line: ${(props: ITextProps): string =>
    props.underlined ? 'underline' : 'none'};
  text-align: ${(props: ITextProps) => (props.justified ? 'justify' : 'auto')};
`;

function CustomText({
  color,
  style,
  size,
  children,
  type,
  bold = false,
  numberOfLines,
  onLayout,
  underlined = false,
  onPress,
  justified = false,
  emphasis = 'high',
}: IProps) {
  let aux: React.ReactElement;
  const theme = useTheme();

  const textColor: string = React.useMemo(() => {
    if (color) {
      return color;
    }
    if (emphasis === 'high') {
      return theme.common.textHighEmphasis;
    }
    return theme.common.textMediumEmphasis;
  }, [
    color,
    emphasis,
    theme.common.textHighEmphasis,
    theme.common.textMediumEmphasis,
  ]);

  switch (type) {
    case 'mini':
      aux = (
        <Mini
          justified={justified}
          underlined={underlined}
          onLayout={onLayout}
          numberOfLines={numberOfLines}
          color={textColor}
          allowFontScaling={false}
          bold={bold}
          onPress={onPress}
          style={style}>
          {children}
        </Mini>
      );
      break;
    case 'title':
      aux = (
        <Title
          justified={justified}
          underlined={underlined}
          onLayout={onLayout}
          numberOfLines={numberOfLines}
          color={textColor}
          onPress={onPress}
          allowFontScaling={false}
          bold={bold}
          style={style}>
          {children}
        </Title>
      );
      break;
    default:
      aux = (
        <Text
          justified={justified}
          underlined={underlined}
          onLayout={onLayout}
          numberOfLines={numberOfLines}
          color={textColor}
          onPress={onPress}
          allowFontScaling={false}
          size={size}
          bold={bold}
          style={style}>
          {children}
        </Text>
      );
      break;
  }

  return aux;
}

export default React.memo(CustomText);
