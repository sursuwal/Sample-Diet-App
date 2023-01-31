import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Login';


afterEach(cleanup);

const renderLoginScreen = () => render(<BrowserRouter><Login /></BrowserRouter>)

const getInput = (testId: string) => screen.getByTestId(testId)

describe('Login form', () => {
  test('Check email input exist', () => {
    renderLoginScreen()
    const element = getInput('email')
    expect(element).toBeInTheDocument();
  })

  test('Check password input exist', () => {
    renderLoginScreen()
    const element = getInput('password')
    expect(element).toBeInTheDocument();
  })

  test('Check Sign Up link exist', () => {
    renderLoginScreen()
    const element = screen.getByText(/Sign Up/i)
    expect(element).toBeInTheDocument();
  })

  test('Check Log in button is disabled', () => {
    renderLoginScreen()
    const element = screen.getByText(/LOGIN/i)
    expect(element).toBeDisabled()
  })

  test('Check Log in button is enable after form is valid', () => {
    renderLoginScreen()
    const emailInput: any = getInput('email')
    const passwordInput: any = getInput('password')
    const buttonElement = screen.getByText(/LOGIN/i)

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'abc123' } })

    expect(buttonElement).not.toBeDisabled()
  })
})