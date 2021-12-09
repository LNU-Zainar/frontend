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
  getUserInfo: 'GET /userinfo',
  putUserInfo: 'PUT /userinfo',
  getItems: 'GET /items',
  postItem: 'POST /items',
  putItem: 'PUT /item/:id',
  getItem: 'GET /item/:id',
  getUploadToken: 'GET /upload_token',
  getCategory: 'GET /category',
  getLocation: 'GET /location',
  getUserItems: 'GET /user/items',
  deleteUserItem: 'DELETE /items/:id',
  modifyPassword: 'PATCH /users',
  getMapLocation: 'GET /map_location'
}

export const register = createAPI(APIDescriptions.register)
export const login = createAPI(APIDescriptions.login)
export const logout = createAPI(APIDescriptions.logout)
export const getUserInfo = createAPI(APIDescriptions.getUserInfo)
export const putUserInfo = createAPI(APIDescriptions.putUserInfo)
export const getItems = createAPI(APIDescriptions.getItems)
export const postItem = createAPI(APIDescriptions.postItem)
export const putItem = createAPI(APIDescriptions.putItem)
export const getUploadToken = createAPI(APIDescriptions.getUploadToken)
export const getItem = createAPI(APIDescriptions.getItem)
export const getCategory = createAPI(APIDescriptions.getCategory)
export const getLocation = createAPI(APIDescriptions.getLocation)
export const getUserItems = createAPI(APIDescriptions.getUserItems)
export const deleteUserItem = createAPI(APIDescriptions.deleteUserItem)
export const modifyPassword = createAPI(APIDescriptions.modifyPassword)
export const getMapLocation = createAPI(APIDescriptions.getMapLocation)
