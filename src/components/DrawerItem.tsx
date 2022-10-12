import * as React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {BackIcon} from '../assets/icons';
import {colors} from '../theme';

interface IProps {
  label?: string;
  onPress?: () => void;
  showLeftIcon?: boolean;
  leftIcon?: React.ReactNode;
  showBorderBottom?: boolean;
}

interface IWrapper {
  showBorderBottom?: boolean;
}

const Wrapper = styled.TouchableOpacity<IWrapper>`
  align-items: center;
  padding: 15px;
  flex-direction: row;
  border-bottom-width: ${(props: IWrapper) =>
    props.showBorderBottom ? 0.5 : 0}px;
  border-color: ${colors.ghost};
  min-height: 50px;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const IconContainer = styled.View`
  padding: 5px;
`;

function DrawerItem({
  onPress,
  label,
  showLeftIcon = false,
  leftIcon = <BackIcon width={20} height={20} />,
  showBorderBottom = true,
}: IProps) {
  return (
    <Wrapper
      showBorderBottom={showBorderBottom}
      onPress={onPress || undefined}
      activeOpacity={0.5}>
      {showLeftIcon && <IconContainer>{leftIcon}</IconContainer>}
      <TextContainer>
        <Text numberOfLines={1}>{label}</Text>
      </TextContainer>
    </Wrapper>
  );
}

export default React.memo(DrawerItem);
