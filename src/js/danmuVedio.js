import { isObject, isArray } from './utils'
import Danmu from './danmu'

class DanmuVedio {
    constructor(vedio, canvas, options) {
        if (!vedio || !canvas || !options || !isObject(options)) return
        if (!options.danmuData || !isArray(options.danmuData)) return

        this.vedio = vedio
        this.canvas = canvas
        this.canvasCtx = canvas.getContext('2d')
        this.canvas.height = vedio.offsetHeight
        this.canvas.width = vedio.offsetWidth
        this.danmuPaused = true

        Object.assign(this, options, {
            speed: 2,
            runtime: 0,
            color: 'white'
        })

        this.danmuPool = this.createDanmuPool()
    }

    //将弹幕数据转成真实的弹幕，有宽，有高，有移动的属性
    createDanmuPool() {
        return this.danmuData.map(dm => new Danmu(dm, this))
    }

    render() {
        this.clearRect();
        this.drawDanmu();
        !this.danmuPaused && requestAnimationFrame(this.render.bind(this))
    }

    drawDanmu() {
        let currentTime = this.vedio.currentTime

        this.danmuPool.map((danmu) => {
            if (!danmu.stopDrawing && currentTime >= danmu.runTime) {
                if (!danmu.isInitialized) {
                    danmu.initialize()
                    danmu.isInitialized = true
                }
                danmu.X -= danmu.speed
                danmu.draw()

                if (danmu.X <= danmu.width * -1) {
                    danmu.stopDrawing = true
                }
            }
        })
    }

    reset() {
        this.clearRect()
        let currentTime = this.vedio.currentTime
        this.danmuPool.map((danmu) => {
            danmu.stopDrawing = false

            if (currentTime <= danmu.runTime) {
                danmu.isInitialized = false
            } else {
                danmu.stopDrawing = true
            }
        })
    }

    addDanmu(newDanmu) {
        this.danmuPool.push(new Danmu(newDanmu, this))
        console.log(this.danmuPool)
    }

    clearRect() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

}

export default DanmuVedio