import { Box, Container } from '@mui/material'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { StringInput, ButtonControl } from '../../components/controls'
import { useAuth } from '../../hooks/useAuth'
import { checkEmailIsValid, checkPasswordIsValid } from '../../services/util'

type FormErrors = {
  firstName: string,
  email: string,
  password: string,
}

export const Register = () => {
  const { setAuth }: any = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/plans"

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({ firstName: '', email: '', password: '' })

  const handleLogin = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (email && password && firstName) {
      setAuth({ user: { email } })
      return navigate(from, { replace: true })
    }
  }

  const handleFirstNameOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const firstNameValue = e?.target?.value
    if (!firstNameValue) {
      setErrors({ ...errors, firstName: 'First Name is required' })
    } else {
      setErrors({ ...errors, firstName: '' })
    }
  }

  const handleFirstNameOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFirstName(e.target.value)
    handleFirstNameOnBlur(e)
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

  const checkFormIsValid = () => {
    let isValid = true

    if (!firstName || !checkEmailIsValid(email) || !checkPasswordIsValid(password)) {
      isValid = false
    }

    return isValid
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
            id='first_name'
            value={firstName}
            onChange={handleFirstNameOnChange}
            type='text'
            label='First Name'
            required={true}
            error={errors?.firstName ? true : false}
            helperText={errors?.firstName || ''}
            onBlur={handleFirstNameOnBlur}
            dataTestId='first_name'
          />
          <Box mb={2} />

          <StringInput
            id='last_name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type='text'
            label='Last Name'
            dataTestId='last_name'
          />
          <Box mb={2} />

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
            disabled={checkFormIsValid() ? undefined : true}
            title='Register'
            type='submit'
            onClick={handleLogin}
          />
          <Box mb={2} />

          <Link style={{ textDecoration: 'none' }} to="/login">Back to Login</Link>
        </Box>
      </Box>
    </form>
  </Container>
}

