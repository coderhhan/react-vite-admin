
import { ChangeEvent, memo, useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Space, Button, message } from 'antd';
import initLoginBg from "./init.ts"
import styles from './login.module.less'
import VerifyCode, { VerifyCodeInstance } from '@/components/VerifyCode';
import { useAppDispatch } from '@/store/hooks';
import { loginAsync, profileAsync } from '@/store/App/reducer';

export default memo(() => {
  const [formData, setFormData] = useState<LoginParams>({
    password: '',
    username: '',
    code: ''
  })
  const codeRef = useRef<VerifyCodeInstance>(null)
  const disaptch = useAppDispatch()
  const navigator = useNavigate()

  useEffect(() => {

    initLoginBg()

    window.onresize = () => { initLoginBg() }

  }, []) //加空数组 只会初始化的时候触发一次



  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      username: e.target.value
    })
  }
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: e.target.value
    })
  }
  const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      code: e.target.value
    })
  }
  const handleVerifyCodeClick = useCallback(
    () => {
      codeRef.current && codeRef.current.freshCode()
      // console.log(codeRef.current.freshCode())
    },
    [codeRef],
  )

  const handleLogin = useCallback(async () => {
    console.log(formData.code)
    let codeCorrect = false
    codeRef.current && (codeCorrect = codeRef.current.verifyCode(formData.code))
    if (codeCorrect) {
      if (!formData.username || !formData.password) {
        return message.warning('输入的账号或者密码错误')
      } else {
        disaptch(loginAsync(formData))
        const { payload } = await disaptch(loginAsync(formData))
        if ((payload as ApiRespone).code === 200) {

          const result = await disaptch(profileAsync())
          if ((result.payload as ApiRespone).code === 200) {
            navigator('/home')
          }
        } else {
          message.warning((payload as ApiRespone).message)
        }

      }
    } else {
      message.warning('输入的验证码不正确!')
    }
  }, [codeRef, formData, disaptch, loginAsync])
  return (
    <div className={styles.loginPage}>
      {/* 存放背景 */}
      <canvas id="canvas" style={{ display: "block" }}></canvas>
      {/* 登录盒子 */}
      <div className={styles.loginBox}>
        {/* 标题部分 */}
        <div className={styles.title}>
          <h1>后台系统</h1>
        </div>
        {/* 表单部分 */}
        <div className={styles.form}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Input placeholder="用户名" onChange={usernameChange} />
            <Input.Password placeholder="密码" onChange={passwordChange} />
            {/* 验证码盒子 */}
            <div className={styles.captchaBox}>
              <Input placeholder="验证码" onChange={captchaChange} style={{ marginRight: '20px' }} />
              <VerifyCode ref={codeRef} onClick={handleVerifyCodeClick} />
            </div>
            <Button type="primary" className="loginBtn" block onClick={handleLogin}>登录</Button>
          </Space>
        </div>
      </div>
    </div>
  )
})