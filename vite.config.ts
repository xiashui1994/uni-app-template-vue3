import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import inject from '@rollup/plugin-inject'
import AutoImport from 'unplugin-auto-import/vite'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    server: {
      host: true,
      port: 8080,
      open: true,
      proxy: {
        '/v1': {
          target: 'https://mock.apifox.com/m1/3563194-0-default',
          changeOrigin: true,
        },
      },
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
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'uni-app',
          'pinia',
        ],
        dts: 'src/types/auto-imports.d.ts',
      }),
      process.env.UNI_PLATFORM === 'h5' && compression(),
    ],
  }
})
