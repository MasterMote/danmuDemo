import { getTextWidth, getTextPosition } from './utils'

class Danmu {
    constructor(danmu, fCtx) {
        this.content = danmu.content
        this.runTime = danmu.runtime
        this.danmu = danmu
        this.ctx = fCtx

        this.initialize()
    }

    initialize() {
        this.color = this.danmu.color || this.ctx.color
        this.speed = this.danmu.speed || this.ctx.speed
        this.fontSize = 30
        //获取文本的宽度
        this.width = getTextWidth(this.content, this.fontSize)
        //获取文本的位置
        getTextPosition(this.ctx.canvas, this.fontSize, this)
    }

    draw() {
        this.ctx.canvasCtx.font = this.fontSize + 'px Microsoft Yahei'
        this.ctx.canvasCtx.fillStyle = this.color
        this.ctx.canvasCtx.fillText(this.content, this.X, this.Y)
    }
}

export default Danmu