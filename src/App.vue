<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch') // eslint-disable-line no-console
})
onShow(() => {
  console.log('App Show') // eslint-disable-line no-console
})
onHide(() => {
  console.log('App Hide') // eslint-disable-line no-console
})
</script>

<style></style>
