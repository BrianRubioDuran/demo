import * as React from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {colors} from '../theme';

interface IProps {
  children?: React.ReactNode;
  onBeginDrag?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  refreshIndicatorColor?: string;
  showRefreshControl?: boolean;
  padding?: number;
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 200,
  },
  mainContainer: {
    width: '100%',
  },
});

function ScreenContentContainer({
  children,
  onBeginDrag,
  onRefresh,
  refreshing = false,
  refreshIndicatorColor = colors.white,
  showRefreshControl = false,
  padding = 20,
}: IProps) {
  return (
    <KeyboardAwareScrollView
      onScrollBeginDrag={onBeginDrag}
      refreshControl={
        showRefreshControl ? (
          <RefreshControl
            tintColor={refreshIndicatorColor}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
      style={styles.mainContainer}
      contentContainerStyle={{...styles.contentContainer, padding: padding}}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
}

export default React.memo(ScreenContentContainer);
