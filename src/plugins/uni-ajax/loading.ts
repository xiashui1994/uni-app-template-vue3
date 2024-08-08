export default class Loading {
  private times: number = 0
  private timer: number | null = null

  show(loading?: boolean): void {
    if (loading === false)
      return // 如果传入的 loading 属性为 false，则不处理
    this.timer && clearTimeout(this.timer) // 如果有多个请求同时进行，则用最后请求的 loading
    this.times++
    this.timer = setTimeout(() => {
      loading && uni.showLoading({
        title: '加载中',
        mask: true,
      })
    }, 300) // 设定延迟，如果请求超过 300ms 才显示 loading
  }

  hide(loading?: boolean): void {
    if (loading === false)
      return
    this.times--
    if (this.times <= 0) {
      this.timer && clearTimeout(this.timer)
      uni.hideLoading()
      this.times = 0
    }
  }
}
