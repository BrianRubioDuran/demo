import * as React from 'react';
import {useIsFocused} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {StatusBar, StyleSheet} from 'react-native';
import AbsoluteLoading from './AbsoluteLoading';
import styled from 'styled-components/native';
import {colors} from '../theme';
import Button from './Button';
import Text from './Text';
import {useTheme} from '../hooks';
interface IProps {
  children?: React.ReactNode;
  onRender?: () => void;
  backgroundColor?: string;
  statusBar?: 'dark-content' | 'light-content';
  statusBarBackgroundColor?: string;
  loading?: boolean;
  showContent?: boolean;
  onTryAgain?: Function[];
}

interface IMain {
  backgroundColor?: string;
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});

const MainWrapper = styled.View<IMain>`
  flex: 1;
  background-color: ${(props: IMain) => props.backgroundColor};
`;

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PaddingContainer = styled.View`
  padding: 10px;
`;

function AnimatedScreenWrapper({
  children,
  onRender,
  backgroundColor = undefined,
  statusBar = undefined,
  statusBarBackgroundColor = undefined,
  loading = false,
  showContent = true,
  onTryAgain = [],
}: IProps) {
  const theme = useTheme();

  const isFocused = useIsFocused();

  const handleChangeTryAgain = React.useCallback(() => {
    onTryAgain.map(item => {
      item();
    });
  }, [onTryAgain]);

  React.useEffect(() => {
    if (isFocused && onRender) {
      onRender();
    }
  }, [isFocused, onRender]);

  return (
    <MainWrapper backgroundColor={backgroundColor || theme.common.background}>
      {showContent && (
        <Animatable.View
          useNativeDriver
          duration={200}
          animation="zoomInDown"
          style={[
            styles.wrapper,
            {backgroundColor: backgroundColor || theme.common.background},
          ]}>
          <StatusBar
            backgroundColor={
              statusBarBackgroundColor || theme.common.background
            }
            barStyle={statusBar || theme.common.statusBar}
          />
          {children}
          {loading && <AbsoluteLoading />}
        </Animatable.View>
      )}
      {!showContent && (
        <CenterContainer>
          <PaddingContainer>
            <Text color={colors.black}>Ha ocurrido un error.</Text>
          </PaddingContainer>
          <PaddingContainer>
            <Button title="Intentar de nuevo" onPress={handleChangeTryAgain} />
          </PaddingContainer>
        </CenterContainer>
      )}
    </MainWrapper>
  );
}

export default React.memo(AnimatedScreenWrapper);
