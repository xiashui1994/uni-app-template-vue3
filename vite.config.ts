import path from 'node:path'
import { defineConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    server: {
      host: true,
      port: 8080,
      open: true,
      proxy: {},
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_debugger: mode === 'production',
          drop_console: mode === 'production',
        },
      },
      sourcemap: mode !== 'production',
      reportCompressedSize: false,
    },
    plugins: [
      uni(),
      inject({
        baseConfig: path.resolve(__dirname, `src/config/${mode}`),
      }),
    ],
  }
})
