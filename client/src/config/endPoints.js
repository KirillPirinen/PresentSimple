export const host = "http://localhost:3001";

const initPoints = {
  //Аутентификация
  signUp:"/api/v1/auth/signup",
  signIn:"/api/v1/auth/signin",
  signOut:"/api/v1/auth/signout",
  checkAuth:"/api/v1/auth/check",
  checkEmail:"/api/v1/auth/checkemail",
  resetPassword:"/api/v1/auth/resetpassword/",
  //Юзеры, Анкеты
  createForm: "/api/v1/form/",
  searchPersonOrForm: "/api/v1/form/search",
  //
}

export default initPoints;
