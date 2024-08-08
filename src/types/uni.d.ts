import type { AjaxInstance, AjaxRequestConfig } from 'uni-ajax'

declare global {
  interface Uni {
    $http: AjaxInstance<AjaxRequestConfig>
  }
  const baseConfig: {
    api: {
      base: string
    }
  }
}

declare module 'uni-ajax' {
  interface CustomConfig {
    custom?: Partial<{
      loading: boolean
      error: boolean
    }>
  }
}
