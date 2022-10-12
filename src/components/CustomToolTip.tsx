import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {TooltipProps} from 'rn-tourguide';
import styled from 'styled-components/native';
import {useTheme} from '../hooks';
import {colors, opaque} from '../theme';
import {ICommon} from '../types';
import Text from './Text';

const Wrapper = styled.View<ICommon>`
  background-color: ${(props: ICommon) => props.background};
  padding: 20px;
  width: 70%;
  border-radius: 10px;
  min-height: 90px;
  justify-content: space-between;
`;

const BottomBar = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

function CustomToolTip({
  labels,
  handleStop,
  handleNext,
  isLastStep,
  handlePrev,
  isFirstStep,
  currentStep,
}: TooltipProps) {
  const theme = useTheme();
  return (
    <Wrapper background={opaque(theme.common.background, 0.9)}>
      <Text bold>{currentStep && currentStep.text}</Text>
      <BottomBar>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <Text color={colors.main}>{labels?.skip || 'Skip'}</Text>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Text color={colors.main}>{labels?.previous || 'Previous'}</Text>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Text color={colors.main}>{labels?.next || 'Next'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Text color={colors.main}>{labels?.finish || 'Finish'}</Text>
          </TouchableOpacity>
        )}
      </BottomBar>
    </Wrapper>
  );
}

export default React.memo(CustomToolTip);
