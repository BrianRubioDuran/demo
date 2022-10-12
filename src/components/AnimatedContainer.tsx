import * as React from 'react';
import {Animation} from 'react-native-animatable';
import * as Animatable from 'react-native-animatable-unmountable';

interface IProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  animation?: Animation;
  unmountAnimation?: Animation;
  duration?: number;
  height?: number;
  flex?: number;
  width?: string | number;
  padding?: number;
}

function AnimatedContainer({
  children,
  isVisible = true,
  animation = 'fadeInDown',
  unmountAnimation = 'fadeOutDown',
  duration = 800,
  height = undefined,
  flex = 0,
  width = undefined,
  padding = undefined,
}: IProps) {
  return (
    <Animatable.View
      mounted={isVisible}
      animation={animation}
      duration={duration}
      unmountAnimation={unmountAnimation}
      style={{height: height, flex: flex, width: width, padding: padding}}
      unmountDuration={duration}>
      {children}
    </Animatable.View>
  );
}

export default React.memo(AnimatedContainer);
