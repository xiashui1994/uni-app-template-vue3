import { defineStore } from 'pinia'

interface DemoState {
  id?: number | string
}

export const useDemoStore = defineStore({
  id: 'demo',
  state: (): DemoState => ({ id: 1 }),
  getters: {},
  actions: {},
})
