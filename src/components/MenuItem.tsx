import * as React from 'react';
import styled from 'styled-components/native';
import Text from './Text';
import {opaque} from '../theme';
import {TMenuItem} from '../types';

interface IProps {
  onPress?: () => {};
  item: TMenuItem;
}

const Wrapper = styled.TouchableOpacity<IProps>`
  background-color: ${(props: IProps) => opaque(props.item.color!, 0.25)};
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  padding-left: 15px;
`;

const IconContainer = styled.View`
  top: 5px;
  padding-bottom: 10px;
`;

const Circle = styled.View<IProps>`
  right: 10px;
  top: 10px;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  position: absolute;
  background-color: ${(props: IProps) => props.item.color};
`;

function MenuItem({onPress, item}: IProps) {
  return (
    <Wrapper item={item} onPress={onPress} activeOpacity={0.7}>
      <IconContainer>{item.icon}</IconContainer>
      <Text bold emphasis="high" type="title" color={item.color}>
        {item.text}
      </Text>
      <Circle item={item} />
    </Wrapper>
  );
}

export default React.memo(MenuItem);
