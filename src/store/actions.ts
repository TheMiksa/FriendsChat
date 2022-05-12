
type SetUser = {
  userId: string,
  userName: string,
};

export const setUser = (payload: SetUser) => ({
  type: 'SET_USER',
  payload,
});