import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PlansPage } from '../PlansPage';

afterEach(cleanup);

const renderPackageScreen = () => render(<BrowserRouter><PlansPage /></BrowserRouter>)

const getInput = (testId: string) => screen.getByTestId(testId)

describe('Diet Packages Page', () => {
  test('Check search input exist', async () => {
    renderPackageScreen()
    const element = await waitFor(() => getInput('search_plans'))
    expect(element).toBeInTheDocument();
  })
})