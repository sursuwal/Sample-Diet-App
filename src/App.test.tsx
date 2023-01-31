import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen } from '@testing-library/react';

import { App } from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<App />);
});