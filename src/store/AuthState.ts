import {newRidgeState} from 'react-ridge-state';

interface IAuthState {
  token: string | null;
}

const AuthState = newRidgeState<IAuthState>({token: null});

export default AuthState;
