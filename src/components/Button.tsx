import * as React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {colors} from '../theme';
import {ActivityIndicator} from 'react-native';

interface IProps {
  backgroundColor?: string;
  textColor?: string;
  title?: string;
  onPress: () => void;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
  loadingIndicatorColor?: string;
  icon?: React.ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  borderRadius?: number;
  textType?: 'mini' | 'normal' | 'title';
  underlinedText?: boolean;
  inverted?: boolean;
  enabled?: boolean;
  fullWidth?: boolean;
  boldText?: boolean;
}

interface IButton {
  backgroundColor: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  inverted?: boolean;
  fullWidth?: boolean;
}

const IconContainer = styled.View`
  padding: 10px;
  align-items: flex-start;
  justify-content: center;
`;

const MyButton = styled.TouchableOpacity<IButton>`
  width: ${(props: IButton): string | number =>
    props.fullWidth ? '100%' : `${props.width}px`};
  height: ${(props: IButton): string | number => props.height || 40}px;
  background-color: ${(props: IButton): string =>
    props.inverted ? colors.transparent : props.backgroundColor};
  border-radius: ${(props: IButton): string | number =>
    props.borderRadius || 0}px;
  flex-direction: row;
  /* flex-grow: 1; */
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-width: 0.5px;
  border-color: ${(props: IButton) => props.backgroundColor};
`;

function Button({
  backgroundColor = colors.main,
  textColor = colors.white,
  title,
  onPress,
  width = 300,
  loading = false,
  loadingIndicatorColor = colors.white,
  icon,
  showLeftIcon = false,
  showRightIcon = false,
  height = 50,
  borderRadius = 10,
  textType = 'normal',
  underlinedText = false,
  inverted = false,
  enabled = true,
  boldText = false,
  fullWidth = false,
}: IProps): React.ReactElement {
  return (
    <MyButton
      fullWidth={fullWidth}
      inverted={inverted}
      delayPressIn={0}
      activeOpacity={enabled ? 0.5 : 1.0}
      borderRadius={borderRadius}
      height={height}
      width={width}
      backgroundColor={enabled ? backgroundColor : colors.ghost}
      onPress={!loading && enabled ? onPress : undefined}>
      {!loading && showLeftIcon && icon && (
        <IconContainer>{icon}</IconContainer>
      )}
      {!loading && (
        <Text
          bold={boldText}
          underlined={underlinedText}
          type={textType}
          color={
            enabled ? (inverted ? backgroundColor : textColor) : colors.white
          }>
          {title}
        </Text>
      )}
      {!loading && showRightIcon && <IconContainer>{icon}</IconContainer>}
      {loading && (
        <ActivityIndicator
          color={inverted ? backgroundColor : loadingIndicatorColor}
        />
      )}
    </MyButton>
  );
}

export default React.memo(Button);
