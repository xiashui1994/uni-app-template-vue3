/**
 * 文档: https://uniajax.ponjs.com/
 * github: https://github.com/ponjs/uni-ajax
 * 插件市场: https://ext.dcloud.net.cn/plugin?id=2351
 */

import type { AjaxResponse } from 'uni-ajax'
// 引入 uni-ajax 模块
import ajax from 'uni-ajax'
import Loading from './loading'

const loading = new Loading()

/**
 * 获取 token
 * @returns token
 */
const getToken = (): string => uni.getStorageSync('token')

/**
 * 获取 cookie
 * @returns cookie
 */
const getCookie = (): string => uni.getStorageSync('cookie')

/**
 * 保存 cookie
 * @param cookie
 */
const saveCookie = (cookie: string): void | string => cookie && uni.setStorageSync('cookie', cookie)

/**
 * 处理响应数据
 * @param response 响应数据
 * @returns 响应数据
 */
function handleCode(response: AjaxResponse<any>): Promise<any> {
  const { data } = response
  const code = data.code ?? data.Code
  const status: { [key: string]: () => any } = {
    0: () => data,
  }
  loading.hide()
  return status[code]?.() ?? Promise.reject(data)
}

/**
 * 显示消息提示框
 * @param msg
 * @returns 提示框信息
 */
function showToast(msg: string): Promise<any> {
  return uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
  })
}

// 创建请求实例
const instance = ajax.create({
  // 初始配置
  baseURL: feConfig.api.base,
  header: {
    'Content-Type': 'application/json',
  },
  custom: { // 自定义配置
    loading: true, // 是否显示 loading
    error: true, // 是否显示错误提示
  },
  withCredentials: true,
})

/**
 * 请求拦截器
 * @param config 发送请求的配置数据
 * @param error 发送请求的错误信息
 */
instance.interceptors.request.use(
  (config) => {
    loading.show(config.custom?.loading) // 请求配置中的 custom 自定义参数中 loading 为 true 则显示 loading
    getToken() && (config.header.token = getToken()) // 有 token 则在请求头中携带 token
    getCookie() && (config.header.cookie = getCookie()) // 有 cookie 则在请求头中携带 cookie，h5 中浏览器默认携带 cookie，此方法不生效，小程序中需手动携带 cookie
    if (config.data)
      config.data = Object.fromEntries(Object.entries(config.data).filter(([_, value]) => value !== undefined)) // 过滤空数据
    return config
  },
  (error) => {
    showToast(error)
    loading.hide()
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 * @param response 响应数据
 * @param error 响应错误信息
 */
instance.interceptors.response.use(
  async (response) => {
    saveCookie(response.header['set-cookie'] || response.header['Set-Cookie']) // 手动种 cookie，h5 中浏览器自动种 cookie，小程序中需手动种 cookie
    try {
      return await handleCode(response)
    }
    catch (err: any) {
      loading.hide()
      response.config.custom?.error && showToast(err.msg || err.Msg || err.message || JSON.stringify(err).replace(/"/g, ''))
      return Promise.reject(err)
    }
  },
  (error) => {
    loading.hide()
    return Promise.reject(error)
  },
)

// 导出 create 创建后的实例
export default instance
