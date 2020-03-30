import { useState, useEffect, useMemo } from 'react'
import OTPAuth from 'otpauth'

const useToken = (secret: string) => {
  const [token, setToken] = useState<string | null>(null)
  const [counter, setCounter] = useState<number>(0)

  const totp = useMemo(() => {
    if (secret)
      return new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromB32(secret.replace(/\s/g, ''))
      })
    else return null
  }, [secret])

  useEffect(() => {
    if (!secret) return

    let active = true

    const generateToken = () => {
      if (!totp) return

      const newCounter = Math.floor(Date.now() / 30000)

      if (newCounter === counter) return

      const newToken = totp.generate()
      setToken(newToken)
      setCounter(newCounter)

      if (active) requestAnimationFrame(generateToken)
    }

    generateToken()

    return () => void (active = false)
  }, [totp])

  return token
}

export default useToken
