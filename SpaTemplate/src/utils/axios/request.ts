// request.ts
import axios from './index'
import qs from 'qs'

export class Request {
  /**
   * get
   * @param {string} url 路径
   * @param {object} params 参数
   */
  static get = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * post
   * @param {string} url 路径
   * @param {object} params 参数
   */
  static post = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(params))
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // TODO 结合情况是否扩展
}
