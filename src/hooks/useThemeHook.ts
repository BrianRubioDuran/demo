import * as React from 'react';
import {useColorScheme} from 'react-native';
import {colors, mapDark, opaque} from '../theme';
import {MapStyleElement} from 'react-native-maps';

type ThemeProps = {
  common: {
    background: string;
    textHighEmphasis: string;
    textMediumEmphasis: string;
    textDisabled: string;
    statusBar: 'light-content' | 'dark-content';
    elevatedColor: string;
    contrastColor: string;
  };
  map: MapStyleElement[];
  login: {
    image: string;
    content: string;
  };
  bottomTab: string;
};

const lightColors: ThemeProps = {
  common: {
    background: colors.white,
    textHighEmphasis: opaque(colors.black, 0.87),
    textMediumEmphasis: opaque(colors.black, 0.6),
    textDisabled: opaque(colors.black, 0.38),
    statusBar: 'dark-content',
    elevatedColor: colors.white,
    contrastColor: colors.contrast,
  },
  map: [],
  login: {
    content: colors.white,
    image: colors.contrast,
  },
  bottomTab: '#f5f5f5',
};

const darkColors: ThemeProps = {
  common: {
    background: colors.darkGrey,
    textHighEmphasis: opaque(colors.white, 0.87),
    textMediumEmphasis: opaque(colors.white, 0.6),
    textDisabled: opaque(colors.white, 0.38),
    statusBar: 'light-content',
    elevatedColor: colors.lightGray,
    contrastColor: colors.lightGray,
  },
  map: mapDark,
  login: {
    content: colors.opaqueGray,
    image: colors.darkGrey,
  },
  bottomTab: colors.lightGray,
};

const useTheme = () => {
  const [theme, setTheme] = React.useState<ThemeProps>(lightColors);
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(darkColors);
    } else {
      setTheme(lightColors);
    }
  }, [colorScheme]);

  return theme;
};

export default useTheme;
