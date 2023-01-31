import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './pages/auth/Login';
import { PlansPage } from './pages/plans/PlansPage';
import { PackagesPage } from './pages/packages/PackagesPage';

import { RequireAuth } from './components/RequireAuth';
import { Register } from './pages/auth/Register';
import { Layout } from './components/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const App = () => {

  return <Routes>
    {/* Public Path */}

    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />

    {/* Private path */}
    <Route path='/' element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route index element={<>Home Page</>} />
        <Route path='plans' element={<PlansPage />} />
        <Route path='packages' element={<PackagesPage />} />
      </Route>
    </Route>

    {/* catch all */}
    <Route path='*' element={<div>Page not found</div>} />

  </Routes>
}
