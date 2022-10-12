import {newRidgeState} from 'react-ridge-state';

interface IAppInfoState {
  version: string;
  deviceId: string;
  deviceModel: string;
  deviceOs: string;
}

const AppInfoState = newRidgeState<IAppInfoState>({
  version: '',
  deviceId: '',
  deviceModel: '',
  deviceOs: '',
});

export default AppInfoState;
