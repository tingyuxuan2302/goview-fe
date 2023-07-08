// 处理键盘记录
export const keyRecordHandle = () => {
  // 默认赋值
  window.$KeyboardActive = {
    ctrl: false,
    space: false
  }

  document.onkeydown = (e: KeyboardEvent) => {
    const { keyCode } = e
    if (keyCode == 32 && e.target == document.body) e.preventDefault()

    if ([17, 32].includes(keyCode) && window.$KeyboardActive) {
      switch (keyCode) {
        case 17: window.$KeyboardActive.ctrl = true; break
        case 32: window.$KeyboardActive.space = true; break
      }
    }
  }

  document.onkeyup = (e: KeyboardEvent) => {
    const { keyCode } = e
    if (keyCode == 32 && e.target == document.body) e.preventDefault()

    if ([17, 32].includes(keyCode) && window.$KeyboardActive) {
      switch (keyCode) {
        case 17: window.$KeyboardActive.ctrl = false; break
        case 32: window.$KeyboardActive.space = false; break
      }
    }
  }
}