declare module '*.png';
declare module '*.json';
declare module 'moment/locale/es';
declare module 'react-native-cool-speedometer';
declare module 'moment-duration-format';
declare module 'react-native-simple-biometrics';
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'react-native-keyboard-aware-scrollview' {
  import React from 'react';
  import {ScrollViewProps} from 'react-native';
  const KeyboardAwareScrollView: React.FC<ScrollViewProps>;
  export {KeyboardAwareScrollView};
}
declare module 'react-native-countdown-component';
declare module 'react-native-crypto-js';
declare module 'react-native-conekta';

declare module 'react-native-animatable-unmountable' {
  import {
    NativeMethodsMixin,
    ViewProperties,
    TextProperties,
    ImageProperties,
    ViewStyle,
    TextStyle,
    ImageStyle,
  } from 'react-native';
  import {
    StatelessComponent,
    ComponentClass,
    ClassicComponentClass,
  } from 'react';

  export type EasingFunction = {(t: number): number};
  export type Easing =
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'ease-in-cubic'
    | 'ease-out-cubic'
    | 'ease-in-out-cubic'
    | 'ease-in-circ'
    | 'ease-out-circ'
    | 'ease-in-out-circ'
    | 'ease-in-expo'
    | 'ease-out-expo'
    | 'ease-in-out-expo'
    | 'ease-in-quad'
    | 'ease-out-quad'
    | 'ease-in-out-quad'
    | 'ease-in-quart'
    | 'ease-out-quart'
    | 'ease-in-out-quart'
    | 'ease-in-quint'
    | 'ease-out-quint'
    | 'ease-in-out-quint'
    | 'ease-in-sine'
    | 'ease-out-sine'
    | 'ease-in-out-sine'
    | 'ease-in-back'
    | 'ease-out-back'
    | 'ease-in-out-back'
    | EasingFunction;

  export type Animation =
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight';

  export type Direction =
    | 'normal'
    | 'reverse'
    | 'alternate'
    | 'alternate-reverse';

  interface AnimatableProperties<S extends {}> {
    animation?: Animation | string | CustomAnimation;
    duration?: number;
    delay?: number;
    direction?: Direction;
    mounted?: boolean;
    easing?: Easing;
    iterationCount?: number | 'infinite';
    iterationDelay?: number;
    transition?: keyof S | ReadonlyArray<keyof S>;
    useNativeDriver?: boolean;
    onAnimationBegin?: Function;
    onAnimationEnd?: Function;
    unmountAnimation?: Animation | string | CustomAnimation;
    unmountDuration?: number;
    onTransitionBegin?: (property: string) => void;
    onTransitionEnd?: (property: string) => void;
  }

  type AnimatableAnimationMethods = Partial<{
    [k in Animation]: (duration?: number) => Promise<{finished: boolean}>;
  }>;

  interface AnimatableComponent<P extends {}, S extends {}>
    extends NativeMethodsMixin,
      AnimatableAnimationMethods,
      ClassicComponentClass<AnimatableProperties<S> & P> {
    stopAnimation(): void;

    transition<T extends S>(
      fromValues: T,
      toValues: T,
      duration?: number,
      easing?: Easing,
    ): void;

    transitionTo<T extends S>(
      toValues: T,
      duration?: number,
      easing?: Easing,
    ): void;
  }

  export interface CustomAnimation<T = TextStyle & ViewStyle & ImageStyle> {
    from?: T;
    to?: T;
    style?: T;
    easing?: Easing;
    [progress: number]: T;
  }

  export function createAnimation(animation: CustomAnimation): object;

  export function registerAnimation(
    name: string,
    animation: CustomAnimation,
  ): void;

  export function initializeRegistryWithDefinitions(animations: {
    [key: string]: CustomAnimation;
  }): void;

  type GetPropertyType<B, K extends keyof B> = B[K];
  export function createAnimatableComponent<
    P extends {style?: any},
    S = GetPropertyType<P, 'style'>,
  >(
    Component:
      | ComponentClass<P>
      | StatelessComponent<P>
      | ClassicComponentClass<P>,
  ): AnimatableComponent<P, S>;

  export const View: AnimatableComponent<ViewProperties, ViewStyle>;
  export type View = AnimatableComponent<ViewProperties, ViewStyle>;
  export const Text: AnimatableComponent<TextProperties, TextStyle>;
  export type Text = AnimatableComponent<TextProperties, TextStyle>;
  export const Image: AnimatableComponent<ImageProperties, ImageStyle>;
  export type Image = AnimatableComponent<ImageProperties, ImageStyle>;
}
