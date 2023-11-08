/**
 * 文档: https://uniajax.ponjs.com/
 * github: https://github.com/ponjs/uni-ajax
 * 插件市场: https://ext.dcloud.net.cn/plugin?id=2351
 */

// 引入 uni-ajax 模块
import ajax from 'uni-ajax'
import type { AjaxResponse } from 'uni-ajax'

/**
 * 获取token
 * @returns {string} token
 */
const getToken = () => uni.getStorageSync('token')

/**
 * 获取cookie
 * @returns {string} cookie
 */
const getCookie = () => uni.getStorageSync('cookie')

/**
 * 保存cookie
 * @param {string} cookie
 * @returns {void}
 */
const saveCookie = (cookie: string) => cookie && uni.setStorageSync('cookie', cookie)

/**
 * 处理响应数据
 * @param {object} response 响应数据
 * @returns {object} 响应数据
 */
function handleCode(response: AjaxResponse<any>) {
  const { data } = response
  const code = data.code || data.Code || null
  const status: { [key: string]: () => any } = {
    0: () => data,
  }
  return status[code]?.() ?? Promise.reject(data)
}

/**
 * 显示消息提示框
 * @param {string} msg
 * @returns {Promise<any>} 提示框信息
 */
function showToast(msg: string) {
  return uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
  })
}

// 创建请求实例
const instance = ajax.create({
  // 初始配置
  baseURL: '',
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
 * @param {object} config 发送请求的配置数据
 * @param {object} error 发送请求的错误信息
 * @returns {Promise | object}
 */
instance.interceptors.request.use(
  (config) => {
    config.custom.loading && uni.showLoading({ title: '加载中', mask: true }) // 请求配置中的custom自定义参数中loading为true则显示loading
    getToken() && (config.header.token = getToken()) // 有token则在请求头中携带token
    getCookie() && (config.header.cookie = getCookie()) // 有cookie则在请求头中携带cookie，h5中浏览器默认携带cookie，此方法不生效，小程序中需手动携带cookie
    return config
  },
  (error) => {
    showToast(error)
    uni.hideLoading()
    return Promise.reject(error)
  },
)

/**
 * 响应拦截器
 * @param {object} response 响应数据
 * @param {object} error 响应错误信息
 * @returns {Promise}
 */
instance.interceptors.response.use(
  async (response) => {
    saveCookie(response.header['set-cookie'] || response.header['Set-Cookie']) // 手动种cookie，h5中浏览器自动种cookie，小程序中需手动中cookie
    try {
      return await handleCode(response)
    }
    catch (err: any) {
      uni.hideLoading()
      response.config.custom.error && showToast(err.msg || err.Msg || err.message || JSON.stringify(err).replace(/\"/g, ''))
      return Promise.reject(err)
    }
  },
  error => Promise.reject(error),
)

// 导出 create 创建后的实例
export default instance
