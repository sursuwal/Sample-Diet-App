import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../Register';


afterEach(cleanup);

const renderRegisterScreen = () => render(<BrowserRouter><Register /></BrowserRouter>)

const getInput = (testId: string) => screen.getByTestId(testId)

describe('Register form', () => {
  test('Check first name input exist', () => {
    renderRegisterScreen()
    const element = getInput('first_name')
    expect(element).toBeInTheDocument();
  })

  test('Check last name input exist', () => {
    renderRegisterScreen()
    const element = getInput('last_name')
    expect(element).toBeInTheDocument();
  })

  test('Check email input exist', () => {
    renderRegisterScreen()
    const element = getInput('email')
    expect(element).toBeInTheDocument();
  })

  test('Check password input exist', () => {
    renderRegisterScreen()
    const element = getInput('password')
    expect(element).toBeInTheDocument();
  })

  test('Check Back to Login link exist', () => {
    renderRegisterScreen()
    const element = screen.getByText(/Back to Login/i)
    expect(element).toBeInTheDocument();
  })

  test('Check Register button is disabled', () => {
    renderRegisterScreen()
    const element = screen.getByText(/Register/i)
    expect(element).toBeDisabled()
  })

  test('Check Log in button is enable after form is valid', () => {
    renderRegisterScreen()
    const firstNameInput: any = getInput('first_name')
    const emailInput: any = getInput('email')
    const passwordInput: any = getInput('password')
    const buttonElement = screen.getByText(/Register/i)

    fireEvent.change(firstNameInput, { target: { value: 'first name' } })
    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'abc123' } })

    expect(buttonElement).not.toBeDisabled()
  })
})