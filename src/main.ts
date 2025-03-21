import ajax from '@/plugins/uni-ajax'
import { setupStore } from '@/store'
import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import App from './App.vue'

uni.$http = ajax

export function createApp() {
  const app = createSSRApp(App)

  setupStore(app)

  app.use(uviewPlus)

  // hack: uview plus timeFormat bug
  const timeFormat = uni.$u.timeFormat
  uni.$u.timeFormat = (time: Date, format: string) => timeFormat(new Date(time), format)

  return {
    app,
  }
}
