import { Request } from '@/utils/axios/request'

export default class Auth {
  static getAuthData = () => Request.get('/api/getAuth')
}
