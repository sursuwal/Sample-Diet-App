import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreatePackage from '../CreatePackage';

afterEach(cleanup);

const renderPackageScreen = () => render(<BrowserRouter><CreatePackage
  open={true} handleClose={() => { }}
/></BrowserRouter>)

const getInput = (testId: string) => screen.getByTestId(testId)

describe('Diet Packages Page', () => {
  test('Check package name input exist', async () => {
    renderPackageScreen()
    const element = await waitFor(() => getInput('package_name'))
    expect(element).toBeInTheDocument();
  })

  test('Check select package input exist', async () => {
    renderPackageScreen()
    const element = await waitFor(() => getInput('select-plan'))
    expect(element).toBeInTheDocument();
  })

  test('Check save button is exist', async () => {
    renderPackageScreen()
    const element = await screen.findByText(/Save/i)
    expect(element).toBeInTheDocument()
  })

  test('Check cancel button is exist', async () => {
    renderPackageScreen()
    const element = await screen.findByText(/Cancel/i)
    expect(element).toBeInTheDocument()
  })

  test('Save button should be disabled', async () => {
    renderPackageScreen()
    const buttonElement = await screen.findByText(/Save/i)
    expect(buttonElement).toBeDisabled()
  })
})