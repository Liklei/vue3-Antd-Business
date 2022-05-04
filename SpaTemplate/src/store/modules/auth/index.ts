import { defineStore, acceptHMRUpdate } from 'pinia'
import { store } from '@/store'
import { useI18n } from 'vue-i18n'

import { isNumber } from '@/utils/is'
import { useMessage } from '@/hooks/useMessage'
import { h } from 'vue'

interface AuthState {
  token: string
  network: boolean
  roles: string
  count: number
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: '12434',
    network: true,
    roles: 'admin',
    count: 0
  }),
  getters: {
    getAuthRole(): string {
      return isNumber(this.roles) ? 'is-admin' : this.roles
    },
    getAuthNetWork(): string {
      return this.network ? '网络连接正常' : '请检查网络'
    }
  },
  actions: {
    setAuthRole(role: string): void {
      this.roles = role
    },
    setNetWork() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('network-tips')),
        content: () => h('span', `${t('network-message')}${this.network}`),
        onOk: async () => {
          console.log('你设置了网络状态!!!!')
          this.network = !this.network
        }
      })
    },
    setCount() {
      this.count++
    }
  }
})

export function useAuthStoreWithOut() {
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
  }
  return useAuthStore(store)
}
