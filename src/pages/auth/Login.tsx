import { Box, Container } from '@mui/material'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { StringInput, ButtonControl } from '../../components/controls'
import { useAuth } from '../../hooks/useAuth'
import { checkEmailIsValid, checkPasswordIsValid } from '../../services/util'

type FormErrors = {
  email: string,
  password: string,
}

export const Login = () => {
  const { setAuth }: any = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/plans"

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' })

  const handleLogin = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (email && password) {
      setAuth({ user: { email } })
      return navigate(from, { replace: true })
    }
  }

  const getIsFormValid = () => {
    let isValid = true
    if (!checkEmailIsValid(email) || !password) {
      isValid = false
    }
    return isValid
  }

  const handleEmailOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const emailValue = e?.target?.value
    if (!emailValue) {
      setErrors({ ...errors, email: 'Email is required' })
    } else if (!checkEmailIsValid(emailValue)) {
      setErrors({ ...errors, email: 'Please, enter valid email' })
    } else {
      setErrors({ ...errors, email: '' })
    }
  }

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
    handleEmailOnBlur(e)
  }

  const handlePasswordOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const passwordValue = e?.target?.value
    if (!passwordValue) {
      setErrors({ ...errors, password: 'Password is required' })
    } else if (!checkPasswordIsValid(passwordValue)) {
      setErrors({ ...errors, password: 'Please, enter at least 3 characters' })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }

  const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value)
    handlePasswordOnBlur(e)
  }

  return <Container>
    <form>
      <Box
        display='flex'
        flexDirection={'column'}
        justifyContent='center'
        height={window.innerHeight}
        textAlign='center'
      >
        <Box alignSelf={'center'} width={400}>
          <StringInput
            id='email'
            value={email}
            onChange={handleEmailOnChange}
            type='text'
            label='Email'
            required={true}
            error={errors?.email ? true : false}
            helperText={errors?.email || ''}
            onBlur={handleEmailOnBlur}
            dataTestId='email'
          />
          <Box mb={2} />
          <StringInput
            id='password'
            value={password}
            onChange={handlePasswordOnChange}
            type='password'
            label='Password'
            required={true}
            error={errors?.password ? true : false}
            helperText={errors?.password || ''}
            onBlur={handlePasswordOnBlur}
            dataTestId='password'
          />
          <Box mb={2} />
          <ButtonControl
            title='Login'
            type='submit'
            onClick={handleLogin}
            disabled={getIsFormValid() ? undefined : true}
          />
          <Box mb={2} />
          <Link style={{ textDecoration: 'none' }} to="/register">Sign Up</Link>
        </Box>
      </Box>
    </form>
  </Container>
}

