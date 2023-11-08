/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uview-plus'

declare let baseConfig: {
  api: {
    base: string
  }
}
