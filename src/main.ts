import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import { setupStore } from '@/store'

export function createApp() {
  const app = createSSRApp(App)

  setupStore(app)

  app.use(uviewPlus)

  return {
    app,
  }
}
