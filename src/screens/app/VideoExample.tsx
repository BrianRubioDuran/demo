import * as React from 'react';
import {
  AnimatedScreenWrapper,
  Button,
  ImageRoundButton,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {BackIcon} from '../../assets/icons';
import {colors} from '../../theme';
import YoutubePlayer from 'react-native-youtube-iframe';

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  z-index: 5;
  position: absolute;
  top: 0px;
  left: 15px;
`;

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function VideoExample() {
  const [playing, setPlaying] = React.useState(false);
  const navigation = useNavigation();

  const onStateChange = React.useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = React.useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AnimatedScreenWrapper>
      <BackButtonWrapper>
        <SafeView>
          <ImageRoundButton
            onPress={goBack}
            icon={<BackIcon width={15} height={15} fill={colors.white} />}
            color={colors.main}
          />
        </SafeView>
      </BackButtonWrapper>
      <CenteredContainer>
        <YoutubePlayer
          height={300}
          width={300}
          play={playing}
          videoId={'tO01J-M3g0U'}
          onChangeState={onStateChange}
        />
        <Button title={playing ? 'Pause' : 'Play'} onPress={togglePlaying} />
      </CenteredContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(VideoExample);
