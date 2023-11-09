<script setup lang="ts">
import { checkUpdate } from './utils'

onLaunch(() => {
  // #ifndef H5
  checkUpdate() // 小程序检测版本升级
  // #endif
})

onShow(() => {})

onHide(() => {})
</script>

<style lang="scss">
@import './assets/styles/reset.scss';
@import 'uview-plus/index.scss';
</style>
