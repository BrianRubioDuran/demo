import {Platform} from 'react-native';

const fonts = {
  regular: Platform.OS === 'ios' ? 'SFProDisplay-Regular' : 'SanFrancisco',
  bold: Platform.OS === 'ios' ? 'SFUIDisplay-Bold' : 'SanFrancisco',
};

export default fonts;
