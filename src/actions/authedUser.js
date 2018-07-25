export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = id => ({
    type: LOGIN,
    id
});

export const logout = () => ({
    type: LOGOUT
});
