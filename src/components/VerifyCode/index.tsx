
import React, { memo, useImperativeHandle, useState, useLayoutEffect } from 'react'
import styles from './index.module.less'
interface IProps {
  identifyCode?: string // 默认注册码
  fontSizeMin?: number // 字体最小值
  fontSizeMax?: number // 字体最大值
  backgroundColorMin?: number // 验证码图片背景色最小值
  backgroundColorMax?: number // 验证码图片背景色最小值
  dotColorMin?: number // 背景干扰点最小值
  dotColorMax?: number // 背景干扰点最小值
  contentWidth?: number // 容器宽度
  contentHeight?: number // 容器高度
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export interface VerifyCodeInstance {
  verifyCode: (code: string) => boolean,
  freshCode: () => void,
}

const identifyCodes = '1234567890abcdefjhijklinopqrsduvwxyz'

// 生成一个随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

// 生成一个随机的颜色
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

const makeCode = (l: number) => {
  let code = ''
  for (let i = 0; i < l; i++) {
    code += identifyCodes[randomNum(0, identifyCodes.length)]
  }
  return code
}

const VerifyCode = React.forwardRef<VerifyCodeInstance, IProps>((props: IProps, ref) => {
  const [code, setCode] = useState('4233')
  const drawPic = () => {
    let canvas = document.getElementById('id-canvas') as HTMLCanvasElement
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.textBaseline = 'bottom'
    // 绘制背景
    ctx.fillStyle = '#e6ecfd'
    props.contentHeight && props.contentWidth && ctx.fillRect(0, 0, props.contentWidth, props.contentHeight)
    // 绘制文字
    for (let i = 0; i < code.length; i++) {
      drawText(ctx, code[i], i)
    }
    drawLine(ctx)
    drawDot(ctx)
  }

  const drawText = (ctx: CanvasRenderingContext2D, txt: string, i: number) => {
    if (!props.contentHeight || !props.fontSizeMin || !props.fontSizeMax || !props.contentWidth) return
    ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
    ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + 'px SimHei'// 随机生成字体大小
    let x = (i + 1) * (props.contentWidth / (code.length + 1))
    let y = randomNum(props.fontSizeMax, props.contentHeight - 5)
    const deg = randomNum(-30, 30)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180)
    ctx.translate(-x, -y)
  }
  const drawLine = (ctx: any) => {
    if (!props.contentHeight || !props.contentWidth) return
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(100, 200)
      ctx.beginPath()
      ctx.moveTo(
        randomNum(0, props.contentWidth),
        randomNum(0, props.contentHeight),
      )
      ctx.lineTo(
        randomNum(0, props.contentWidth),
        randomNum(0, props.contentHeight),
      )
      ctx.stroke()
    }
  }

  const drawDot = (ctx: any) => {
    if (!props.contentHeight || !props.contentWidth) return
    // 绘制干扰点
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(
        randomNum(0, props.contentWidth),
        randomNum(0, props.contentHeight),
        1,
        0,
        2 * Math.PI,
      )
      ctx.fill()
    }
  }
  //验证码是否正确
  const verifyCode = (c: string) => {
    return c === code
  }
  //刷新验证码
  const freshCode = (num = 4) => {
    const code = makeCode(num)
    setCode(code)
    drawPic()
  }
  //向父组件暴露接口
  useImperativeHandle(ref, () => {
    console.log('1')
    return {
      verifyCode,
      freshCode
    }
  }, [])
  //再dom改变之后,绘制之前 开始绘制canvas
  useLayoutEffect(() => {
    drawPic()
  }, [])
  return (
    <div className={styles['canvas-box']} style={{ height: props.contentHeight + 'px' }} onClick={props.onClick}>
      <canvas
        id="id-canvas"
        className={styles['id-canvas']}
        width={props.contentWidth}
        height={props.contentHeight}
      ></canvas>
    </div >
  )
})


VerifyCode.defaultProps = {
  fontSizeMin: 25,
  fontSizeMax: 35,
  backgroundColorMin: 200,
  backgroundColorMax: 220,
  dotColorMin: 60,
  dotColorMax: 120,
  contentWidth: 100,
  contentHeight: 38,
}

export default memo(VerifyCode)