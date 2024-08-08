// 小程序检测版本升级
export function checkUpdate(): void {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log('版本检查', res.hasUpdate) // eslint-disable-line no-console
  })
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        // 新的版本已经下载好,调用 applyUpdate 应用新版本并重启
        res.confirm && updateManager.applyUpdate()
      },
    })
  })
}
