import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabStack from './BottomTabStack';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Feed"
        component={BottomTabStack}
      />
    </Drawer.Navigator>
  );
}

export default React.memo(MyDrawer);
