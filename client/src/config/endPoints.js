export const signUp = () => `http://localhost:3001/api/v1/auth/signup`;
export const signIn = () => `http://localhost:3001/api/v1/auth/signin`;
export const signOut = () => `http://localhost:3001/api/v1/auth/signout`;
export const checkAuth = () => `http://localhost:3001/api/v1/auth/check`;

export const getAllUsers = () => `http://localhost:3001/api/v1/users`;
export const editUser = (id) => `http://localhost:3001/api/v1/users/${id}`;
export const getUser = (id) => `http://localhost:3001/api/v1/users/${id}`;
