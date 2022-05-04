import router from '@/router'
import { message } from 'ant-design-vue'
import { useAuthStoreWithOut } from '@/store/modules/auth'

const store = useAuthStoreWithOut()

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
export const errorHandle = (status: number, other: string) => {
  switch (status) {
    case 302:
      message.error('接口重定向')
      break
    case 400:
      message.error(`${status} 发出的请求有错误，服务器没有进行新建或修改数据的操作`)
      break
    case 401: //未登录 -> 重定向
      message.error(`${status}:${store.roles} token:登录失效`)
      router.replace({
        path: '/login'
      })
      break
    case 403: // token过期
      message.error(`${status} 登录过期,用户得到授权，但访问被禁止!`)
      setTimeout(() => {
        router.replace({
          path: '/login'
        })
      }, 1000)
      break
    case 404:
      message.error(`${status} 网络请求不存在`)
      break
    case 406:
      message.error(`${status} 请求的格式不可得`)
      break
    case 408:
      message.error('请求超时')
      break
    case 410:
      message.error(`${status} 请求的资源被永久删除，且不会再得到的`)
      break
    case 422:
      message.error(`${status} 当创建一个对象时，发生一个验证错误`)
      break
    case 500:
      message.error(`${status} 服务器发生错误，请检查服务器`)
      break
    case 502:
      message.error(`${status} 网关错误`)
      break
    case 503:
      message.error(`${status} 服务不可用，服务器暂时过载或维护`)
      break
    case 504:
      message.error(`${status} 网关超时`)
      break
    default:
      message.error(`${status} ${other}`)
  }
}
