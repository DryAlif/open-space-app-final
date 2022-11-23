import api from '../../utils/api';
/**
 * @TODO: Define all the actions (creator) for the authUser state
 */
const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
};

const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser
  }
});

const unsetAuthUserActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: {
    authUser: null
  }
});

const asyncSetAuthUser =
  ({ id, password }) =>
  async (dispatch) => {
    try {
      const token = await api.login({ id, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };

const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unsetAuthUserActionCreator());
  api.putAccessToken('');
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
};
