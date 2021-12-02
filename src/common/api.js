import request from './request'

const createAPI = description => (payload, config) => request({
  customConfig: {
    description,
    payload,
    ...config
  }
})

const APIDescriptions = {
  register: 'POST /auth/register',
  login: 'POST /auth/login',
  logout: 'POST /auth/logout',
  userInfo: 'GET /auth/userinfo'
}

export const register = createAPI(APIDescriptions.register)
export const login = createAPI(APIDescriptions.login)
export const logout = createAPI(APIDescriptions.logout)
export const getUserInfo = createAPI(APIDescriptions.userInfo)
