
export type User = {
  userName: string,
};
export type Action =
  { type: 'LOG_IN', payload: User }
  | { type: 'LOG_OUT' };