import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import inject from '@rollup/plugin-inject'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import legacy from '@vitejs/plugin-legacy'
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
          target: 'https://apifoxmock.com/m1/3563194-0-default',
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
      sourcemap: mode === 'development',
      reportCompressedSize: false,
    },
    plugins: [
      uni(),
      inject({
        baseConfig: path.resolve(__dirname, `src/config/${mode}`),
      }),
      createHtmlPlugin(),
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
      process.env.UNI_PLATFORM === 'h5' && legacy({
        targets: ['defaults', 'not IE 11', 'chromeAndroid>=52, iOS>=13.1'],
      }),
      process.env.UNI_PLATFORM === 'h5' && compression({
        include: /\.(js|html|css|jpg|jpeg|png|svg)$/, // 需要压缩的文件类型
        threshold: 10240, // 对超过 10kb 的数据进行压缩
      }),
    ],
  }
})
