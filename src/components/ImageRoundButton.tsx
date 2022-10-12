import * as React from 'react';
import styled from 'styled-components/native';
import {RightArrowIcon} from '../assets/icons';
import {colors} from '../theme';
import {GestureResponderEvent, ActivityIndicator} from 'react-native';

interface IProps {
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  enabled?: boolean;
  loading?: boolean;
  loadingIndicatorColor?: string;
  size?: number;
  borderRadius?: number;
}

interface ITouchable {
  color?: string;
  enabled?: boolean;
  size?: number;
  borderRadius?: number;
}

const Touchable = styled.TouchableOpacity<ITouchable>`
  width: ${(props: IProps) => props.size}px;
  height: ${(props: IProps) => props.size}px;
  border-radius: ${(props: IProps) => props.borderRadius}px;
  background-color: ${(props: IProps): string =>
    props.enabled ? props.color || colors.darkBlue : colors.ghost};
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

function ImageRoundButton({
  color,
  onPress,
  icon,
  enabled = true,
  loading = false,
  loadingIndicatorColor = colors.white,
  size = 45,
  borderRadius,
}: IProps) {
  return (
    <Touchable
      size={size}
      delayPressIn={0}
      activeOpacity={enabled ? 0.5 : 1.0}
      enabled={enabled}
      borderRadius={borderRadius || size / 2}
      onPress={enabled && !loading ? onPress : undefined}
      color={color}>
      {!loading ? icon || <RightArrowIcon height={15} width={15} /> : null}
      {loading && <ActivityIndicator color={loadingIndicatorColor} />}
    </Touchable>
  );
}

export default React.memo(ImageRoundButton);
