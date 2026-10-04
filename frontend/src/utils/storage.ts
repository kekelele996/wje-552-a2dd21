export const storage = {
  getToken: () => localStorage.getItem('fit-token'),
  setToken: (token: string) => localStorage.setItem('fit-token', token),
  clear: () => localStorage.removeItem('fit-token'),
};
