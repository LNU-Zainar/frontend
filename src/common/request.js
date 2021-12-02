import axios from 'axios'
import { Message } from 'element-ui'
import { BusinessError } from './error'

const instance = axios.create({
  baseURL: process.env.NODE_ENV
    ? '/'
    : 'http://182.61.16.208',
  withCredentials: true,
  // 自定义配置
  customConfig: {
    description: '',
    payload: null,
    notifyType: 'sf', // s是Success，f是Failure
    notifyFailure: true,
    notifySuccess: true,
    transResponse: res => res.data.data
  }
})

/**
 * 请求拦截器
 * 在请求发出前，解析自定义配置
 */
instance.interceptors.request.use(config => {
  const { customConfig } = config
  const { description, payload, notifyType, ...axiosConfig } = customConfig

  delete axiosConfig.notifyFailure
  delete axiosConfig.notifySuccess

  if (typeof description === 'string' && description) {
    const [method, url] = description.split(' ')
    config.method = method
    config.url = url
  }

  if (typeof notifyType === 'string') {
    customConfig.notifySuccess = /s|S/.test(notifyType)
    customConfig.notifyFailure = /f|F/.test(notifyType)
  }

  switch (config.method) {
    case 'GET':
      config.params = payload
      break
    default:
      config.data = payload
  }

  return Object.assign(config, axiosConfig)
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 * 解包响应的数据，抛出业务逻辑错误
 */
instance.interceptors.response.use(response => {
  const { data, config } = response
  const { customConfig } = config

  // code为2xx
  if (/^2/.test(data.code)) {
    if (customConfig.notifySuccess) {
      Message.success(data.message)
    }
    return customConfig.transResponse(response)
  } else {
    const error = new BusinessError(data.message)
    Object.assign(error, response)
    return Promise.reject(error)
  }
}, null)

instance.interceptors.response.use(null, error => {
  const { name, message, config, response } = error

  if (config.customConfig.notifyFailure) {
    Message.error(
      name === 'BusinessError'
        ? message 
        : response.status + ' ' + response.statusText
    )
  }
  return Promise.reject(error)
})

export default instance
