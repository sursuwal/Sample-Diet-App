import { cleanup, fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PackagesPage } from '../PackagesPage';

afterEach(cleanup);

const renderPackageScreen = () => render(<BrowserRouter><PackagesPage /></BrowserRouter>)

const getInput = (testId: string) => screen.getByTestId(testId)

describe('Diet Packages Page', () => {
  test('Check search input exist', async () => {
    renderPackageScreen()
    const element = await waitFor(() => getInput('search'))
    expect(element).toBeInTheDocument();
  })

  test('Check Add new button is exist', async () => {
    renderPackageScreen()
    const element = await screen.findByText(/Add New/i)
    expect(element).toBeInTheDocument()
  })

  test('On Click add new create package modal should open', async () => {
    renderPackageScreen()
    const element = await screen.findByText(/Add New/i)
    fireEvent.click(element)
    const createModal = screen.getByTestId('create-package')
    // await act(async () => {
    await waitFor(() => expect(createModal).toBeInTheDocument())
    // })
  })
})