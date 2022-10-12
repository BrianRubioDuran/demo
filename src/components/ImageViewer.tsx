import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import {ImageViewer as Viewer} from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import ImageRoundButton from './ImageRoundButton';
// import {BackHeaderIcon, BrokenImageIcon} from '../assets/icons';
import {colors, opaque} from '../theme';
import Text from './Text';
import {StyleSheet} from 'react-native';
import {BackIcon} from '../assets/icons';
const {height} = Dimensions.get('window');
interface IImage {
  url: string;
}

interface IProps {
  images?: IImage[];
  showBackButton?: boolean;
  loadingImages?: boolean;
}

const styles = StyleSheet.create({
  broken: {
    flex: 1,
    backgroundColor: opaque(colors.gray, 0.1),
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  modal: {padding: 0, margin: 0},
  noImage: {
    height: height * 0.25,
    justifyContent: 'center',
    backgroundColor: opaque(colors.gray, 0.1),
  },
  image: {
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
});

const ImageContainer = styled.Image`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  flex: 1;
  z-index: 3;
  background: ${opaque(colors.gray, 0.1)};
`;

const BackButtonContainer = styled.SafeAreaView`
  z-index: 3;
  position: absolute;
  left: 10px;
  top: 0px;
`;
const Touchable = styled.TouchableOpacity`
  border-radius: 20px;
`;

const Container = styled.View`
  width: 100%;
`;

const BrokenContainer = styled.View`
  padding: 10px;
`;

function ImageViewer({
  images = [],
  showBackButton = true,
  loadingImages = false,
}: IProps) {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [startIndex, setStartIndex] = React.useState<number>(0);

  const handleViewImage = React.useCallback((index: number) => {
    return () => {
      setStartIndex(index);
      setVisible(true);
    };
  }, []);

  const closeModal = React.useCallback(() => {
    setVisible(false);
  }, []);

  const back = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!loadingImages) {
    return (
      <Container>
        <StatusBar
          translucent={true}
          backgroundColor={opaque(colors.black, 0.21)}
        />
        <Container style={{height: height * 0.25}}>
          {images.length > 0 ? (
            <Swiper
              autoplay
              autoplayTimeout={5}
              activeDotColor={colors.white}
              dotColor={opaque(colors.white, 0.5)}
              loop>
              {images.map((image, index) => (
                <Touchable
                  key={`image-${index}`}
                  onPress={handleViewImage(index)}
                  activeOpacity={1}>
                  <Container>
                    <Overlay />
                    <ImageContainer
                      resizeMode="contain"
                      style={styles.image}
                      source={{uri: image.url}}
                    />
                  </Container>
                </Touchable>
              ))}
            </Swiper>
          ) : (
            <Container style={styles.broken}>
              <BrokenContainer>
                {/* <BrokenImageIcon
                  fill={colors.main}
                  width={35}
                  height={35}
                /> */}
              </BrokenContainer>
              <Text color={colors.main}>Imagen no disponible.</Text>
            </Container>
          )}
        </Container>
        <Modal
          isVisible={visible}
          onBackButtonPress={closeModal}
          style={styles.modal}
          animationIn="fadeIn"
          animationOut="fadeOut">
          {visible && (
            <StatusBar backgroundColor={colors.black} animated={true} />
          )}
          {images && <Viewer index={startIndex} imageUrls={images} />}
          <BackButtonContainer>
            <ImageRoundButton
              onPress={closeModal}
              color={colors.main}
              size={35}
              icon={<BackIcon fill={colors.white} width={15} height={15} />}
            />
          </BackButtonContainer>
        </Modal>
      </Container>
    );
  }

  return (
    <Container style={styles.noImage}>
      <ActivityIndicator color={colors.main} />
      {showBackButton && (
        <BackButtonContainer>
          <ImageRoundButton
            onPress={back}
            color={colors.white}
            size={35}
            icon={<BackIcon color="white" width={15} height={15} />}
          />
        </BackButtonContainer>
      )}
    </Container>
  );
}

export default React.memo(ImageViewer);
