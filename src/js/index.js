import DanmuVedio from './danmuVedio'

//弹幕数据
const danmuData = [{
        content: '前方高能',
        speed: 3,
        runtime: 5,
    },
    {
        content: '上头',
        speed: 1,
        runtime: 0,
        color: 'green'
    },
    {
        content: '嘤嘤嘤',
        speed: 1,
        runtime: 5,
        color: 'white'
    },
    {
        content: '完结撒花',
        speed: 2,
        runtime: 10,
        color: 'yellow'
    },
    {
        content: 'awsl',
        speed: 3,
        runtime: 7,
        color: 'white'
    },
    {
        content: '哈哈哈',
        speed: 2,
        runtime: 3,
        color: 'white'
    },
    {
        content: '前方高能',
        speed: 1,
        runtime: 6,
        color: 'white'
    }
]


;
((doc) => {
    const oDanmuCanvas = doc.getElementById('J_danmuCanvas')
    const oDanmuVedio = doc.getElementById('J_danmuVideo')
    const oDanmuInput = doc.getElementsByClassName('danmu-input')[0]
    const oDanmuColor = doc.getElementsByClassName('color-input')[0]
    const oDanmuButton = doc.getElementsByClassName('danmu-btn')[0]

    const init = () => {
        // 实例化弹幕插件
        window.danmuVedio = new DanmuVedio(oDanmuVedio, oDanmuCanvas, { danmuData })

        bindEvent()
    }

    //绑定事件函数
    const bindEvent = () => {
        oDanmuVedio.addEventListener('play', handleVedioPlay, false)
        oDanmuVedio.addEventListener('pause', handleVedioPause, false)
        oDanmuVedio.addEventListener('seeked', handleVedioSeeked, false)
        oDanmuButton.addEventListener('click', handleDanmuClick, false)
    }

    function handleVedioPlay() {
        danmuVedio.danmuPaused = false
        danmuVedio.render()
    }

    function handleVedioPause() {
        danmuVedio.danmuPaused = true
    }

    function handleVedioSeeked() {
        danmuVedio.reset()
    }

    function handleDanmuClick() {
        if (danmuVedio.danmuPaused) return

        let danmuInput = oDanmuInput.value.trim()

        if (!danmuInput.length) return

        let currentTime = oDanmuVedio.currentTime
        let danmuColor = oDanmuColor.value

        let _data = {
            content: danmuInput,
            runtime: currentTime,
            color: danmuColor
        }

        console.log(_data)

        danmuVedio.addDanmu(_data)
        oDanmuInput.value = ''
    }

    init()

})(document);