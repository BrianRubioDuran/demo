import * as React from 'react';
import {LayoutChangeEvent, Platform} from 'react-native';
import styled from 'styled-components/native';
import {colors, fonts} from '../theme';
import ImageRoundButton from './ImageRoundButton';
import RNInfo from 'react-native-device-info';
import {EyeIcon} from '../assets/icons';
import {useTheme} from '../hooks';

// Xiaomi crash fix on android 10 when you put an email
const {Version} = Platform;
const brandsNeedingWorkaround = ['redmi', 'xiaomi', 'poco', 'pocophone'];
const needsXiaomiWorkaround =
  brandsNeedingWorkaround.includes(RNInfo.getBrand().toLowerCase()) &&
  Version > 28;

interface IProps {
  placeholder?: string;
  borderRadius?: number;
  maxLength?: number;
  isUpperCase?: boolean;
  onChangeText: (text: string) => void;
  isMultiline?: boolean;
  value?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  onBlur?: (e: any) => void;
  onFocus?: () => void;
  showRightButton?: boolean;
  onRightButtonPress?: () => void;
  rightButtonColor?: string;
  rightButtonIcon?: React.ReactNode;
  rightButtonEnabled?: boolean;
}

interface IInputProps {
  editable?: boolean;
  isMultiline?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
}
type TInput = {background: string; textColor: string};

const Input = styled.TextInput<TInput>`
  padding: 5px;
  flex-grow: 1;
  width: 100%;
  align-self: stretch;
  background-color: ${(props: TInput) => props.background};
  color: ${(props: TInput) => props.textColor};
  font-family: ${fonts.regular};
  font-size: 16px;
`;

const InputContainer = styled.View<IInputProps>`
  background-color: ${(props: IInputProps) =>
    props.editable ? props.backgroundColor : '#E0E0E0'};
  padding: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /* flex-grow: 1; */
  /* height: ${(props: IInputProps) => (props.isMultiline ? 130 : 60)}px; */
  border-color: ${colors.main};
  border-width: 0.5px;
  border-radius: ${(props: IInputProps) => props.borderRadius}px;
`;

const ShowPasswordButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

function TextInput({
  placeholder,
  onChangeText,
  isUpperCase = false,
  maxLength = 255,
  value,
  secureTextEntry = false,
  editable = true,
  onBlur,
  onFocus,
  showRightButton = false,
  onRightButtonPress,
  rightButtonColor = colors.main,
  rightButtonIcon,
  rightButtonEnabled = true,
  isMultiline = false,
  borderRadius = 10,
}: IProps): React.ReactElement {
  const [maxWidth, setMaxWidth] = React.useState<number | undefined>(undefined);
  const [showPassword, setShowPassword] =
    React.useState<boolean>(secureTextEntry);
  const theme = useTheme();

  const handleChangeText = React.useCallback(
    (text: string) => {
      onChangeText(isUpperCase ? text.toUpperCase() : text);
    },
    [isUpperCase, onChangeText],
  );

  // This function prevent errors when you add something beside the input
  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (!maxWidth) {
        setMaxWidth(event.nativeEvent.layout.width);
      }
    },
    [maxWidth],
  );

  const handleChangePasswordVisible = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const height = React.useMemo(() => {
    if (isMultiline) {
      return 120;
    } else {
      return 50;
    }
  }, [isMultiline]);

  const textAlign = React.useMemo(() => {
    if (isMultiline) {
      return 'top';
    } else {
      return undefined;
    }
  }, [isMultiline]);

  return (
    <InputContainer
      backgroundColor={theme.common.elevatedColor}
      borderRadius={borderRadius}
      isMultiline={isMultiline}
      editable={editable}>
      <Input
        textColor={theme.common.textHighEmphasis}
        background={theme.common.elevatedColor}
        caretHidden={needsXiaomiWorkaround} // Fix xiaomi crash on android 10 and email input
        style={{
          width: maxWidth,
          height: height,
          textAlignVertical: textAlign,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.common.textDisabled}
        onChangeText={handleChangeText}
        maxLength={maxLength}
        spellCheck={false}
        value={value}
        autoCapitalize={isUpperCase ? 'characters' : 'none'}
        secureTextEntry={showPassword}
        editable={editable}
        multiline={isMultiline}
        onBlur={onBlur || undefined}
        onFocus={onFocus || undefined}
        onLayout={onLayout}
      />
      {showRightButton && (
        <ImageRoundButton
          color={rightButtonColor}
          onPress={onRightButtonPress}
          icon={rightButtonIcon || undefined}
          enabled={rightButtonEnabled}
        />
      )}
      {secureTextEntry && (
        <ShowPasswordButton
          onPress={handleChangePasswordVisible}
          activeOpacity={0.5}>
          <EyeIcon width={20} height={20} />
        </ShowPasswordButton>
      )}
    </InputContainer>
  );
}

export default React.memo(TextInput);
